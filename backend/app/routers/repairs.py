from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from sqlalchemy import func
from uuid import UUID
from datetime import datetime, timedelta
import csv
import io

from app.database import get_db
from app.models import Repair, User, Appointment
from app.schemas import RepairCreate, RepairOut, RepairStatusUpdate, RepairTrackOut
from app.dependencies import require_roles, get_current_user
from app.utils.helpers import generate_tracking_id
from app.worker import send_email_task, send_whatsapp_task
from app.utils.mailer import send_repair_status_update

router = APIRouter(prefix="/api/repairs", tags=["Repairs"])

VALID_STATUSES = ["pending", "received", "diagnosed", "repairing", "testing", "collection", "completed"]

STATUS_PROGRESS = {
    "pending":     0,
    "received":   20,
    "diagnosed":  40,
    "repairing":  60,
    "testing":    80,
    "collection": 100,
    "completed":  100,
}


@router.get("/")
def get_repairs(
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("staff", "SUPER_ADMIN")),
):
    """Get all repairs (for dashboard)"""
    repairs = db.query(Repair).order_by(Repair.created_at.desc()).limit(100).all()
    return {
        "success": True,
        "repairs": [RepairOut.model_validate(r) for r in repairs]
    }

def _notify_customer(repair, notification_preference, customer_email, event_type="created"):
    tracking_link = f"https://yourdomain.com/track/{repair.tracking_id}"
    if event_type == "created":
        msg = f"Hello {repair.customer_name}, your repair ticket for {repair.device_model} has been created. Your tracking ID is {repair.tracking_id}. Track it here: {tracking_link}"
        subj = f"Repair Ticket Created - Tracking ID {repair.tracking_id}"
    else:
        msg = f"Hello {repair.customer_name}, your repair ticket for {repair.device_model} status has been updated to '{repair.status}'. Track it here: {tracking_link}"
        subj = f"Repair Status Update - {repair.tracking_id}"

    # Fire and forget - don't wait for Celery
    try:
        if notification_preference == "whatsapp" and repair.customer_phone:
            send_whatsapp_task.apply_async(args=[repair.customer_phone, msg], ignore_result=True)
        elif customer_email:
            send_email_task.apply_async(args=[customer_email, subj, msg], ignore_result=True)
    except Exception as e:
        print(f"[Notification] Failed to send notification (Redis/Celery may not be running): {e}")
        

@router.post("/create", status_code=201)
def create_repair(
    body: RepairCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("staff", "SUPER_ADMIN")),
):
    for _ in range(5):
        tracking_id = generate_tracking_id()
        if not db.query(Repair).filter(Repair.tracking_id == tracking_id).first():
            break
    else:
        raise HTTPException(500, "Could not generate a unique tracking ID.")

    repair = Repair(
        tracking_id=tracking_id,
        customer_name=body.customer_name,
        customer_phone=body.customer_phone,
        device_model=body.device_model,
        estimated_cost=body.estimated_cost,
        appointment_id=body.appointment_id,
        status="received",
        priority=body.priority or "normal",
        technician_id=body.technician_id,
        status_notes="Device received and queued for diagnostics.",
    )
    db.add(repair)
    db.commit()
    db.refresh(repair)
    
    _notify_customer(repair, body.notification_preference, body.customer_email, "created")

    return {
        "success": True,
        "message": "Repair ticket created successfully.",
        "tracking_id": tracking_id,
        "repair": RepairOut.model_validate(repair),
    }

@router.get("/track/{tracking_id}", response_model=dict)
def track_repair(tracking_id: str, db: Session = Depends(get_db)):
    repair = db.query(Repair).filter(Repair.tracking_id == tracking_id.upper()).first()
    if not repair:
        raise HTTPException(404, "Invalid tracking ID. Please double-check the ID.")

    return {
        "success": True,
        "data": RepairTrackOut(
            tracking_id=repair.tracking_id,
            customer_name=repair.customer_name,
            device_model=repair.device_model,
            status=repair.status,
            status_notes=repair.status_notes,
            estimated_cost=repair.estimated_cost,
            progress_percentage=STATUS_PROGRESS.get(repair.status, 0),
            last_updated=repair.updated_at,
            received_at=repair.created_at,
        ),
    }

@router.put("/{tracking_id}/status")
def update_repair_status(
    tracking_id: str,
    body: RepairStatusUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("staff", "SUPER_ADMIN")),
):
    if body.status not in VALID_STATUSES:
        raise HTTPException(400, f"Invalid status. Choose from: {', '.join(VALID_STATUSES)}")

    repair = db.query(Repair).filter(Repair.tracking_id == tracking_id.upper()).first()
    if not repair:
        raise HTTPException(404, "Repair record not found.")

    repair.status = body.status
    if body.status_notes is not None:
        repair.status_notes = body.status_notes
    if body.estimated_cost is not None:
        repair.estimated_cost = body.estimated_cost
    if body.priority is not None:
        repair.priority = body.priority
    if body.technician_id is not None:
        repair.technician_id = body.technician_id

    db.commit()
    db.refresh(repair)

    if body.notify_customer:
        # Get customer email from appointment or user
        customer_email = None
        if repair.appointment and repair.appointment.customer_email:
            customer_email = repair.appointment.customer_email
        elif repair.appointment and repair.appointment.user:
            customer_email = repair.appointment.user.email

        # Send detailed status update email if email is available
        if customer_email:
            try:
                send_repair_status_update(
                    email=customer_email,
                    customer_name=repair.customer_name,
                    tracking_id=repair.tracking_id,
                    device_model=repair.device_model,
                    new_status=body.status
                )
            except Exception as e:
                print(f"[Email] Failed to send status update email: {e}")
        else:
            # Fallback to generic notification via WhatsApp
            _notify_customer(repair, "whatsapp", None, "updated")

    return {
        "success": True,
        "message": f"Repair status updated to '{body.status}'.",
        "repair": RepairOut.model_validate(repair),
    }


@router.delete("/{tracking_id}")
def delete_repair(
    tracking_id: str,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN")),
):
    """Delete a repair by tracking ID (admin only)"""
    repair = db.query(Repair).filter(Repair.tracking_id == tracking_id).first()
    if not repair:
        raise HTTPException(404, "Repair not found.")
    
    # Delete associated appointment if exists
    if repair.appointment_id:
        appointment = db.query(Appointment).filter(Appointment.id == repair.appointment_id).first()
        if appointment:
            db.delete(appointment)
    
    db.delete(repair)
    db.commit()
    
    return {"success": True, "message": "Repair deleted successfully."}


@router.get("/my")
def my_repairs(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get all repairs for the current user"""
    # Find repairs where the user is associated via appointment
    repairs = (
        db.query(Repair)
        .join(Appointment)
        .filter(Appointment.user_id == current_user.id)
        .order_by(Repair.created_at.desc())
        .all()
    )
    return {
        "success": True,
        "count": len(repairs),
        "repairs": [RepairOut.model_validate(r) for r in repairs],
    }


@router.get("/all")
def all_repairs(
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("staff", "SUPER_ADMIN")),
):
    repairs = db.query(Repair).order_by(Repair.updated_at.desc()).all()
    return {
        "success": True,
        "count": len(repairs),
        "repairs": [RepairOut.model_validate(r) for r in repairs],
    }


@router.get("/export/csv")
def export_repairs_csv(
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN")),
):
    """Export all repairs to CSV file"""
    repairs = db.query(Repair).order_by(Repair.created_at.desc()).all()
    
    output = io.StringIO()
    writer = csv.writer(output)
    
    # Write header
    writer.writerow([
        "Tracking ID", "Customer Name", "Customer Phone", "Device Model",
        "Status", "Status Notes", "Estimated Cost", "Created At", "Updated At"
    ])
    
    # Write data
    for repair in repairs:
        writer.writerow([
            repair.tracking_id,
            repair.customer_name,
            repair.customer_phone,
            repair.device_model,
            repair.status,
            repair.status_notes or "",
            f"£{repair.estimated_cost:.2f}" if repair.estimated_cost else "£0.00",
            repair.created_at.strftime("%Y-%m-%d %H:%M:%S") if repair.created_at else "",
            repair.updated_at.strftime("%Y-%m-%d %H:%M:%S") if repair.updated_at else "",
        ])
    
    output.seek(0)
    
    return StreamingResponse(
        io.BytesIO(output.getvalue().encode('utf-8')),
        media_type='text/csv',
        headers={'Content-Disposition': f'attachment; filename=repairs_export_{datetime.now().strftime("%Y%m%d_%H%M%S")}.csv'}
    )


@router.get("/stats")
def get_repair_stats(
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("staff", "SUPER_ADMIN")),
):
    """Get repair statistics for admin dashboard"""
    total_repairs = db.query(Repair).count()
    
    status_counts = {}
    for status in VALID_STATUSES:
        count = db.query(Repair).filter(Repair.status == status).count()
        status_counts[status] = count
    
    # Calculate total revenue from completed repairs
    completed_repairs = db.query(Repair).filter(Repair.status == "collection")
    completed_repairs_count = completed_repairs.count()
    total_revenue = sum(r.estimated_cost or 0 for r in completed_repairs.all())
    
    # Get repairs from last 30 days
    thirty_days_ago = datetime.now() - timedelta(days=30)
    recent_repairs = db.query(Repair).filter(Repair.created_at >= thirty_days_ago).count()
    
    return {
        "success": True,
        "stats": {
            "total_repairs": total_repairs,
            "status_breakdown": status_counts,
            "total_revenue": float(total_revenue),
            "recent_repairs_30_days": recent_repairs,
            "average_repair_value": float(total_revenue / completed_repairs_count) if completed_repairs_count else 0.0,
        }
    }

@router.get("/my")
def my_repairs(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("customer", "SUPER_ADMIN")),
):
    # This requires linking repairs to users. Let's see if Repair has a user_id or we match by email/phone.
    # Currently Repair has customer_phone and maybe appointment_id. Let's match by appointment -> user_id, 
    # or by phone/email if possible.
    # For now, let's match by customer_phone == current_user.phone
    if not current_user.phone:
        return {"success": True, "count": 0, "repairs": []}
    repairs = db.query(Repair).filter(Repair.customer_phone == current_user.phone).order_by(Repair.updated_at.desc()).all()
    return {
        "success": True,
        "count": len(repairs),
        "repairs": [RepairOut.model_validate(r) for r in repairs],
    }

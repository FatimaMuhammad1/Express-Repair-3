from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from sqlalchemy import func, and_
from uuid import UUID
from datetime import datetime, timedelta, timezone
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel
import csv
import io
import json
import logging

from app.database import get_db
from app.models import Repair, User, Appointment, DeletedItem, DeletedItemStatus, RepairStatus, Invoice, InvoiceStatus, Transaction
from app.schemas import RepairCreate, RepairOut, RepairStatusUpdate, RepairTrackOut
from app.dependencies import require_roles, get_current_user
from app.utils.helpers import generate_tracking_id
from app.worker import send_email_task, send_whatsapp_task
from app.utils.mailer import send_repair_status_update
from app.routers.notifications import create_notification

logger = logging.getLogger(__name__)

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
    _: User = Depends(require_roles("SUPER_ADMIN", "BUSINESS_OWNER")),
):
    """Get all repairs (for dashboard)"""
    try:
        repairs = db.query(Repair).order_by(Repair.created_at.desc()).limit(100).all()
        return {
            "success": True,
            "repairs": [RepairOut.model_validate(r) for r in repairs]
        }
    except Exception as e:
        logger.error(f"Error fetching repairs: {e}")
        raise HTTPException(status_code=500, detail=str(e))

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
        logger.warning(f"[Notification] Failed to send notification (Redis/Celery may not be running): {e}")
        

@router.post("/create", status_code=201)
def create_repair(
    body: RepairCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN")),
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

    # Create notification for assigned technician
    if body.technician_id:
        create_notification(
            db,
            body.technician_id,
            "repair_assigned",
            "New Repair Assigned",
            f"You have been assigned a new repair: {repair.device_model} for {repair.customer_name}",
            f"/admin/repairs/{repair.id}"
        )

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
    current_user: User = Depends(require_roles("SUPER_ADMIN", "BUSINESS_OWNER")),
):
    if body.status not in VALID_STATUSES:
        raise HTTPException(400, f"Invalid status. Choose from: {', '.join(VALID_STATUSES)}")

    repair = db.query(Repair).filter(Repair.tracking_id == tracking_id.upper()).first()
    if not repair:
        raise HTTPException(404, "Repair record not found.")

    old_status = repair.status
    repair.status = body.status
    if body.status_notes is not None:
        repair.status_notes = body.status_notes
    if body.technician_id is not None:
        repair.technician_id = body.technician_id
    if body.estimated_cost is not None:
        repair.estimated_cost = body.estimated_cost
    if body.final_repair_cost is not None:
        repair.final_repair_cost = body.final_repair_cost

    db.commit()
    db.refresh(repair)

    # Create invoice when repair is marked as completed
    if body.status == "completed" and old_status != "completed":
        # Require final_repair_cost before completion
        if not repair.final_repair_cost:
            raise HTTPException(400, "Please enter the Final Repair Cost before completing this repair.")

        # Check if invoice already exists for this repair
        existing_invoice = db.query(Invoice).filter(Invoice.repair_id == repair.id).first()
        if not existing_invoice:
            # Use final_repair_cost (required, not estimated_cost)
            final_cost = repair.final_repair_cost

            # Generate invoice number
            invoice_num = f"INV-{datetime.now().strftime('%Y%m%d')}-{repair.tracking_id}"

            # Calculate tax (20% VAT)
            subtotal = float(final_cost) if final_cost else 0
            tax_amount = subtotal * 0.20
            total = subtotal + tax_amount

            # Calculate total payments received for this repair
            total_payments = db.query(func.sum(Transaction.amount)).filter(
                and_(
                    Transaction.repair_id == repair.id,
                    Transaction.type == "payment",
                    Transaction.payment_type != "Refund",
                    Transaction.status == "completed"
                )
            ).scalar() or 0

            # Determine invoice status based on payments received
            if total_payments == 0:
                invoice_status = InvoiceStatus.pending
            elif total_payments < total:
                invoice_status = InvoiceStatus.partial
            elif total_payments == total:
                invoice_status = InvoiceStatus.paid
            else:  # total_payments > total
                invoice_status = InvoiceStatus.overpaid

            # Create invoice
            invoice = Invoice(
                invoice_number=invoice_num,
                repair_id=repair.id,
                customer_name=repair.customer_name,
                customer_email=repair.customer_email,
                customer_phone=repair.customer_phone,
                amount=total,
                tax_amount=tax_amount,
                deposit_paid=total_payments,
                status=invoice_status,
                due_date=datetime.now(timezone.utc).date() + timedelta(days=7),  # Due in 7 days
            )
            db.add(invoice)
            db.commit()

    # Create notification for technician if assigned
    if repair.technician_id:
        create_notification(
            db,
            user_id=repair.technician_id,
            notification_type="status_update",
            title=f"Repair Status Updated",
            message=f"Repair {repair.tracking_id} status changed to {repair.status}",
            link=f"/admin/repairs/{repair.id}"
        )

    # Send status update notification to customer
    try:
        send_repair_status_update(repair, old_status, repair.status)
    except Exception as e:
        logger.warning(f"Failed to send status update notification: {e}")

    return {"success": True, "message": "Repair status updated successfully"}


class RepairPaymentUpdate(BaseModel):
    payment_status: Optional[str] = None
    payment_method: Optional[str] = None
    payment_amount: Optional[float] = None


@router.put("/{tracking_id}/payment")
def update_repair_payment(
    tracking_id: str,
    body: RepairPaymentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN", "BUSINESS_OWNER")),
):
    """Update payment information for a repair"""
    repair = db.query(Repair).filter(Repair.tracking_id == tracking_id.upper()).first()
    if not repair:
        raise HTTPException(404, "Repair record not found.")

    # Update payment status if provided
    if body.payment_status:
        if body.payment_status not in ["pending", "partially_paid", "paid"]:
            raise HTTPException(400, "Invalid payment status. Must be: pending, partially_paid, or paid")
        repair.payment_status = body.payment_status

    # Update payment method if provided
    if body.payment_method:
        if body.payment_method not in ["cash", "card", "bank_transfer"]:
            raise HTTPException(400, "Invalid payment method. Must be: cash, card, or bank_transfer")
        repair.payment_method = body.payment_method

    # Add additional payment amount if provided
    if body.payment_amount is not None and body.payment_amount > 0:
        repair.deposit_paid = (repair.deposit_paid or Decimal("0.00")) + Decimal(str(body.payment_amount))
        
        # Update associated invoice if it exists
        invoice = db.query(Invoice).filter(Invoice.repair_id == repair.id).first()
        if invoice:
            invoice.deposit_paid = (invoice.deposit_paid or Decimal("0.00")) + Decimal(str(body.payment_amount))
            if invoice.deposit_paid >= invoice.amount:
                invoice.status = "paid"
            elif invoice.deposit_paid > 0:
                invoice.status = "partial"

    db.commit()
    db.refresh(repair)

    # Create transaction record if payment was made
    if body.payment_amount and body.payment_amount > 0 and body.payment_method:
        transaction = Transaction(
            type="payment",
            payment_type="Final Payment",
            amount=Decimal(str(body.payment_amount)),
            description=f"Final payment for repair {tracking_id}",
            customer_name=repair.customer_name,
            status="completed",
            payment_method=body.payment_method,
            repair_id=repair.id,
            staff_member=current_user.name,
        )
        db.add(transaction)
        db.commit()

        # Send WhatsApp notification to business owner for audit trail
        try:
            from app.config import settings
            owner_message = f"PAYMENT RECEIVED\n\nCustomer: {repair.customer_name}\nRepair ID: {tracking_id}\nAmount: £{body.payment_amount:.2f}\nPayment Method: {body.payment_method}\nStaff: {current_user.name}\nTime: {datetime.now().strftime('%Y-%m-%d %H:%M')}\n\nExpress Tech Hub & Repair"
            send_whatsapp_task.apply_async(args=[settings.OWNER_WHATSAPP_NUMBER, owner_message], ignore_result=True)
        except Exception as e:
            logger.warning(f"Failed to send WhatsApp notification to owner: {e}")

    return {"success": True, "message": "Payment information updated successfully"}


@router.get("/{tracking_id}/payment-summary")
def get_repair_payment_summary(
    tracking_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN", "BUSINESS_OWNER", "staff")),
):
    """Get payment summary for a repair"""
    repair = db.query(Repair).filter(Repair.tracking_id == tracking_id.upper()).first()
    if not repair:
        raise HTTPException(404, "Repair record not found.")

    # Calculate payments
    initial_payments = db.query(func.sum(Transaction.amount)).filter(
        and_(
            Transaction.repair_id == repair.id,
            Transaction.payment_type == "Initial Payment",
            Transaction.status == "completed"
        )
    ).scalar() or 0

    final_payments = db.query(func.sum(Transaction.amount)).filter(
        and_(
            Transaction.repair_id == repair.id,
            Transaction.payment_type == "Final Payment",
            Transaction.status == "completed"
        )
    ).scalar() or 0

    refunds = db.query(func.sum(Transaction.amount)).filter(
        and_(
            Transaction.repair_id == repair.id,
            Transaction.payment_type == "Refund",
            Transaction.status == "completed"
        )
    ).scalar() or 0

    total_payments = initial_payments + final_payments - refunds

    # Calculate outstanding balance
    final_cost = float(repair.final_repair_cost) if repair.final_repair_cost else 0
    outstanding_balance = final_cost - total_payments

    # Determine payment status
    if final_cost == 0:
        payment_status = "Not Finalized"
    elif outstanding_balance == 0:
        payment_status = "Paid"
    elif outstanding_balance > 0:
        payment_status = "Partially Paid"
    else:  # outstanding_balance < 0
        payment_status = "Overpaid"

    return {
        "success": True,
        "repair_id": str(repair.id),
        "tracking_id": repair.tracking_id,
        "customer_name": repair.customer_name,
        "payment_summary": {
            "estimated_repair_cost": float(repair.estimated_cost) if repair.estimated_cost else 0,
            "final_repair_cost": final_cost,
            "initial_payment": float(initial_payments),
            "additional_payments": float(final_payments),
            "refunds_issued": float(refunds),
            "total_payments": float(total_payments),
            "outstanding_balance": outstanding_balance,
            "payment_status": payment_status,
        },
        "transactions": [
            {
                "id": str(t.id),
                "payment_type": t.payment_type,
                "amount": float(t.amount),
                "payment_method": t.payment_method.value if t.payment_method else None,
                "staff_member": t.staff_member,
                "created_at": t.created_at.isoformat() if t.created_at else None,
            }
            for t in db.query(Transaction).filter(
                Transaction.repair_id == repair.id,
                Transaction.type == "payment"
            ).order_by(Transaction.created_at.desc()).all()
        ]
    }


@router.delete("/{tracking_id}")
def delete_repair(
    tracking_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN")),
):
    """Delete a repair by tracking ID (admin only) - archives to history for 48-hour recovery"""
    from app.models import DeletedItem, DeletedItemStatus
    from datetime import datetime, timedelta
    import json
    
    repair = db.query(Repair).filter(Repair.tracking_id == tracking_id).first()
    if not repair:
        raise HTTPException(404, "Repair not found.")
    
    try:
        # Check if there's already an archived deleted item for this repair
        existing_deleted = db.query(DeletedItem).filter(
            DeletedItem.original_table == "repairs",
            DeletedItem.original_record_id == str(repair.id)
        ).first()
        
        # Archive to deleted_items table
        record_data = {
            "id": str(repair.id),
            "tracking_id": repair.tracking_id,
            "appointment_id": str(repair.appointment_id) if repair.appointment_id else None,
            "customer_name": repair.customer_name,
            "customer_phone": repair.customer_phone,
            "device_model": repair.device_model,
            "status": repair.status.value if repair.status else None,
            "technician_id": str(repair.technician_id) if repair.technician_id else None,
            "priority": repair.priority,
            "status_notes": repair.status_notes,
            "estimated_cost": float(repair.estimated_cost) if repair.estimated_cost else 0,
            "created_at": repair.created_at.isoformat() if repair.created_at else None,
            "updated_at": repair.updated_at.isoformat() if repair.updated_at else None,
        }
        
        if existing_deleted:
            # Update existing archived entry instead of creating new one
            existing_deleted.record_data = json.dumps(record_data)
            existing_deleted.item_name = f"Repair - {repair.customer_name} ({repair.device_model})"
            existing_deleted.deleted_by = current_user.id
            existing_deleted.deleted_at = datetime.now(timezone.utc)
            existing_deleted.hide_from_ui_at = datetime.now(timezone.utc) + timedelta(hours=48)
            existing_deleted.status = DeletedItemStatus.active
        else:
            # Create new deleted item entry
            deleted_item = DeletedItem(
                original_table="repairs",
                original_record_id=str(repair.id),
                record_data=json.dumps(record_data),
                item_name=f"Repair - {repair.customer_name} ({repair.device_model})",
                item_type="Repair",
                deleted_by=current_user.id,
                deleted_at=datetime.now(timezone.utc),
                hide_from_ui_at=datetime.now(timezone.utc) + timedelta(hours=48),
                status=DeletedItemStatus.active
            )
            db.add(deleted_item)
        
        # Delete associated appointment if exists
        if repair.appointment_id:
            appointment = db.query(Appointment).filter(Appointment.id == repair.appointment_id).first()
            if appointment:
                db.delete(appointment)
        
        # Delete the original repair
        db.delete(repair)
        
        db.commit()
        
        return {"success": True, "message": "Repair deleted and archived for recovery"}
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to delete repair: {str(e)}")


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
    _: User = Depends(require_roles("SUPER_ADMIN", "BUSINESS_OWNER")),
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
    _: User = Depends(require_roles("SUPER_ADMIN", "BUSINESS_OWNER")),
):
    """Get repair statistics for admin dashboard"""
    total_repairs = db.query(Repair).count()

    # Map string names to RepairStatus enum members for safe DB filtering
    status_enum_map = {
        "pending":    RepairStatus.pending,
        "received":   RepairStatus.received,
        "diagnosed":  RepairStatus.diagnosed,
        "repairing":  RepairStatus.repairing,
        "testing":    RepairStatus.testing,
        "collection": RepairStatus.collection,
        "completed":  RepairStatus.completed,
    }

    status_counts = {}
    for status_name, status_enum in status_enum_map.items():
        count = db.query(Repair).filter(Repair.status == status_enum).count()
        status_counts[status_name] = count

    # Calculate total revenue from repairs ready for collection
    completed_repairs = db.query(Repair).filter(Repair.status == RepairStatus.collection)
    completed_repairs_count = completed_repairs.count()
    total_revenue = sum(r.estimated_cost or 0 for r in completed_repairs.all())

    # Get repairs from last 30 days
    thirty_days_ago = datetime.now(timezone.utc) - timedelta(days=30)
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

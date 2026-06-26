from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from typing import Optional

from app.database import get_db
from app.models import Repair, CustomerNote, User
from app.dependencies import get_current_user

router = APIRouter(prefix="/api/customers", tags=["Customers"])


@router.get("/")
async def get_all_customers(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all customers (from repairs)"""
    
    # Get unique customers from repairs
    repairs = db.query(Repair).all()
    
    # Group by phone to get unique customers
    customers = {}
    for repair in repairs:
        if repair.customer_phone not in customers:
            customers[repair.customer_phone] = {
                "name": repair.customer_name,
                "phone": repair.customer_phone,
                "repair_count": 0,
                "last_repair": None,
            }
        customers[repair.customer_phone]["repair_count"] += 1
        if not customers[repair.customer_phone]["last_repair"] or repair.created_at > customers[repair.customer_phone]["last_repair"]:
            customers[repair.customer_phone]["last_repair"] = repair.created_at
    
    return {
        "success": True,
        "customers": [
            {
                "name": c["name"],
                "phone": c["phone"],
                "repair_count": c["repair_count"],
                "last_repair": c["last_repair"].isoformat() if c["last_repair"] else None,
            }
            for c in customers.values()
        ]
    }


@router.get("/phone/{phone}")
async def get_customer_by_phone(
    phone: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get customer details by phone number"""
    
    # Find repairs by phone
    repairs = db.query(Repair).filter(Repair.customer_phone == phone).all()
    
    if not repairs:
        return {"success": False, "message": "Customer not found"}
    
    latest_repair = repairs[0]
    
    return {
        "success": True,
        "customer": {
            "name": latest_repair.customer_name,
            "phone": latest_repair.customer_phone,
            "email": None,
            "notes": None,
        }
    }


@router.get("/phone/{phone}/repairs")
async def get_customer_repairs(
    phone: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get customer repair history by phone number"""
    
    # Find repairs by phone
    repairs = db.query(Repair).filter(Repair.customer_phone == phone).order_by(Repair.created_at.desc()).all()
    
    if not repairs:
        return {"success": False, "message": "No repairs found for this customer"}
    
    repair_history = []
    for repair in repairs:
        repair_history.append({
            "id": str(repair.id),
            "tracking_id": repair.tracking_id,
            "device_model": repair.device_model,
            "status": repair.status.value if repair.status else None,
            "priority": repair.priority.value if repair.priority else None,
            "estimated_cost": float(repair.estimated_cost) if repair.estimated_cost else 0,
            "status_notes": repair.status_notes,
            "created_at": repair.created_at.isoformat() if repair.created_at else None,
            "updated_at": repair.updated_at.isoformat() if repair.updated_at else None,
        })
    
    return {
        "success": True,
        "repair_count": len(repair_history),
        "repairs": repair_history
    }


@router.get("/phone/{phone}/profile")
async def get_customer_profile(
    phone: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get complete customer profile with repair history and statistics"""
    
    # Find repairs by phone
    repairs = db.query(Repair).filter(Repair.customer_phone == phone).order_by(Repair.created_at.desc()).all()
    
    if not repairs:
        return {"success": False, "message": "Customer not found"}
    
    latest_repair = repairs[0]
    
    # Calculate statistics
    total_repairs = len(repairs)
    completed_repairs = len([r for r in repairs if r.status and r.status.value == "completed"])
    in_progress_repairs = len([r for r in repairs if r.status and r.status.value in ["received", "diagnosed", "repairing", "testing"]])
    total_spent = sum(float(r.estimated_cost) for r in repairs if r.estimated_cost)
    
    # Device breakdown
    device_breakdown = {}
    for repair in repairs:
        device = repair.device_model or "Unknown"
        device_breakdown[device] = device_breakdown.get(device, 0) + 1
    
    # Build repair history
    repair_history = []
    for repair in repairs:
        repair_history.append({
            "id": str(repair.id),
            "tracking_id": repair.tracking_id,
            "device_model": repair.device_model,
            "status": repair.status.value if repair.status else None,
            "priority": repair.priority.value if repair.priority else None,
            "estimated_cost": float(repair.estimated_cost) if repair.estimated_cost else 0,
            "status_notes": repair.status_notes,
            "created_at": repair.created_at.isoformat() if repair.created_at else None,
            "updated_at": repair.updated_at.isoformat() if repair.updated_at else None,
        })
    
    return {
        "success": True,
        "profile": {
            "name": latest_repair.customer_name,
            "phone": latest_repair.customer_phone,
            "email": latest_repair.customer_email,
            "first_repair_date": repairs[-1].created_at.isoformat() if repairs[-1].created_at else None,
            "last_repair_date": latest_repair.created_at.isoformat() if latest_repair.created_at else None,
            "statistics": {
                "total_repairs": total_repairs,
                "completed_repairs": completed_repairs,
                "in_progress_repairs": in_progress_repairs,
                "total_spent": total_spent,
                "average_repair_cost": total_spent / total_repairs if total_repairs > 0 else 0,
            },
            "device_breakdown": device_breakdown,
            "repair_history": repair_history,
        }
    }


@router.get("/phone/{phone}/communications")
async def get_customer_communications(
    phone: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get communication history for a customer"""
    
    from app.models import Communication
    
    communications = db.query(Communication).filter(
        Communication.recipient.like(f"%{phone}%")
    ).order_by(Communication.created_at.desc()).limit(20).all()
    
    return {
        "success": True,
        "communications": [
            {
                "id": str(c.id),
                "type": c.type,
                "subject": c.subject,
                "message": c.body,
                "status": c.status,
                "created_at": c.created_at.isoformat(),
            }
            for c in communications
        ]
    }


@router.put("/{customer_id}")
async def update_customer(
    customer_id: str,
    customer_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update customer details"""
    
    # Find customer by phone (using phone as ID for now)
    repairs = db.query(Repair).filter(Repair.customer_phone == customer_id).all()
    if not repairs:
        return {"success": False, "message": "Customer not found"}
    
    # Update all repairs with this phone
    for repair in repairs:
        repair.customer_name = customer_data.get("name", repair.customer_name)
    
    db.commit()
    
    return {"success": True}


@router.post("/{customer_id}/notes")
async def add_customer_note(
    customer_id: str,
    note_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Add a note to a customer"""
    
    note = CustomerNote(
        customer_phone=customer_id,
        user_id=current_user.id,
        note=note_data.get("note"),
    )
    db.add(note)
    db.commit()
    db.refresh(note)
    
    return {"success": True, "note_id": str(note.id)}

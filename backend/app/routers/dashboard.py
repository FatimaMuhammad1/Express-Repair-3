from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, and_
from datetime import datetime, date, timedelta
from typing import Optional

from app.database import get_db
from app.models import Repair, Appointment, Product, User, Transaction
from app.dependencies import get_current_user

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])


@router.get("/activity")
async def get_dashboard_activity(
    branch_id: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get recent activity for dashboard"""
    
    activities = []
    
    # Recent repairs
    repairs = db.query(Repair).order_by(Repair.created_at.desc()).limit(5).all()
    for repair in repairs:
        activities.append({
            "id": str(repair.id),
            "type": "repair",
            "title": f"New repair: {repair.customer_name}",
            "description": f"{repair.device_model} - {repair.status}",
            "created_at": repair.created_at.isoformat(),
        })
    
    # Recent appointments
    appointments = db.query(Appointment).order_by(Appointment.created_at.desc()).limit(5).all()
    for appointment in appointments:
        activities.append({
            "id": str(appointment.id),
            "type": "booking",
            "title": f"New booking: {appointment.customer_name}",
            "description": f"{appointment.device_model} - {appointment.status}",
            "created_at": appointment.created_at.isoformat(),
        })
    
    # Sort by date
    activities.sort(key=lambda x: x["created_at"], reverse=True)
    
    return {
        "success": True,
        "activities": activities[:10]
    }


@router.get("/upcoming-bookings")
async def get_upcoming_bookings(
    branch_id: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get upcoming bookings"""
    
    today = date.today()
    bookings = db.query(Appointment).filter(
        and_(
            Appointment.preferred_date >= today,
            Appointment.status.in_(["pending", "confirmed"])
        )
    ).order_by(Appointment.preferred_date.asc()).limit(10).all()
    
    return {
        "success": True,
        "bookings": [
            {
                "id": str(b.id),
                "customer_name": b.customer_name,
                "service": b.device_model,
                "date": b.preferred_date.isoformat(),
                "time": b.preferred_time_slot,
                "status": b.status,
            }
            for b in bookings
        ]
    }


@router.get("/low-stock")
async def get_low_stock_alerts(
    branch_id: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get low stock alerts"""
    
    products = db.query(Product).filter(
        Product.stock_quantity < 5
    ).order_by(Product.stock_quantity.asc()).limit(10).all()
    
    return {
        "success": True,
        "alerts": [
            {
                "id": str(p.id),
                "product_name": p.name,
                "stock_quantity": p.stock_quantity,
            }
            for p in products
        ]
    }


@router.get("/technician-performance")
async def get_technician_performance(
    branch_id: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get technician performance stats"""
    
    # Get all staff users (technicians)
    technicians = db.query(User).filter(User.role == "staff").all()
    
    performance = []
    for tech in technicians:
        # Count completed repairs
        completed_repairs = db.query(Repair).filter(
            Repair.status == "collection"
        ).count()
        
        # Calculate revenue (simplified)
        revenue = db.query(func.sum(Repair.estimated_cost)).filter(
            Repair.status == "collection"
        ).scalar() or 0
        
        performance.append({
            "id": str(tech.id),
            "name": tech.name,
            "role": tech.role,
            "completed_repairs": completed_repairs,
            "avg_time": "2.5d",  # Placeholder
            "revenue": float(revenue),
            "efficiency": "92%",  # Placeholder
            "rating": 4.5,  # Placeholder
        })
    
    return {
        "success": True,
        "performance": performance
    }

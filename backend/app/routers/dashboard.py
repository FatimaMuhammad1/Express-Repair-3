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
        # Count completed repairs assigned to this technician
        completed_repairs = db.query(Repair).filter(
            Repair.technician_id == tech.id,
            Repair.status.in_(["collection", "completed"])
        ).count()
        
        # Calculate revenue from this technician's repairs
        revenue = db.query(func.sum(Repair.estimated_cost)).filter(
            Repair.technician_id == tech.id,
            Repair.status.in_(["collection", "completed"])
        ).scalar() or 0
        
        # Calculate average repair time (from creation to completion)
        completed_repairs_list = db.query(Repair).filter(
            Repair.technician_id == tech.id,
            Repair.status.in_(["collection", "completed"])
        ).all()
        
        avg_time_hours = 0
        if completed_repairs_list:
            total_hours = sum(
                (r.updated_at - r.created_at).total_seconds() / 3600
                for r in completed_repairs_list
                if r.updated_at and r.created_at
            )
            avg_time_hours = total_hours / len(completed_repairs_list) if completed_repairs_list else 0
        
        # Calculate efficiency (repairs completed per week in last 30 days)
        thirty_days_ago = datetime.utcnow() - timedelta(days=30)
        recent_completed = db.query(Repair).filter(
            Repair.technician_id == tech.id,
            Repair.status.in_(["collection", "completed"]),
            Repair.updated_at >= thirty_days_ago
        ).count()
        efficiency = (recent_completed / 4) if recent_completed > 0 else 0  # repairs per week
        
        performance.append({
            "id": str(tech.id),
            "name": tech.name,
            "role": tech.role,
            "completed_repairs": completed_repairs,
            "avg_time": f"{avg_time_hours:.1f}h",
            "revenue": float(revenue),
            "efficiency": f"{efficiency:.1f}/week",
            "rating": min(5.0, efficiency * 0.5 + 3.0) if efficiency > 0 else 0.0,  # Rating based on efficiency
        })
    
    return {
        "success": True,
        "performance": performance
    }

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.database import get_db
from app.models import Repair, Product, User, Appointment
from app.dependencies import get_current_user

router = APIRouter(prefix="/api/search", tags=["Search"])


@router.get("/")
async def global_search(
    q: str = Query(..., min_length=2),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Global search across all entities"""
    
    results = []
    
    # Search repairs
    repairs = db.query(Repair).filter(
        or_(
            Repair.customer_name.ilike(f"%{q}%"),
            Repair.customer_phone.ilike(f"%{q}%"),
            Repair.device_model.ilike(f"%{q}%"),
            Repair.tracking_id.ilike(f"%{q}%"),
        )
    ).limit(10).all()
    
    for repair in repairs:
        results.append({
            "id": str(repair.id),
            "type": "repair",
            "title": f"{repair.customer_name} - {repair.device_model}",
            "subtitle": repair.tracking_id,
            "url": f"/admin/repairs/{repair.id}",
        })
    
    # Search products
    products = db.query(Product).filter(
        or_(
            Product.name.ilike(f"%{q}%"),
            Product.brand.ilike(f"%{q}%"),
            Product.model.ilike(f"%{q}%"),
        )
    ).limit(10).all()
    
    for product in products:
        results.append({
            "id": str(product.id),
            "type": "product",
            "title": product.name,
            "subtitle": f"{product.brand} {product.model}",
            "url": "/admin",
        })
    
    # Search users (staff)
    users = db.query(User).filter(
        or_(
            User.name.ilike(f"%{q}%"),
            User.email.ilike(f"%{q}%"),
            User.phone.ilike(f"%{q}%"),
        )
    ).limit(10).all()
    
    for user in users:
        results.append({
            "id": str(user.id),
            "type": "staff",
            "title": user.name,
            "subtitle": user.email,
            "url": "/admin",
        })
    
    # Search appointments/bookings
    appointments = db.query(Appointment).filter(
        or_(
            Appointment.customer_name.ilike(f"%{q}%"),
            Appointment.customer_email.ilike(f"%{q}%"),
            Appointment.customer_phone.ilike(f"%{q}%"),
        )
    ).limit(10).all()
    
    for appointment in appointments:
        results.append({
            "id": str(appointment.id),
            "type": "booking",
            "title": appointment.customer_name,
            "subtitle": appointment.device_model,
            "url": "/admin",
        })
    
    return {
        "success": True,
        "results": results
    }

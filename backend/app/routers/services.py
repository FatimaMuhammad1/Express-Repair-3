from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from decimal import Decimal

from app.database import get_db
from app.models import Service, User
from app.dependencies import require_roles
from pydantic import BaseModel

router = APIRouter(prefix="/api/services", tags=["Services Management"])


class ServiceCreate(BaseModel):
    name: str
    description: str
    base_price: float
    estimated_time: str
    icon_name: str
    is_active: bool = True


class ServiceUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    base_price: Optional[float] = None
    estimated_time: Optional[str] = None
    icon_name: Optional[str] = None
    is_active: Optional[bool] = None


@router.get("/admin")
def get_all_services(
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Get all services for admin management"""
    services = db.query(Service).order_by(Service.name).all()
    return {
        "success": True,
        "services": [
            {
                "id": s.id,
                "name": s.name,
                "description": s.description,
                "base_price": float(s.base_price),
                "estimated_time": s.estimated_time,
                "icon_name": s.icon_name,
                "is_active": s.is_active
            }
            for s in services
        ]
    }


@router.post("/", status_code=201)
def create_service(
    body: ServiceCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Create a new service"""
    existing = db.query(Service).filter(Service.name == body.name).first()
    if existing:
        raise HTTPException(400, "Service with this name already exists")
    
    service = Service(
        name=body.name,
        description=body.description,
        base_price=Decimal(str(body.base_price)),
        estimated_time=body.estimated_time,
        icon_name=body.icon_name,
        is_active=body.is_active
    )
    db.add(service)
    db.commit()
    db.refresh(service)
    
    return {
        "success": True,
        "message": "Service created successfully",
        "service": {
            "id": service.id,
            "name": service.name,
            "description": service.description,
            "base_price": float(service.base_price),
            "estimated_time": service.estimated_time,
            "icon_name": service.icon_name,
            "is_active": service.is_active
        }
    }


@router.put("/{service_id}")
def update_service(
    service_id: int,
    body: ServiceUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Update a service"""
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(404, "Service not found")
    
    if body.name is not None:
        service.name = body.name
    if body.description is not None:
        service.description = body.description
    if body.base_price is not None:
        service.base_price = Decimal(str(body.base_price))
    if body.estimated_time is not None:
        service.estimated_time = body.estimated_time
    if body.icon_name is not None:
        service.icon_name = body.icon_name
    if body.is_active is not None:
        service.is_active = body.is_active
    
    db.commit()
    db.refresh(service)
    
    return {
        "success": True,
        "message": "Service updated successfully",
        "service": {
            "id": service.id,
            "name": service.name,
            "description": service.description,
            "base_price": float(service.base_price),
            "estimated_time": service.estimated_time,
            "icon_name": service.icon_name,
            "is_active": service.is_active
        }
    }


@router.delete("/{service_id}")
def delete_service(
    service_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Delete a service"""
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(404, "Service not found")
    
    db.delete(service)
    db.commit()
    
    return {"success": True, "message": "Service deleted successfully"}

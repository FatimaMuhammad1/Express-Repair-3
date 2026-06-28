from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from typing import Optional
from datetime import datetime

from app.database import get_db
from app.models import Supplier, User
from app.dependencies import require_roles
from pydantic import BaseModel

router = APIRouter(prefix="/api/suppliers", tags=["Suppliers"])


class SupplierCreate(BaseModel):
    name: str
    contact: str
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    notes: Optional[str] = None


class SupplierUpdate(BaseModel):
    name: Optional[str] = None
    contact: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    notes: Optional[str] = None
    is_active: Optional[bool] = None


@router.get("")
def get_suppliers(
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN", "staff"))
):
    """Get all suppliers"""
    suppliers = db.query(Supplier).order_by(Supplier.name).all()
    result = []
    for supplier in suppliers:
        result.append({
            "id": str(supplier.id),
            "name": supplier.name,
            "contact": supplier.contact,
            "email": supplier.email,
            "phone": supplier.phone,
            "address": supplier.address,
            "notes": supplier.notes,
            "is_active": supplier.is_active,
            "created_at": supplier.created_at.isoformat()
        })
    return {"success": True, "suppliers": result}


@router.post("", status_code=201)
def create_supplier(
    body: SupplierCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN", "staff"))
):
    """Create a new supplier"""
    existing = db.query(Supplier).filter(Supplier.name == body.name).first()
    if existing:
        raise HTTPException(400, "Supplier with this name already exists")
    
    supplier = Supplier(**body.model_dump())
    db.add(supplier)
    db.commit()
    db.refresh(supplier)
    
    return {
        "success": True,
        "message": "Supplier created successfully",
        "supplier": {
            "id": str(supplier.id),
            "name": supplier.name,
            "contact": supplier.contact,
            "email": supplier.email,
            "phone": supplier.phone,
            "address": supplier.address,
            "notes": supplier.notes,
            "is_active": supplier.is_active
        }
    }


@router.put("/{supplier_id}")
def update_supplier(
    supplier_id: UUID,
    body: SupplierUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Update a supplier"""
    supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
    if not supplier:
        raise HTTPException(404, "Supplier not found")
    
    for key, value in body.model_dump(exclude_unset=True).items():
        setattr(supplier, key, value)
    
    db.commit()
    db.refresh(supplier)
    
    return {
        "success": True,
        "message": "Supplier updated successfully",
        "supplier": {
            "id": str(supplier.id),
            "name": supplier.name,
            "contact": supplier.contact,
            "email": supplier.email,
            "phone": supplier.phone,
            "address": supplier.address,
            "notes": supplier.notes,
            "is_active": supplier.is_active
        }
    }


@router.delete("/{supplier_id}")
def delete_supplier(
    supplier_id: UUID,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Delete a supplier"""
    supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
    if not supplier:
        raise HTTPException(404, "Supplier not found")
    
    db.delete(supplier)
    db.commit()
    
    return {"success": True, "message": "Supplier deleted successfully"}

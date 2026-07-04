from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from typing import Optional
from datetime import datetime

from app.database import get_db
from app.models import Supplier, User, PurchaseOrderStatus
from app.dependencies import require_roles
from pydantic import BaseModel

router = APIRouter(prefix="/api/suppliers", tags=["Suppliers"])


class SupplierCreate(BaseModel):
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None


class SupplierUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    is_active: Optional[bool] = None


@router.get("")
def get_suppliers(
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Get all suppliers"""
    suppliers = db.query(Supplier).order_by(Supplier.name).all()
    result = []
    for supplier in suppliers:
        result.append({
            "id": str(supplier.id),
            "name": supplier.name,
            "email": supplier.email,
            "phone": supplier.phone,
            "address": supplier.address,
            "is_active": supplier.is_active,
            "created_at": supplier.created_at.isoformat()
        })
    return {"success": True, "suppliers": result}


@router.post("", status_code=201)
def create_supplier(
    body: SupplierCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN"))
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
            "email": supplier.email,
            "phone": supplier.phone,
            "address": supplier.address,
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
            "email": supplier.email,
            "phone": supplier.phone,
            "address": supplier.address,
            "is_active": supplier.is_active
        }
    }


@router.delete("/{supplier_id}")
def delete_supplier(
    supplier_id: UUID,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Delete a supplier (only if no purchase orders exist)"""
    supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
    if not supplier:
        raise HTTPException(404, "Supplier not found")
    
    # Check if supplier has purchase orders
    from app.models import PurchaseOrder
    po_count = db.query(PurchaseOrder).filter(PurchaseOrder.supplier_id == supplier_id).count()
    if po_count > 0:
        raise HTTPException(400, f"Cannot delete supplier with {po_count} purchase orders. Archive instead.")
    
    db.delete(supplier)
    db.commit()
    
    return {"success": True, "message": "Supplier deleted successfully"}


@router.post("/{supplier_id}/archive")
def archive_supplier(
    supplier_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Archive a supplier (soft delete)"""
    supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
    if not supplier:
        raise HTTPException(404, "Supplier not found")
    
    if supplier.is_archived:
        raise HTTPException(400, "Supplier is already archived")
    
    supplier.is_archived = True
    supplier.is_active = False
    supplier.archived_at = datetime.utcnow()
    supplier.archived_by = current_user.id
    
    db.commit()
    
    return {"success": True, "message": "Supplier archived successfully"}


@router.post("/{supplier_id}/activate")
def activate_supplier(
    supplier_id: UUID,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Activate an archived supplier"""
    supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
    if not supplier:
        raise HTTPException(404, "Supplier not found")
    
    if not supplier.is_archived:
        raise HTTPException(400, "Supplier is not archived")
    
    supplier.is_archived = False
    supplier.is_active = True
    supplier.archived_at = None
    supplier.archived_by = None
    
    db.commit()
    
    return {"success": True, "message": "Supplier activated successfully"}


@router.get("/{supplier_id}/history")
def get_supplier_history(
    supplier_id: UUID,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Get purchase order history for a supplier"""
    supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
    if not supplier:
        raise HTTPException(404, "Supplier not found")
    
    from app.models import PurchaseOrder
    orders = db.query(PurchaseOrder).filter(
        PurchaseOrder.supplier_id == supplier_id
    ).order_by(PurchaseOrder.created_at.desc()).limit(50).all()
    
    result = []
    for order in orders:
        result.append({
            "id": str(order.id),
            "order_number": order.order_number,
            "status": order.status.value,
            "total_amount": float(order.total_amount),
            "created_at": order.created_at.isoformat(),
            "items_count": len(order.items)
        })
    
    # Calculate metrics
    total_orders = db.query(PurchaseOrder).filter(PurchaseOrder.supplier_id == supplier_id).count()
    total_spend = db.query(PurchaseOrder).filter(
        PurchaseOrder.supplier_id == supplier_id,
        PurchaseOrder.status == PurchaseOrderStatus.received
    ).with_entities(db.func.sum(PurchaseOrder.total_amount)).scalar() or 0
    
    return {
        "success": True,
        "history": result,
        "metrics": {
            "total_orders": total_orders,
            "total_spend": float(total_spend)
        }
    }

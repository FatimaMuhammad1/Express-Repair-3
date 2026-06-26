from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from decimal import Decimal
from typing import Optional

from app.database import get_db
from app.models import RepairPart, Repair, Product, User
from app.dependencies import require_roles
from pydantic import BaseModel

router = APIRouter(prefix="/api/repairs", tags=["Repair Parts"])


class RepairPartCreate(BaseModel):
    product_id: Optional[UUID] = None
    part_name: str
    quantity: int = 1
    unit_cost: Optional[Decimal] = None
    notes: Optional[str] = None


class RepairPartUpdate(BaseModel):
    quantity: Optional[int] = None
    unit_cost: Optional[Decimal] = None
    notes: Optional[str] = None


class RepairPartOut(BaseModel):
    id: UUID
    repair_id: UUID
    product_id: Optional[UUID] = None
    part_name: str
    quantity: int
    unit_cost: Decimal
    total_cost: Decimal
    notes: Optional[str] = None
    created_at: str
    product_name: Optional[str] = None

    model_config = {"from_attributes": True}


@router.get("/{tracking_id}/parts")
def get_repair_parts(
    tracking_id: str,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin", "technician", "staff", "SUPER_ADMIN")),
):
    """Get all parts used in a repair"""
    repair = db.query(Repair).filter(Repair.tracking_id == tracking_id.upper()).first()
    if not repair:
        raise HTTPException(404, "Repair not found")

    parts = db.query(RepairPart).filter(RepairPart.repair_id == repair.id).all()
    
    result = []
    for part in parts:
        part_dict = {
            "id": str(part.id),
            "repair_id": str(part.repair_id),
            "product_id": str(part.product_id) if part.product_id else None,
            "part_name": part.part_name,
            "quantity": part.quantity,
            "unit_cost": float(part.unit_cost),
            "total_cost": float(part.total_cost),
            "notes": part.notes,
            "created_at": part.created_at.isoformat(),
            "product_name": part.product.name if part.product else None,
        }
        result.append(part_dict)

    return {
        "success": True,
        "parts": result,
        "total_cost": sum(p["total_cost"] for p in result)
    }


@router.post("/{tracking_id}/parts", status_code=201)
def add_repair_part(
    tracking_id: str,
    body: RepairPartCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin", "technician", "staff", "SUPER_ADMIN")),
):
    """Add a part to a repair"""
    repair = db.query(Repair).filter(Repair.tracking_id == tracking_id.upper()).first()
    if not repair:
        raise HTTPException(404, "Repair not found")

    # If product_id is provided, get product details
    unit_cost = body.unit_cost
    if body.product_id:
        product = db.query(Product).filter(Product.id == body.product_id).first()
        if not product:
            raise HTTPException(404, "Product not found")
        
        # Use product price if unit_cost not provided
        if unit_cost is None:
            unit_cost = product.price
        
        # Check stock
        if product.stock_quantity < body.quantity:
            raise HTTPException(400, f"Insufficient stock. Available: {product.stock_quantity}, Requested: {body.quantity}")
        
        # Deduct from inventory
        product.stock_quantity -= body.quantity
        part_name = product.name
    else:
        part_name = body.part_name
        if unit_cost is None:
            unit_cost = Decimal("0.00")

    total_cost = unit_cost * Decimal(body.quantity)

    part = RepairPart(
        repair_id=repair.id,
        product_id=body.product_id,
        part_name=part_name,
        quantity=body.quantity,
        unit_cost=unit_cost,
        total_cost=total_cost,
        notes=body.notes,
    )

    db.add(part)
    db.commit()
    db.refresh(part)

    return {
        "success": True,
        "message": "Part added to repair successfully",
        "part": {
            "id": str(part.id),
            "repair_id": str(part.repair_id),
            "product_id": str(part.product_id) if part.product_id else None,
            "part_name": part.part_name,
            "quantity": part.quantity,
            "unit_cost": float(part.unit_cost),
            "total_cost": float(part.total_cost),
            "notes": part.notes,
            "created_at": part.created_at.isoformat(),
        }
    }


@router.put("/{tracking_id}/parts/{part_id}")
def update_repair_part(
    tracking_id: str,
    part_id: UUID,
    body: RepairPartUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin", "technician", "SUPER_ADMIN")),
):
    """Update a repair part"""
    repair = db.query(Repair).filter(Repair.tracking_id == tracking_id.upper()).first()
    if not repair:
        raise HTTPException(404, "Repair not found")

    part = db.query(RepairPart).filter(
        RepairPart.id == part_id,
        RepairPart.repair_id == repair.id
    ).first()
    
    if not part:
        raise HTTPException(404, "Repair part not found")

    # Update fields
    if body.quantity is not None:
        # If linked to product, adjust inventory
        if part.product_id:
            product = db.query(Product).filter(Product.id == part.product_id).first()
            if product:
                # Restore old quantity
                product.stock_quantity += part.quantity
                # Deduct new quantity
                if product.stock_quantity < body.quantity:
                    raise HTTPException(400, f"Insufficient stock. Available: {product.stock_quantity}, Requested: {body.quantity}")
                product.stock_quantity -= body.quantity
        
        part.quantity = body.quantity
    
    if body.unit_cost is not None:
        part.unit_cost = body.unit_cost
    
    if body.notes is not None:
        part.notes = body.notes

    # Recalculate total cost
    part.total_cost = part.unit_cost * Decimal(part.quantity)

    db.commit()
    db.refresh(part)

    return {
        "success": True,
        "message": "Repair part updated successfully",
        "part": {
            "id": str(part.id),
            "repair_id": str(part.repair_id),
            "product_id": str(part.product_id) if part.product_id else None,
            "part_name": part.part_name,
            "quantity": part.quantity,
            "unit_cost": float(part.unit_cost),
            "total_cost": float(part.total_cost),
            "notes": part.notes,
            "created_at": part.created_at.isoformat(),
        }
    }


@router.delete("/{tracking_id}/parts/{part_id}")
def delete_repair_part(
    tracking_id: str,
    part_id: UUID,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin", "SUPER_ADMIN")),
):
    """Delete a repair part"""
    repair = db.query(Repair).filter(Repair.tracking_id == tracking_id.upper()).first()
    if not repair:
        raise HTTPException(404, "Repair not found")

    part = db.query(RepairPart).filter(
        RepairPart.id == part_id,
        RepairPart.repair_id == repair.id
    ).first()
    
    if not part:
        raise HTTPException(404, "Repair part not found")

    # Restore inventory if linked to product
    if part.product_id:
        product = db.query(Product).filter(Product.id == part.product_id).first()
        if product:
            product.stock_quantity += part.quantity

    db.delete(part)
    db.commit()

    return {
        "success": True,
        "message": "Repair part deleted successfully"
    }

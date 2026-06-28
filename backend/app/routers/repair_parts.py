from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from decimal import Decimal
from typing import Optional

from app.database import get_db
from app.models import RepairPart, Repair, Product, User, RepairPartInventory
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


# ── Repair Parts Inventory Schemas ─────────────────────────────────────────────

class RepairPartInventoryCreate(BaseModel):
    name: str
    description: Optional[str] = None
    part_type: str  # e.g., "screen", "battery", "tool", "cable"
    brand: Optional[str] = None
    model: Optional[str] = None
    sku: Optional[str] = None
    supplier: Optional[str] = None
    unit_cost: Decimal
    stock_quantity: int = 0
    min_stock_level: int = 5
    location: Optional[str] = None
    notes: Optional[str] = None


class RepairPartInventoryUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    part_type: Optional[str] = None
    brand: Optional[str] = None
    model: Optional[str] = None
    sku: Optional[str] = None
    supplier: Optional[str] = None
    unit_cost: Optional[Decimal] = None
    stock_quantity: Optional[int] = None
    min_stock_level: Optional[int] = None
    location: Optional[str] = None
    notes: Optional[str] = None
    is_active: Optional[bool] = None


class RepairPartInventoryOut(BaseModel):
    id: UUID
    name: str
    description: Optional[str]
    part_type: str
    brand: Optional[str]
    model: Optional[str]
    sku: Optional[str]
    supplier: Optional[str]
    unit_cost: Decimal
    stock_quantity: int
    min_stock_level: int
    location: Optional[str]
    notes: Optional[str]
    is_active: bool
    created_at: str
    updated_at: str

    model_config = {"from_attributes": True}


# ── Repair Parts (used in repairs) ─────────────────────────────────────────────


@router.get("/{tracking_id}/parts")
def get_repair_parts(
    tracking_id: str,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("staff", "SUPER_ADMIN")),
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
    _: User = Depends(require_roles("staff", "SUPER_ADMIN")),
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
    _: User = Depends(require_roles("SUPER_ADMIN", "staff")),
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
    _: User = Depends(require_roles("SUPER_ADMIN")),
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


# ── Repair Parts Inventory Management ──────────────────────────────────────────

@router.get("/inventory", tags=["Repair Parts Inventory"])
def get_repair_parts_inventory(
    part_type: Optional[str] = None,
    search: Optional[str] = None,
    low_stock_only: bool = False,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("staff", "SUPER_ADMIN")),
):
    """Get all repair parts inventory with optional filters"""
    query = db.query(RepairPartInventory).filter(RepairPartInventory.is_active == True)
    
    if part_type:
        query = query.filter(RepairPartInventory.part_type == part_type)
    
    if search:
        query = query.filter(
            (RepairPartInventory.name.ilike(f"%{search}%")) |
            (RepairPartInventory.sku.ilike(f"%{search}%")) |
            (RepairPartInventory.brand.ilike(f"%{search}%"))
        )
    
    if low_stock_only:
        query = query.filter(RepairPartInventory.stock_quantity <= RepairPartInventory.min_stock_level)
    
    parts = query.order_by(RepairPartInventory.name).all()
    
    return {
        "success": True,
        "parts": [
            {
                "id": str(p.id),
                "name": p.name,
                "description": p.description,
                "part_type": p.part_type,
                "brand": p.brand,
                "model": p.model,
                "sku": p.sku,
                "supplier": p.supplier,
                "unit_cost": float(p.unit_cost),
                "stock_quantity": p.stock_quantity,
                "min_stock_level": p.min_stock_level,
                "location": p.location,
                "notes": p.notes,
                "is_active": p.is_active,
                "created_at": p.created_at.isoformat(),
                "updated_at": p.updated_at.isoformat(),
            }
            for p in parts
        ]
    }


@router.post("/inventory", status_code=201, tags=["Repair Parts Inventory"])
def create_repair_part_inventory(
    body: RepairPartInventoryCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN", "staff")),
):
    """Create a new repair part inventory item"""
    # Check if SKU already exists
    if body.sku:
        existing = db.query(RepairPartInventory).filter(RepairPartInventory.sku == body.sku).first()
        if existing:
            raise HTTPException(400, "SKU already exists")
    
    part = RepairPartInventory(
        name=body.name,
        description=body.description,
        part_type=body.part_type,
        brand=body.brand,
        model=body.model,
        sku=body.sku,
        supplier=body.supplier,
        unit_cost=body.unit_cost,
        stock_quantity=body.stock_quantity,
        min_stock_level=body.min_stock_level,
        location=body.location,
        notes=body.notes,
    )
    
    db.add(part)
    db.commit()
    db.refresh(part)
    
    return {
        "success": True,
        "message": "Repair part inventory item created successfully",
        "part": {
            "id": str(part.id),
            "name": part.name,
            "description": part.description,
            "part_type": part.part_type,
            "brand": part.brand,
            "model": part.model,
            "sku": part.sku,
            "supplier": part.supplier,
            "unit_cost": float(part.unit_cost),
            "stock_quantity": part.stock_quantity,
            "min_stock_level": part.min_stock_level,
            "location": part.location,
            "notes": part.notes,
            "is_active": part.is_active,
            "created_at": part.created_at.isoformat(),
            "updated_at": part.updated_at.isoformat(),
        }
    }


@router.put("/inventory/{part_id}", tags=["Repair Parts Inventory"])
def update_repair_part_inventory(
    part_id: UUID,
    body: RepairPartInventoryUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN", "staff")),
):
    """Update a repair part inventory item"""
    part = db.query(RepairPartInventory).filter(RepairPartInventory.id == part_id).first()
    if not part:
        raise HTTPException(404, "Repair part inventory item not found")
    
    # Check if SKU already exists (if being changed)
    if body.sku and body.sku != part.sku:
        existing = db.query(RepairPartInventory).filter(RepairPartInventory.sku == body.sku).first()
        if existing:
            raise HTTPException(400, "SKU already exists")
    
    # Update fields
    for field, value in body.model_dump(exclude_unset=True).items():
        setattr(part, field, value)
    
    db.commit()
    db.refresh(part)
    
    return {
        "success": True,
        "message": "Repair part inventory item updated successfully",
        "part": {
            "id": str(part.id),
            "name": part.name,
            "description": part.description,
            "part_type": part.part_type,
            "brand": part.brand,
            "model": part.model,
            "sku": part.sku,
            "supplier": part.supplier,
            "unit_cost": float(part.unit_cost),
            "stock_quantity": part.stock_quantity,
            "min_stock_level": part.min_stock_level,
            "location": part.location,
            "notes": part.notes,
            "is_active": part.is_active,
            "created_at": part.created_at.isoformat(),
            "updated_at": part.updated_at.isoformat(),
        }
    }


@router.delete("/inventory/{part_id}", tags=["Repair Parts Inventory"])
def delete_repair_part_inventory(
    part_id: UUID,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN")),
):
    """Delete a repair part inventory item (soft delete)"""
    part = db.query(RepairPartInventory).filter(RepairPartInventory.id == part_id).first()
    if not part:
        raise HTTPException(404, "Repair part inventory item not found")
    
    part.is_active = False
    db.commit()
    
    return {
        "success": True,
        "message": "Repair part inventory item deleted successfully"
    }


@router.post("/inventory/{part_id}/stock", tags=["Repair Parts Inventory"])
def adjust_repair_part_stock(
    part_id: UUID,
    quantity: int,
    movement_type: str = "adjustment",  # "in", "out", "adjustment"
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN", "staff")),
):
    """Adjust stock quantity for a repair part"""
    part = db.query(RepairPartInventory).filter(RepairPartInventory.id == part_id).first()
    if not part:
        raise HTTPException(404, "Repair part inventory item not found")
    
    if movement_type == "out":
        if part.stock_quantity < quantity:
            raise HTTPException(400, f"Insufficient stock. Available: {part.stock_quantity}, Requested: {quantity}")
        part.stock_quantity -= quantity
    elif movement_type == "in":
        part.stock_quantity += quantity
    else:  # adjustment
        part.stock_quantity = quantity
    
    db.commit()
    db.refresh(part)
    
    return {
        "success": True,
        "message": "Stock adjusted successfully",
        "part": {
            "id": str(part.id),
            "name": part.name,
            "stock_quantity": part.stock_quantity,
        }
    }


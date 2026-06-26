from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from typing import Optional

from app.database import get_db
from app.models import Supplier, PurchaseOrder, StockMovement, Product, User
from app.dependencies import get_current_user

router = APIRouter(prefix="/api/inventory", tags=["Inventory"])


# ── Suppliers ────────────────────────────────────────────────────────────────

@router.get("/suppliers")
async def get_suppliers(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all suppliers"""
    
    suppliers = db.query(Supplier).filter(Supplier.is_active == True).all()
    
    return {
        "success": True,
        "suppliers": [
            {
                "id": str(s.id),
                "name": s.name,
                "email": s.email,
                "phone": s.phone,
                "address": s.address,
                "is_active": s.is_active,
            }
            for s in suppliers
        ]
    }


@router.post("/suppliers")
async def create_supplier(
    supplier_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new supplier"""
    
    supplier = Supplier(
        name=supplier_data.get("name"),
        email=supplier_data.get("email"),
        phone=supplier_data.get("phone"),
        address=supplier_data.get("address"),
        is_active=supplier_data.get("is_active", True),
    )
    db.add(supplier)
    db.commit()
    db.refresh(supplier)
    
    return {"success": True, "supplier_id": str(supplier.id)}


# ── Purchase Orders ───────────────────────────────────────────────────────────

@router.get("/purchase-orders")
async def get_purchase_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all purchase orders"""
    
    orders = db.query(PurchaseOrder).all()
    
    return {
        "success": True,
        "orders": [
            {
                "id": str(o.id),
                "order_number": o.order_number,
                "supplier_id": str(o.supplier_id) if o.supplier_id else None,
                "supplier_name": o.supplier.name if o.supplier else None,
                "status": o.status,
                "total_amount": float(o.total_amount),
                "created_at": o.created_at.isoformat(),
            }
            for o in orders
        ]
    }


@router.post("/purchase-orders")
async def create_purchase_order(
    order_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new purchase order"""
    
    import uuid
    order = PurchaseOrder(
        supplier_id=order_data.get("supplier_id"),
        branch_id=order_data.get("branch_id"),
        order_number=f"PO-{datetime.now().strftime('%Y%m%d')}-{str(uuid.uuid4())[:8].upper()}",
        status="pending",
        total_amount=order_data.get("total_amount", 0),
        notes=order_data.get("notes"),
    )
    db.add(order)
    db.commit()
    db.refresh(order)
    
    return {"success": True, "order_id": str(order.id)}


# ── Stock Movements ────────────────────────────────────────────────────────────

@router.get("/stock-movements")
async def get_stock_movements(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all stock movements"""
    
    movements = db.query(StockMovement).order_by(StockMovement.created_at.desc()).limit(100).all()
    
    return {
        "success": True,
        "movements": [
            {
                "id": str(m.id),
                "product_id": str(m.product_id),
                "product_name": m.product.name if m.product else None,
                "type": m.type,
                "quantity": m.quantity,
                "reason": m.reason,
                "created_at": m.created_at.isoformat(),
            }
            for m in movements
        ]
    }


@router.post("/{product_id}/deduct")
async def deduct_stock(
    product_id: str,
    stock_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Deduct stock from a product"""
    
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        return {"success": False, "message": "Product not found"}
    
    quantity = stock_data.get("quantity", 0)
    if product.stock_quantity < quantity:
        return {"success": False, "message": "Insufficient stock"}
    
    product.stock_quantity -= quantity
    
    # Record movement
    movement = StockMovement(
        product_id=product_id,
        type="out",
        quantity=quantity,
        reason=stock_data.get("reason", "Manual deduction"),
        user_id=current_user.id,
    )
    db.add(movement)
    db.commit()
    
    return {"success": True}


@router.post("/{product_id}/add")
async def add_stock(
    product_id: str,
    stock_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Add stock to a product"""
    
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        return {"success": False, "message": "Product not found"}
    
    quantity = stock_data.get("quantity", 0)
    product.stock_quantity += quantity
    
    # Record movement
    movement = StockMovement(
        product_id=product_id,
        type="in",
        quantity=quantity,
        reason=stock_data.get("reason", "Manual addition"),
        user_id=current_user.id,
    )
    db.add(movement)
    db.commit()
    
    return {"success": True}

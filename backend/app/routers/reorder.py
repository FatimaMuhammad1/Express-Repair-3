from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from decimal import Decimal
from typing import Optional, List
from datetime import datetime

from app.database import get_db
from app.models import Product, Supplier, User, RepairPartInventory
from app.dependencies import require_roles
from pydantic import BaseModel

router = APIRouter(prefix="/api/inventory", tags=["Reorder Management"])


class LowStockItem(BaseModel):
    id: UUID
    name: str
    current_stock: int
    reorder_threshold: int
    reorder_quantity: int
    supplier_id: Optional[UUID] = None
    supplier_name: Optional[str] = None
    suggested_order_qty: int
    item_type: str  # "product" or "repair_part"


class ReorderSuggestion(BaseModel):
    product_id: UUID
    product_name: str
    current_stock: int
    reorder_threshold: int
    suggested_quantity: int
    supplier_id: Optional[UUID] = None
    estimated_cost: Optional[Decimal] = None


@router.get("/low-stock")
def get_low_stock_items(
    search: Optional[str] = None,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN")),
):
    """Get all items that are at or below their reorder threshold (products and repair parts)"""
    low_stock_items = []
    
    # Get low stock products
    products_query = db.query(Product).filter(
        Product.is_active == True,
        Product.stock_quantity <= Product.reorder_threshold
    )
    
    if search:
        products_query = products_query.filter(
            Product.name.ilike(f"%{search}%")
        )
    
    products = products_query.all()
    
    for product in products:
        supplier_name = None
        if product.supplier:
            supplier_name = product.supplier.name

        low_stock_items.append({
            "id": str(product.id),
            "name": product.name,
            "current_stock": product.stock_quantity,
            "reorder_threshold": product.reorder_threshold,
            "reorder_quantity": product.reorder_quantity,
            "supplier_id": str(product.supplier_id) if product.supplier_id else None,
            "supplier_name": supplier_name,
            "suggested_order_qty": product.reorder_quantity,
            "item_type": "product"
        })
    
    # Get low stock repair parts
    repair_parts_query = db.query(RepairPartInventory).filter(
        RepairPartInventory.is_active == True,
        RepairPartInventory.stock_quantity <= RepairPartInventory.min_stock_level
    )
    
    if search:
        repair_parts_query = repair_parts_query.filter(
            RepairPartInventory.name.ilike(f"%{search}%")
        )
    
    repair_parts = repair_parts_query.all()
    
    for part in repair_parts:
        low_stock_items.append({
            "id": str(part.id),
            "name": part.name,
            "current_stock": part.stock_quantity,
            "reorder_threshold": part.min_stock_level,
            "reorder_quantity": 10,  # Default for repair parts
            "supplier_id": None,
            "supplier_name": part.supplier if part.supplier else None,
            "suggested_order_qty": 10,
            "item_type": "repair_part"
        })

    return {
        "success": True,
        "low_stock_items": low_stock_items,
        "count": len(low_stock_items)
    }


@router.post("/generate-reorder-suggestions")
def generate_reorder_suggestions(
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN")),
):
    """Generate reorder suggestions for all low stock items"""
    products = db.query(Product).filter(
        Product.is_active == True,
        Product.stock_quantity <= Product.reorder_threshold
    ).all()

    suggestions = []
    for product in products:
        suggested_qty = product.reorder_quantity
        estimated_cost = product.price * suggested_qty if product.price else None

        suggestions.append({
            "product_id": str(product.id),
            "product_name": product.name,
            "current_stock": product.stock_quantity,
            "reorder_threshold": product.reorder_threshold,
            "suggested_quantity": suggested_qty,
            "supplier_id": str(product.supplier_id) if product.supplier_id else None,
            "estimated_cost": float(estimated_cost) if estimated_cost else None,
        })

    # Group by supplier for easier ordering
    grouped_by_supplier = {}
    for suggestion in suggestions:
        supplier_id = suggestion["supplier_id"] or "no_supplier"
        if supplier_id not in grouped_by_supplier:
            grouped_by_supplier[supplier_id] = []
        grouped_by_supplier[supplier_id].append(suggestion)

    return {
        "success": True,
        "suggestions": suggestions,
        "grouped_by_supplier": grouped_by_supplier,
        "total_items": len(suggestions),
        "total_estimated_cost": sum(s["estimated_cost"] or 0 for s in suggestions)
    }


@router.put("/products/{product_id}/reorder-settings")
def update_reorder_settings(
    product_id: UUID,
    reorder_threshold: int,
    reorder_quantity: int,
    supplier_id: Optional[UUID] = None,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN")),
):
    """Update reorder settings for a product"""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(404, "Product not found")

    if supplier_id:
        supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
        if not supplier:
            raise HTTPException(404, "Supplier not found")
        product.supplier_id = supplier_id

    product.reorder_threshold = reorder_threshold
    product.reorder_quantity = reorder_quantity
    db.commit()

    return {
        "success": True,
        "message": "Reorder settings updated successfully",
        "product": {
            "id": str(product.id),
            "name": product.name,
            "reorder_threshold": product.reorder_threshold,
            "reorder_quantity": product.reorder_quantity,
            "supplier_id": str(product.supplier_id) if product.supplier_id else None,
        }
    }


@router.get("/stats")
def get_stock_alert_stats(
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN")),
):
    """Get stock alert statistics for dashboard cards (products and repair parts)"""
    # Products low stock
    low_stock_count = db.query(Product).filter(
        Product.is_active == True,
        Product.stock_quantity > 0,
        Product.stock_quantity <= Product.reorder_threshold
    ).count()
    
    # Products out of stock
    out_of_stock_count = db.query(Product).filter(
        Product.is_active == True,
        Product.stock_quantity <= 0
    ).count()
    
    # Repair parts out of stock
    repair_parts_out_of_stock = db.query(RepairPartInventory).filter(
        RepairPartInventory.is_active == True,
        RepairPartInventory.stock_quantity <= 0
    ).count()
    
    # Total out of stock
    total_out_of_stock = out_of_stock_count + repair_parts_out_of_stock
    
    # Items with supplier assigned (products only for now)
    restock_ordered_count = db.query(Product).filter(
        Product.is_active == True,
        Product.stock_quantity <= Product.reorder_threshold,
        Product.supplier_id.isnot(None)
    ).count()
    
    return {
        "success": True,
        "stats": {
            "low_stock_count": low_stock_count,
            "out_of_stock_count": total_out_of_stock,
            "restock_ordered_count": restock_ordered_count
        }
    }


@router.post("/auto-reorder")
def trigger_auto_reorder(
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN")),
):
    """Trigger automatic reordering for all low stock items that have a supplier"""
    products = db.query(Product).filter(
        Product.is_active == True,
        Product.stock_quantity <= Product.reorder_threshold,
        Product.supplier_id.isnot(None)
    ).all()

    reordered_products = []
    for product in products:
        # In a real implementation, this would create purchase orders
        # For now, we'll just log the action
        reordered_products.append({
            "product_id": str(product.id),
            "product_name": product.name,
            "current_stock": product.stock_quantity,
            "reorder_quantity": product.reorder_quantity,
            "supplier_id": str(product.supplier_id),
        })

    return {
        "success": True,
        "message": f"Auto-reorder triggered for {len(reordered_products)} products",
        "reordered_products": reordered_products,
        "note": "In production, this would create purchase orders for each supplier"
    }

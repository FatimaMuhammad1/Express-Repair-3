from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from decimal import Decimal
from typing import Optional, List
from datetime import datetime

from app.database import get_db
from app.models import Product, Supplier, User
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
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN")),
):
    """Get all items that are at or below their reorder threshold"""
    products = db.query(Product).filter(
        Product.is_active == True,
        Product.stock_quantity <= Product.reorder_threshold
    ).all()

    low_stock_items = []
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

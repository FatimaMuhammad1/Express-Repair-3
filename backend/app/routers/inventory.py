from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from typing import Optional

try:
    import pandas as pd
    import io
    PANDAS_AVAILABLE = True
except ImportError:
    PANDAS_AVAILABLE = False

from app.database import get_db
from app.models import Supplier, PurchaseOrder, StockMovement, Product, User, RepairPartInventory
from app.dependencies import get_current_user
from app.routers.notifications import create_notification

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
    
    # Check for low stock and create notification
    if product.stock_quantity <= 5:
        # Notify all admin users about low stock
        admin_users = db.query(User).filter(User.role == "SUPER_ADMIN").all()
        for admin in admin_users:
            create_notification(
                db,
                admin.id,
                "low_stock_alert",
                "Low Stock Alert",
                f"Product '{product.name}' is running low on stock. Current quantity: {product.stock_quantity}",
                "/admin/inventory"
            )
    
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


@router.post("/import/excel")
async def import_inventory_excel(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Import inventory from Excel file"""
    
    if not PANDAS_AVAILABLE:
        raise HTTPException(500, "Excel import requires pandas. Install with: pip install pandas openpyxl")
    
    if not file.filename.endswith(('.xlsx', '.xls', '.csv')):
        raise HTTPException(400, "File must be Excel (.xlsx, .xls) or CSV")
    
    try:
        # Read file
        contents = await file.read()
        
        if file.filename.endswith('.csv'):
            df = pd.read_csv(io.BytesIO(contents))
        else:
            df = pd.read_excel(io.BytesIO(contents))
        
        # Validate required columns
        required_columns = ['name', 'category', 'price', 'stock_quantity']
        missing_columns = [col for col in required_columns if col not in df.columns]
        if missing_columns:
            raise HTTPException(400, f"Missing required columns: {missing_columns}")
        
        # Import products
        imported_count = 0
        errors = []
        
        for _, row in df.iterrows():
            try:
                product = Product(
                    name=row['name'],
                    description=row.get('description', ''),
                    category=row['category'].lower() if isinstance(row['category'], str) else 'accessories',
                    brand=row.get('brand'),
                    model=row.get('model'),
                    condition=row.get('condition', 'new').lower(),
                    price=float(row['price']),
                    stock_quantity=int(row.get('stock_quantity', 0)),
                    reorder_threshold=int(row.get('reorder_threshold', 5)),
                    reorder_quantity=int(row.get('reorder_quantity', 10)),
                    is_active=True,
                    is_for_sale=True
                )
                db.add(product)
                imported_count += 1
            except Exception as e:
                errors.append(f"Row {imported_count + 1}: {str(e)}")
        
        db.commit()
        
        return {
            "success": True,
            "imported": imported_count,
            "errors": errors[:10]  # Limit errors to first 10
        }
        
    except Exception as e:
        raise HTTPException(500, f"Failed to import file: {str(e)}")


# ── Inventory Dashboard Statistics ────────────────────────────────────────────────

@router.get("/dashboard-stats")
async def get_inventory_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get comprehensive inventory dashboard statistics"""
    
    # Products statistics
    total_products = db.query(Product).filter(Product.is_active == True).count()
    products_in_stock = db.query(Product).filter(
        Product.is_active == True,
        Product.stock_quantity > 0
    ).count()
    products_low_stock = db.query(Product).filter(
        Product.is_active == True,
        Product.stock_quantity > 0,
        Product.stock_quantity <= Product.reorder_threshold
    ).count()
    products_out_of_stock = db.query(Product).filter(
        Product.is_active == True,
        Product.stock_quantity <= 0
    ).count()
    
    # Calculate products stock value
    products_stock_value = db.query(Product).filter(
        Product.is_active == True
    ).all()
    products_value = sum(float(p.stock_quantity or 0) * float(p.price or 0) for p in products_stock_value)
    
    # Repair Parts statistics
    total_repair_parts = db.query(RepairPartInventory).filter(RepairPartInventory.is_active == True).count()
    repair_parts_in_stock = db.query(RepairPartInventory).filter(
        RepairPartInventory.is_active == True,
        RepairPartInventory.stock_quantity > 0
    ).count()
    repair_parts_low_stock = db.query(RepairPartInventory).filter(
        RepairPartInventory.is_active == True,
        RepairPartInventory.stock_quantity > 0,
        RepairPartInventory.stock_quantity <= RepairPartInventory.min_stock_level
    ).count()
    repair_parts_out_of_stock = db.query(RepairPartInventory).filter(
        RepairPartInventory.is_active == True,
        RepairPartInventory.stock_quantity <= 0
    ).count()
    
    # Calculate repair parts stock value
    repair_parts_stock_value = db.query(RepairPartInventory).filter(
        RepairPartInventory.is_active == True
    ).all()
    repair_parts_value = sum(float(rp.stock_quantity or 0) * float(rp.unit_cost or 0) for rp in repair_parts_stock_value)
    
    # Total statistics
    total_items = total_products + total_repair_parts
    total_in_stock = products_in_stock + repair_parts_in_stock
    total_low_stock = products_low_stock + repair_parts_low_stock
    total_out_of_stock = products_out_of_stock + repair_parts_out_of_stock
    total_stock_value = products_value + repair_parts_value
    
    return {
        "success": True,
        "stats": {
            "total_items": total_items,
            "in_stock": total_in_stock,
            "low_stock": total_low_stock,
            "products_out_of_stock": products_out_of_stock,
            "repair_parts_out_of_stock": repair_parts_out_of_stock,
            "products_stock_value": products_value,
            "repair_parts_stock_value": repair_parts_value,
            "total_stock_value": total_stock_value
        }
    }

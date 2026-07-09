from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from uuid import UUID
from typing import Optional
import csv
import io
import json
from datetime import datetime, timedelta, timezone

from app.database import get_db
from app.models import Product, Category, TradeRequest, User, DeletedItem, DeletedItemStatus
from app.dependencies import get_current_user, require_roles
from pydantic import BaseModel

router = APIRouter(prefix="/api/products", tags=["Products"], redirect_slashes=False)


def normalize_product_payload(payload: dict) -> dict:
    """Normalize admin-facing payload aliases to backend enum values."""
    normalized = dict(payload)

    category = normalized.get("category")
    if isinstance(category, str):
        category_aliases = {
            "smartphones": "smartphone",
            "smartphone": "smartphone",
            "laptops": "laptop",
            "laptop": "laptop",
            "tablets": "tablet",
            "tablet": "tablet",
        }
        normalized["category"] = category_aliases.get(category.strip().lower(), category.strip().lower())

    condition = normalized.get("condition")
    if isinstance(condition, str):
        normalized["condition"] = condition.strip().lower()

    return normalized


# ── Schemas ───────────────────────────────────────────────────────────────────

class ProductCreate(BaseModel):
    name: str
    description: Optional[str] = None
    category: str
    brand: Optional[str] = None
    model: Optional[str] = None
    condition: str
    price: float
    stock_quantity: int = 0
    image_url: Optional[str] = None
    is_for_sale: bool = True

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    brand: Optional[str] = None
    model: Optional[str] = None
    condition: Optional[str] = None
    price: Optional[float] = None
    stock_quantity: Optional[int] = None
    image_url: Optional[str] = None
    is_active: Optional[bool] = None
    is_for_sale: Optional[bool] = None

class ProductOut(BaseModel):
    id: str
    name: str
    description: Optional[str]
    category: str
    brand: Optional[str]
    model: Optional[str]
    condition: str
    price: float
    stock_quantity: int
    sku: Optional[str]
    min_stock_level: Optional[int]
    image_url: Optional[str]
    is_active: bool
    is_for_sale: bool
    created_at: str

    @classmethod
    def from_orm(cls, obj):
        return cls(
            id=str(obj.id),
            name=obj.name,
            description=obj.description,
            category=str(obj.category),
            brand=obj.brand,
            model=obj.model,
            condition=str(obj.condition.value) if hasattr(obj.condition, 'value') else str(obj.condition),
            price=float(obj.price),
            stock_quantity=obj.stock_quantity,
            sku=obj.sku,
            min_stock_level=obj.reorder_threshold,
            image_url=obj.image_url,
            is_active=obj.is_active,
            is_for_sale=obj.is_for_sale,
            created_at=obj.created_at.isoformat() if obj.created_at else None
        )

class CategoryCreate(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    icon_name: Optional[str] = None

class CategoryOut(BaseModel):
    id: int
    name: str
    slug: str
    description: Optional[str]
    icon_name: Optional[str]
    is_active: bool

    class Config:
        from_attributes = True

class TradeRequestCreate(BaseModel):
    customer_name: str
    customer_email: str
    customer_phone: Optional[str] = None
    device_type: str
    device_brand: str
    device_model: str
    device_condition: str
    requested_price: Optional[float] = None
    description: Optional[str] = None

class TradeRequestOut(BaseModel):
    id: str
    customer_name: str
    customer_email: str
    customer_phone: Optional[str] = None
    device_type: str
    device_brand: str
    device_model: str
    device_condition: str
    requested_price: Optional[float]
    description: Optional[str]
    status: str
    created_at: str

    class Config:
        from_attributes = True


# ── Product Endpoints ─────────────────────────────────────────────────────────

@router.get("", response_model=list[ProductOut], include_in_schema=False)
@router.get("/", response_model=list[ProductOut])
def get_products(
    category: Optional[str] = None,
    is_for_sale: Optional[bool] = None,
    supplier_code: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get all products with optional filtering"""
    query = db.query(Product).filter(Product.is_active == True)
    
    if category:
        query = query.filter(Product.category == category)
    if is_for_sale is not None:
        query = query.filter(Product.is_for_sale == is_for_sale)
    if supplier_code:
        from app.models import Supplier
        query = query.join(Supplier, Product.supplier_id == Supplier.id).filter(Supplier.supplier_code == supplier_code)
    
    products = query.order_by(Product.created_at.desc()).all()
    return [ProductOut.from_orm(p) for p in products]

@router.get("/{product_id}", response_model=ProductOut)
def get_product(product_id: UUID, db: Session = Depends(get_db)):
    """Get a single product by ID"""
    product = db.query(Product).filter(Product.id == product_id, Product.is_active == True).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return ProductOut.from_orm(product)

@router.post("", status_code=201, response_model=ProductOut, include_in_schema=False)
@router.post("/", status_code=201, response_model=ProductOut)
def create_product(
    body: ProductCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Create a new product (admin only)"""
    from app.models import ProductCondition
    
    product_data = normalize_product_payload(body.model_dump())
    product_data['condition'] = ProductCondition(product_data['condition'])
    
    product = Product(**product_data)
    db.add(product)
    db.commit()
    db.refresh(product)
    return ProductOut.from_orm(product)

@router.put("/{product_id}", response_model=ProductOut)
def update_product(
    product_id: UUID,
    body: ProductUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Update a product (admin only)"""
    from app.models import ProductCondition
    
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_data = normalize_product_payload(body.model_dump(exclude_unset=True))
    if 'condition' in update_data:
        update_data['condition'] = ProductCondition(update_data['condition'])
    
    for key, value in update_data.items():
        setattr(product, key, value)
    
    db.commit()
    db.refresh(product)
    return ProductOut.from_orm(product)

@router.delete("/{product_id}")
def delete_product(
    product_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Delete a product (admin only) - archives to history for 48-hour recovery"""
    from app.models import DeletedItem, DeletedItemStatus
    from datetime import datetime, timedelta
    import json
    
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    try:
        # Check if there's already an archived deleted item for this product
        existing_deleted = db.query(DeletedItem).filter(
            DeletedItem.original_table == "products",
            DeletedItem.original_record_id == str(product.id)
        ).first()
        
        # Archive to deleted_items table
        record_data = {
            "id": str(product.id),
            "sku": product.sku,
            "name": product.name,
            "description": product.description,
            "category": product.category.value if hasattr(product.category, 'value') else product.category,
            "brand": product.brand,
            "model": product.model,
            "condition": product.condition.value if hasattr(product.condition, 'value') else str(product.condition) if product.condition else None,
            "price": float(product.price) if product.price else 0,
            "stock_quantity": product.stock_quantity,
            "reorder_threshold": product.reorder_threshold,
            "reorder_quantity": product.reorder_quantity,
            "supplier_id": str(product.supplier_id) if product.supplier_id else None,
            "image_url": product.image_url,
            "is_active": product.is_active,
            "is_for_sale": product.is_for_sale,
            "created_at": product.created_at.isoformat() if product.created_at else None,
            "updated_at": product.updated_at.isoformat() if product.updated_at else None,
        }
        
        if existing_deleted:
            # Update existing archived entry instead of creating new one
            existing_deleted.record_data = json.dumps(record_data)
            existing_deleted.item_name = product.name
            existing_deleted.deleted_by = current_user.id
            existing_deleted.deleted_at = datetime.now(timezone.utc)
            existing_deleted.hide_from_ui_at = datetime.now(timezone.utc) + timedelta(hours=48)
            existing_deleted.status = DeletedItemStatus.active
        else:
            # Create new deleted item entry
            deleted_item = DeletedItem(
                original_table="products",
                original_record_id=str(product.id),
                record_data=json.dumps(record_data),
                item_name=product.name,
                item_type="Product",
                deleted_by=current_user.id,
                deleted_at=datetime.now(timezone.utc),
                hide_from_ui_at=datetime.now(timezone.utc) + timedelta(hours=48),
                status=DeletedItemStatus.active
            )
            db.add(deleted_item)
        
        # Delete the original product
        db.delete(product)
        
        db.commit()
        
        return {"success": True, "message": "Product deleted and archived for recovery"}
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to delete product: {str(e)}")


# ── Category Endpoints ───────────────────────────────────────────────────────

@router.get("/categories/all", response_model=list[CategoryOut])
def get_categories(db: Session = Depends(get_db)):
    """Get all active categories"""
    categories = db.query(Category).filter(Category.is_active == True).all()
    return categories

@router.post("/categories/", status_code=201, response_model=CategoryOut)
def create_category(
    body: CategoryCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Create a new category (admin only)"""
    category = Category(**body.model_dump())
    db.add(category)
    db.commit()
    db.refresh(category)
    return category


# ── Trade Request Endpoints (Buy & Sell) ───────────────────────────────────────

@router.post("/trade-requests/", status_code=201, response_model=TradeRequestOut)
def create_trade_request(
    body: TradeRequestCreate,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user)
):
    """Submit a device trade request (sell your device to us)"""
    trade_request = TradeRequest(
        user_id=current_user.id if current_user else None,
        **body.model_dump()
    )
    db.add(trade_request)
    db.commit()
    db.refresh(trade_request)
    return trade_request

@router.get("/trade-requests/my")
def get_my_trade_requests(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get current user's trade requests"""
    requests = db.query(TradeRequest).filter(
        TradeRequest.user_id == current_user.id
    ).order_by(TradeRequest.created_at.desc()).all()
    return {"success": True, "requests": requests}

@router.get("/trade-requests/all")
def get_all_trade_requests(
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Get all trade requests (admin only)"""
    requests = db.query(TradeRequest).order_by(TradeRequest.created_at.desc()).all()
    return {"success": True, "requests": requests}

@router.put("/trade-requests/{request_id}/status")
def update_trade_status(
    request_id: UUID,
    status: str,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Update trade request status (admin only)"""
    valid_statuses = ["pending", "approved", "rejected", "completed"]
    if status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}")
    
    trade_request = db.query(TradeRequest).filter(TradeRequest.id == request_id).first()
    if not trade_request:
        raise HTTPException(status_code=404, detail="Trade request not found")
    
    trade_request.status = status
    db.commit()
    db.refresh(trade_request)
    return {"success": True, "message": f"Trade request status updated to {status}", "request": trade_request}

@router.post("/import", status_code=201)
async def import_products(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Import products from CSV/Excel file"""
    from app.models import ProductCondition
    
    imported_count = 0
    errors = []
    
    try:
        # Read file content
        content = await file.read()
        
        # Handle CSV file
        if file.filename.endswith('.csv'):
            csv_file = io.StringIO(content.decode('utf-8'))
            csv_reader = csv.DictReader(csv_file)
            
            for row in csv_reader:
                try:
                    # Validate required fields
                    if not row.get('name'):
                        errors.append(f"Row error: Missing required field 'name'")
                        continue
                    
                    # Validate condition
                    condition_value = row.get('condition', 'new').strip().lower()
                    valid_conditions = ['new', 'refurbished', 'used']
                    if condition_value not in valid_conditions:
                        errors.append(f"Row error: Invalid condition '{condition_value}'. Must be one of: {valid_conditions}")
                        continue
                    
                    product = Product(
                        name=row.get('name', ''),
                        description=row.get('description', ''),
                        category=row.get('category', 'smartphone').strip(),
                        brand=row.get('brand', ''),
                        model=row.get('model', ''),
                        condition=ProductCondition(condition_value),
                        price=float(row.get('price', 0) or 0),
                        stock_quantity=int(row.get('stock_quantity', 0) or 0),
                        image_url=row.get('image_url', ''),
                        is_for_sale=True
                    )
                    db.add(product)
                    imported_count += 1
                except Exception as e:
                    errors.append(f"Row error: {str(e)} - Row data: {row}")
                    continue
        
        # Handle Excel file
        elif file.filename.endswith(('.xlsx', '.xls')):
            try:
                import openpyxl
                # Load Excel file
                workbook = openpyxl.load_workbook(io.BytesIO(content))
                sheet = workbook.active
                
                # Get header row and normalize to lowercase
                headers = [str(cell.value).lower().strip() if cell.value else '' for cell in sheet[1]]
                
                # Create column mapping for common variations
                column_map = {
                    'name': 'name',
                    'product': 'name',
                    'product name': 'name',
                    'description': 'description',
                    'desc': 'description',
                    'category': 'category',
                    'brand': 'brand',
                    'model': 'model',
                    'condition': 'condition',
                    'price': 'price',
                    'stock': 'stock_quantity',
                    'stock quantity': 'stock_quantity',
                    'quantity': 'stock_quantity',
                    'sku': 'sku',
                    'min stock': 'min_stock_level',
                    'min stock level': 'min_stock_level',
                    'image': 'image_url',
                    'image url': 'image_url'
                }
                
                # Map Excel headers to our field names
                header_mapping = {}
                for i, header in enumerate(headers):
                    if header in column_map:
                        header_mapping[i] = column_map[header]
                    else:
                        # Try partial match
                        for key, value in column_map.items():
                            if key in header or header in key:
                                header_mapping[i] = value
                                break
                
                # Process rows starting from row 2
                for row in sheet.iter_rows(min_row=2, values_only=True):
                    try:
                        # Skip empty rows
                        if not any(row):
                            continue
                            
                        # Map row data using header mapping
                        row_data = {}
                        for col_idx, value in enumerate(row):
                            if col_idx in header_mapping and value is not None:
                                row_data[header_mapping[col_idx]] = value
                        
                        # Skip if no name provided
                        if not row_data.get('name'):
                            continue
                            
                        product = Product(
                            name=row_data.get('name', ''),
                            description=row_data.get('description', ''),
                            category=row_data.get('category', 'smartphone').strip(),
                            brand=row_data.get('brand', ''),
                            model=row_data.get('model', ''),
                            condition=ProductCondition(row_data.get('condition', 'new').strip().lower()),
                            price=float(row_data.get('price', 0) or 0),
                            stock_quantity=int(row_data.get('stock_quantity', 0) or 0),
                            min_stock_level=int(row_data.get('min_stock_level', 5) or 5),
                            sku=row_data.get('sku', ''),
                            image_url=row_data.get('image_url', ''),
                            is_for_sale=True
                        )
                        db.add(product)
                        imported_count += 1
                    except Exception as e:
                        errors.append(f"Row error: {str(e)}")
                        continue
            except ImportError:
                return {
                    "success": False,
                    "detail": "openpyxl library not installed. Please run: pip install openpyxl"
                }
        else:
            return {
                "success": False,
                "detail": "Unsupported file format. Please use CSV."
            }
        
        db.commit()
        
        return {
            "success": True,
            "imported_count": imported_count,
            "errors": errors[:10]  # Return first 10 errors if any
        }
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Import failed: {str(e)}")


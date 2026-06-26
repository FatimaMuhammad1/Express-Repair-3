from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from typing import Optional

from app.database import get_db
from app.models import Product, Category, TradeRequest, User
from app.dependencies import get_current_user, require_roles
from pydantic import BaseModel

router = APIRouter(prefix="/api/products", tags=["Products"])


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
    image_url: Optional[str]
    is_active: bool
    is_for_sale: bool
    created_at: str

    class Config:
        from_attributes = True

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

@router.get("/", response_model=list[ProductOut])
def get_products(
    category: Optional[str] = None,
    is_for_sale: Optional[bool] = None,
    db: Session = Depends(get_db)
):
    """Get all products with optional filtering"""
    query = db.query(Product).filter(Product.is_active == True)
    
    if category:
        query = query.filter(Product.category == category)
    if is_for_sale is not None:
        query = query.filter(Product.is_for_sale == is_for_sale)
    
    products = query.order_by(Product.created_at.desc()).all()
    return products

@router.get("/{product_id}", response_model=ProductOut)
def get_product(product_id: UUID, db: Session = Depends(get_db)):
    """Get a single product by ID"""
    product = db.query(Product).filter(Product.id == product_id, Product.is_active == True).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/", status_code=201, response_model=ProductOut)
def create_product(
    body: ProductCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin", "technician", "staff", "SUPER_ADMIN"))
):
    """Create a new product (admin/technician/STAFF/SUPER_ADMIN only)"""
    product = Product(**body.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product

@router.put("/{product_id}", response_model=ProductOut)
def update_product(
    product_id: UUID,
    body: ProductUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin", "technician", "staff", "SUPER_ADMIN"))
):
    """Update a product (admin/technician/STAFF/SUPER_ADMIN only)"""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    for key, value in body.model_dump(exclude_unset=True).items():
        setattr(product, key, value)
    
    db.commit()
    db.refresh(product)
    return product

@router.delete("/{product_id}")
def delete_product(
    product_id: UUID,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin"))
):
    """Delete a product (admin only)"""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    product.is_active = False
    db.commit()
    return {"success": True, "message": "Product deleted"}


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
    _: User = Depends(require_roles("admin"))
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
    _: User = Depends(require_roles("admin", "technician"))
):
    """Get all trade requests (admin/technician only)"""
    requests = db.query(TradeRequest).order_by(TradeRequest.created_at.desc()).all()
    return {"success": True, "requests": requests}

@router.put("/trade-requests/{request_id}/status")
def update_trade_status(
    request_id: UUID,
    status: str,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin", "technician"))
):
    """Update trade request status (admin/technician only)"""
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

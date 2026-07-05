from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from uuid import UUID
from datetime import datetime, timedelta, timezone
from typing import Optional, List
from decimal import Decimal

from app.database import get_db
from app.models import DeletedItem, User, DeletedItemStatus
from app.dependencies import get_current_user, require_roles
from pydantic import BaseModel
import json

router = APIRouter(prefix="/api/history", tags=["History"])


class DeletedItemOut(BaseModel):
    id: UUID
    original_table: str
    original_record_id: str
    item_name: str
    item_type: str
    deleted_by: Optional[str] = None
    deleted_at: datetime
    hide_from_ui_at: datetime
    status: str
    time_remaining: Optional[str] = None


class RestoreRequest(BaseModel):
    deleted_item_id: UUID


@router.get("", response_model=dict)
def get_deleted_items(
    search: Optional[str] = None,
    item_type: Optional[str] = None,
    original_table: Optional[str] = None,
    status: Optional[str] = "active",
    page: int = 1,
    limit: int = 50,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get all deleted items with filtering and pagination"""
    query = db.query(DeletedItem)
    
    # Only show active items by default (within 48-hour recovery period)
    if status == "active":
        query = query.filter(DeletedItem.status == DeletedItemStatus.active)
    elif status:
        query = query.filter(DeletedItem.status == status)
    
    if search:
        query = query.filter(DeletedItem.item_name.ilike(f"%{search}%"))
    
    if item_type:
        query = query.filter(DeletedItem.item_type == item_type)
    
    if original_table:
        query = query.filter(DeletedItem.original_table == original_table)
    
    # Order by deleted_at descending
    query = query.order_by(DeletedItem.deleted_at.desc())
    
    # Pagination
    total = query.count()
    items = query.offset((page - 1) * limit).limit(limit).all()
    
    # Calculate time remaining for active items
    result_items = []
    for item in items:
        item_dict = {
            "id": str(item.id),
            "original_table": item.original_table,
            "original_record_id": item.original_record_id,
            "item_name": item.item_name,
            "item_type": item.item_type,
            "deleted_by": item.deleted_by_user.name if item.deleted_by_user else None,
            "deleted_at": item.deleted_at,
            "hide_from_ui_at": item.hide_from_ui_at,
            "status": item.status.value if item.status else "unknown",
        }
        
        if item.status == DeletedItemStatus.active:
            now = datetime.now(timezone.utc)
            time_remaining = item.hide_from_ui_at - now
            hours_remaining = max(0, int(time_remaining.total_seconds() / 3600))
            minutes_remaining = max(0, int((time_remaining.total_seconds() % 3600) / 60))
            item_dict["time_remaining"] = f"{hours_remaining}h {minutes_remaining}m"
        else:
            item_dict["time_remaining"] = "Expired"
        
        result_items.append(item_dict)
    
    return {
        "success": True,
        "items": result_items,
        "total": total,
        "page": page,
        "limit": limit,
        "pages": (total + limit - 1) // limit
    }


@router.post("/restore")
def restore_deleted_item(
    request: RestoreRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN")),
):
    """Restore a deleted item back to its original table"""
    deleted_item = db.query(DeletedItem).filter(DeletedItem.id == request.deleted_item_id).first()
    
    if not deleted_item:
        raise HTTPException(404, "Deleted item not found")
    
    if deleted_item.status != DeletedItemStatus.active:
        raise HTTPException(400, "This item can no longer be restored (48-hour recovery period has expired)")
    
    try:
        # Parse the record data
        record_data = json.loads(deleted_item.record_data)
        
        # Determine the table and restore the record
        table_name = deleted_item.original_table
        
        if table_name == "products":
            from app.models import Product
            # Check if product with this ID already exists
            existing = db.query(Product).filter(Product.id == record_data.get("id")).first()
            if existing:
                # Update existing product instead of creating new one
                for key, value in record_data.items():
                    if hasattr(existing, key):
                        setattr(existing, key, value)
                db.commit()
                db.refresh(existing)
            else:
                # Create new product
                product = Product(**record_data)
                db.add(product)
                db.commit()
                db.refresh(product)
            
        elif table_name == "repairs":
            from app.models import Repair
            # Check if repair with this ID already exists
            existing = db.query(Repair).filter(Repair.id == record_data.get("id")).first()
            if existing:
                # Update existing repair instead of creating new one
                for key, value in record_data.items():
                    if hasattr(existing, key):
                        setattr(existing, key, value)
                db.commit()
                db.refresh(existing)
            else:
                # Create new repair
                repair = Repair(**record_data)
                db.add(repair)
                db.commit()
                db.refresh(repair)
            
        elif table_name == "customers":
            from app.models import Customer
            # Check if customer with this ID already exists
            existing = db.query(Customer).filter(Customer.id == record_data.get("id")).first()
            if existing:
                # Update existing customer instead of creating new one
                for key, value in record_data.items():
                    if hasattr(existing, key):
                        setattr(existing, key, value)
                db.commit()
                db.refresh(existing)
            else:
                # Create new customer
                customer = Customer(**record_data)
                db.add(customer)
                db.commit()
                db.refresh(customer)
            
        elif table_name == "suppliers":
            from app.models import Supplier
            # Check if supplier with this ID already exists
            existing = db.query(Supplier).filter(Supplier.id == record_data.get("id")).first()
            if existing:
                # Update existing supplier instead of creating new one
                for key, value in record_data.items():
                    if hasattr(existing, key):
                        setattr(existing, key, value)
                db.commit()
                db.refresh(existing)
            else:
                # Create new supplier
                supplier = Supplier(**record_data)
                db.add(supplier)
                db.commit()
                db.refresh(supplier)
            
        elif table_name == "repair_parts_inventory":
            from app.models import RepairPartInventory
            # Check if repair part with this ID already exists
            existing = db.query(RepairPartInventory).filter(RepairPartInventory.id == record_data.get("id")).first()
            if existing:
                # Update existing repair part instead of creating new one
                for key, value in record_data.items():
                    if hasattr(existing, key):
                        setattr(existing, key, value)
                db.commit()
                db.refresh(existing)
            else:
                # Create new repair part
                repair_part = RepairPartInventory(**record_data)
                db.add(repair_part)
                db.commit()
                db.refresh(repair_part)
            
        else:
            raise HTTPException(400, f"Table {table_name} is not supported for restoration")
        
        # Mark the deleted item as archived (removed from active history)
        deleted_item.status = DeletedItemStatus.archived
        db.commit()
        
        return {
            "success": True,
            "message": f"Item '{deleted_item.item_name}' has been successfully restored to {table_name}",
            "restored_item_id": str(deleted_item.original_record_id)
        }
        
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(500, f"Failed to restore item: {str(e)}")


@router.get("/stats")
def get_history_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get statistics about deleted items"""
    total_deleted = db.query(DeletedItem).count()
    active_deleted = db.query(DeletedItem).filter(DeletedItem.status == DeletedItemStatus.active).count()
    archived_deleted = db.query(DeletedItem).filter(DeletedItem.status == DeletedItemStatus.archived).count()
    
    # Get counts by item type
    item_type_counts = {}
    for item_type in ["Product", "Repair", "Customer", "Supplier", "Repair Part"]:
        count = db.query(DeletedItem).filter(
            DeletedItem.item_type == item_type,
            DeletedItem.status == DeletedItemStatus.active
        ).count()
        item_type_counts[item_type] = count
    
    return {
        "success": True,
        "stats": {
            "total_deleted": total_deleted,
            "active_deleted": active_deleted,
            "archived_deleted": archived_deleted,
            "by_item_type": item_type_counts
        }
    }

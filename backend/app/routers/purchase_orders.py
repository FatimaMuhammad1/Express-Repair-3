from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID, uuid4
from decimal import Decimal
from typing import Optional, List
from datetime import datetime

from app.database import get_db
from app.models import PurchaseOrder, PurchaseOrderItem, PurchaseOrderStatus, User, Product, StockMovement, StockMovementType, Expense, ExpenseCategory
from app.dependencies import require_roles, get_current_user
from app.routers.notifications import create_notification
from pydantic import BaseModel

router = APIRouter(prefix="/api/purchase-orders", tags=["Purchase Orders"])


@router.post("", status_code=201, include_in_schema=False)
@router.post("/", status_code=201)
def create_purchase_order(
    body: PurchaseOrderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Create a new purchase order with line items"""
    # Generate order number
    order_number = f"PO-{datetime.now().strftime('%Y%m%d')}-{str(uuid4())[:8].upper()}"
    
    # Calculate total amount from items
    items_total = sum(item.quantity * item.unit_cost for item in body.items)
    total_amount = items_total + (body.shipping_cost or 0) + (body.tax_amount or 0)
    
    # Parse expected delivery date if provided
    expected_delivery = None
    if body.expected_delivery_date:
        expected_delivery = datetime.fromisoformat(body.expected_delivery_date)
    
    purchase_order = PurchaseOrder(
        order_number=order_number,
        supplier_id=body.supplier_id,
        branch_id=body.branch_id,
        total_amount=total_amount,
        notes=body.notes,
        status=PurchaseOrderStatus.draft,
        requested_by=current_user.id,
        expected_delivery_date=expected_delivery,
        shipping_cost=body.shipping_cost or 0,
        tax_amount=body.tax_amount or 0
    )
    
    db.add(purchase_order)
    db.flush()  # Get the ID before adding items
    
    # Add line items
    for item_data in body.items:
        item = PurchaseOrderItem(
            purchase_order_id=purchase_order.id,
            product_id=item_data.product_id,
            quantity=item_data.quantity,
            unit_cost=item_data.unit_cost,
            line_total=item_data.quantity * item_data.unit_cost,
            notes=item_data.notes
        )
        db.add(item)
    
    db.commit()
    db.refresh(purchase_order)
    
    return {
        "success": True,
        "message": "Purchase order created successfully",
        "order": {
            "id": str(purchase_order.id),
            "order_number": purchase_order.order_number,
            "status": purchase_order.status.value,
            "total_amount": float(purchase_order.total_amount),
            "created_at": purchase_order.created_at.isoformat()
        }
    }


class PurchaseOrderApproval(BaseModel):
    action: str  # "approve" or "reject"
    rejection_reason: Optional[str] = None


class PurchaseOrderItemCreate(BaseModel):
    product_id: Optional[UUID] = None
    quantity: int
    unit_cost: Decimal
    notes: Optional[str] = None


class PurchaseOrderItemUpdate(BaseModel):
    quantity: Optional[int] = None
    unit_cost: Optional[Decimal] = None
    received_quantity: Optional[int] = None
    notes: Optional[str] = None


class PurchaseOrderItemOut(BaseModel):
    id: UUID
    purchase_order_id: UUID
    product_id: Optional[UUID] = None
    quantity: int
    unit_cost: Decimal
    received_quantity: int
    line_total: Optional[Decimal] = None
    notes: Optional[str] = None
    created_at: str
    updated_at: str

    model_config = {"from_attributes": True}


class PurchaseOrderCreate(BaseModel):
    supplier_id: Optional[UUID] = None
    branch_id: Optional[UUID] = None
    notes: Optional[str] = None
    expected_delivery_date: Optional[str] = None
    shipping_cost: Optional[Decimal] = 0
    tax_amount: Optional[Decimal] = 0
    items: List[PurchaseOrderItemCreate]


class PurchaseOrderUpdate(BaseModel):
    supplier_id: Optional[UUID] = None
    branch_id: Optional[UUID] = None
    notes: Optional[str] = None
    expected_delivery_date: Optional[str] = None
    shipping_cost: Optional[Decimal] = None
    tax_amount: Optional[Decimal] = None
    tracking_number: Optional[str] = None
    supplier_reference: Optional[str] = None


class PurchaseOrderOut(BaseModel):
    id: UUID
    order_number: str
    supplier_id: Optional[UUID] = None
    branch_id: Optional[UUID] = None
    status: str
    total_amount: Decimal
    notes: Optional[str] = None
    requested_by: Optional[UUID] = None
    approved_by: Optional[UUID] = None
    approved_at: Optional[str] = None
    rejection_reason: Optional[str] = None
    expected_delivery_date: Optional[str] = None
    actual_delivery_date: Optional[str] = None
    shipping_cost: Decimal
    tax_amount: Decimal
    tracking_number: Optional[str] = None
    supplier_reference: Optional[str] = None
    created_at: str
    updated_at: str

    model_config = {"from_attributes": True}


@router.get("", include_in_schema=False)
@router.get("/")
def get_all_purchase_orders(
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN")),
):
    """Get all purchase orders with optional status filter"""
    query = db.query(PurchaseOrder)
    
    if status:
        try:
            status_enum = PurchaseOrderStatus(status)
            query = query.filter(PurchaseOrder.status == status_enum)
        except ValueError:
            pass  # Invalid status, ignore filter
    
    orders = query.order_by(PurchaseOrder.created_at.desc()).all()

    result = []
    for order in orders:
        result.append({
            "id": str(order.id),
            "order_number": order.order_number,
            "supplier_id": str(order.supplier_id) if order.supplier_id else None,
            "branch_id": str(order.branch_id) if order.branch_id else None,
            "status": order.status.value,
            "total_amount": float(order.total_amount),
            "notes": order.notes,
            "requested_by": str(order.requested_by) if order.requested_by else None,
            "requested_by_name": order.requested_by_user.name if order.requested_by_user else None,
            "approved_by": str(order.approved_by) if order.approved_by else None,
            "approved_by_name": order.approved_by_user.name if order.approved_by_user else None,
            "approved_at": order.approved_at.isoformat() if order.approved_at else None,
            "rejection_reason": order.rejection_reason,
            "expected_delivery_date": order.expected_delivery_date.isoformat() if order.expected_delivery_date else None,
            "actual_delivery_date": order.actual_delivery_date.isoformat() if order.actual_delivery_date else None,
            "tracking_number": order.tracking_number,
            "created_at": order.created_at.isoformat(),
            "items_count": len(order.items)
        })

    return {
        "success": True,
        "orders": result,
        "count": len(result)
    }


@router.get("/pending")
def get_pending_purchase_orders(
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN")),
):
    """Get all pending purchase orders awaiting approval"""
    orders = db.query(PurchaseOrder).filter(
        PurchaseOrder.status == PurchaseOrderStatus.pending
    ).order_by(PurchaseOrder.created_at.desc()).all()

    result = []
    for order in orders:
        result.append({
            "id": str(order.id),
            "order_number": order.order_number,
            "supplier_id": str(order.supplier_id) if order.supplier_id else None,
            "branch_id": str(order.branch_id) if order.branch_id else None,
            "status": order.status.value,
            "total_amount": float(order.total_amount),
            "notes": order.notes,
            "requested_by": str(order.requested_by) if order.requested_by else None,
            "requested_by_name": order.requested_by_user.name if order.requested_by_user else None,
            "created_at": order.created_at.isoformat(),
        })

    return {
        "success": True,
        "orders": result,
        "count": len(result)
    }


@router.post("/{order_id}/approve")
def approve_purchase_order(
    order_id: UUID,
    body: PurchaseOrderApproval,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Approve or reject a purchase order"""
    order = db.query(PurchaseOrder).filter(PurchaseOrder.id == order_id).first()
    if not order:
        raise HTTPException(404, "Purchase order not found")

    if order.status != PurchaseOrderStatus.pending:
        raise HTTPException(400, f"Order is not pending. Current status: {order.status.value}")

    if body.action == "approve":
        order.status = PurchaseOrderStatus.ordered
        order.approved_by = current_user.id
        order.approved_at = datetime.utcnow()
        order.rejection_reason = None
        message = "Purchase order approved and sent to supplier"
        
        # Create notification for the requester
        if order.requested_by:
            create_notification(
                db,
                order.requested_by,
                "purchase_order_approved",
                "Purchase Order Approved",
                f"Your purchase order {order.order_number} has been approved",
                f"/admin/purchase-orders"
            )
    elif body.action == "reject":
        if not body.rejection_reason:
            raise HTTPException(400, "Rejection reason is required when rejecting an order")
        order.status = PurchaseOrderStatus.cancelled
        order.approved_by = current_user.id
        order.approved_at = datetime.utcnow()
        order.rejection_reason = body.rejection_reason
        message = "Purchase order rejected"
        
        # Create notification for the requester
        if order.requested_by:
            create_notification(
                db,
                order.requested_by,
                "purchase_order_rejected",
                "Purchase Order Rejected",
                f"Your purchase order {order.order_number} has been rejected. Reason: {body.rejection_reason}",
                f"/admin/purchase-orders"
            )
    else:
        raise HTTPException(400, "Invalid action. Must be 'approve' or 'reject'")

    db.commit()
    db.refresh(order)

    return {
        "success": True,
        "message": message,
        "order": {
            "id": str(order.id),
            "order_number": order.order_number,
            "status": order.status.value,
            "approved_by": str(order.approved_by) if order.approved_by else None,
            "approved_at": order.approved_at.isoformat() if order.approved_at else None,
            "rejection_reason": order.rejection_reason,
        }
    }


@router.get("/{order_id}/history")
def get_purchase_order_history(
    order_id: UUID,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN")),
):
    """Get approval history for a purchase order"""
    order = db.query(PurchaseOrder).filter(PurchaseOrder.id == order_id).first()
    if not order:
        raise HTTPException(404, "Purchase order not found")

    history = {
        "created_at": order.created_at.isoformat(),
        "created_by": str(order.requested_by) if order.requested_by else None,
        "created_by_name": order.requested_by_user.name if order.requested_by_user else None,
        "status": order.status.value,
    }

    if order.approved_at:
        history["approved_at"] = order.approved_at.isoformat()
        history["approved_by"] = str(order.approved_by) if order.approved_by else None
        history["approved_by_name"] = order.approved_by_user.name if order.approved_by_user else None

    if order.rejection_reason:
        history["rejection_reason"] = order.rejection_reason

    return {
        "success": True,
        "history": history
    }


@router.get("/{order_id}/items")
def get_purchase_order_items(
    order_id: UUID,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN")),
):
    """Get all items for a purchase order"""
    order = db.query(PurchaseOrder).filter(PurchaseOrder.id == order_id).first()
    if not order:
        raise HTTPException(404, "Purchase order not found")
    
    items = db.query(PurchaseOrderItem).filter(
        PurchaseOrderItem.purchase_order_id == order_id
    ).all()
    
    result = []
    for item in items:
        result.append({
            "id": str(item.id),
            "purchase_order_id": str(item.purchase_order_id),
            "product_id": str(item.product_id) if item.product_id else None,
            "product_name": item.product.name if item.product else None,
            "quantity": item.quantity,
            "unit_cost": float(item.unit_cost),
            "received_quantity": item.received_quantity,
            "line_total": float(item.line_total) if item.line_total else 0,
            "notes": item.notes,
            "created_at": item.created_at.isoformat()
        })
    
    return {
        "success": True,
        "items": result,
        "count": len(result)
    }


@router.post("/{order_id}/items", status_code=201)
def add_purchase_order_item(
    order_id: UUID,
    body: PurchaseOrderItemCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN")),
):
    """Add an item to a purchase order"""
    order = db.query(PurchaseOrder).filter(PurchaseOrder.id == order_id).first()
    if not order:
        raise HTTPException(404, "Purchase order not found")
    
    if order.status not in [PurchaseOrderStatus.draft, PurchaseOrderStatus.pending]:
        raise HTTPException(400, "Can only add items to draft or pending orders")
    
    item = PurchaseOrderItem(
        purchase_order_id=order_id,
        product_id=body.product_id,
        quantity=body.quantity,
        unit_cost=body.unit_cost,
        line_total=body.quantity * body.unit_cost,
        notes=body.notes
    )
    
    db.add(item)
    
    # Update order total
    items_total = sum(i.line_total for i in order.items if i.line_total) + item.line_total
    order.total_amount = items_total + order.shipping_cost + order.tax_amount
    
    db.commit()
    db.refresh(item)
    
    return {
        "success": True,
        "message": "Item added successfully",
        "item": {
            "id": str(item.id),
            "quantity": item.quantity,
            "unit_cost": float(item.unit_cost),
            "line_total": float(item.line_total)
        }
    }


@router.put("/{order_id}/items/{item_id}")
def update_purchase_order_item(
    order_id: UUID,
    item_id: UUID,
    body: PurchaseOrderItemUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN")),
):
    """Update a purchase order item"""
    item = db.query(PurchaseOrderItem).filter(
        PurchaseOrderItem.id == item_id,
        PurchaseOrderItem.purchase_order_id == order_id
    ).first()
    
    if not item:
        raise HTTPException(404, "Item not found")
    
    order = db.query(PurchaseOrder).filter(PurchaseOrder.id == order_id).first()
    if order.status not in [PurchaseOrderStatus.draft, PurchaseOrderStatus.pending]:
        raise HTTPException(400, "Can only edit items in draft or pending orders")
    
    if body.quantity is not None:
        item.quantity = body.quantity
    if body.unit_cost is not None:
        item.unit_cost = body.unit_cost
    if body.received_quantity is not None:
        item.received_quantity = body.received_quantity
    if body.notes is not None:
        item.notes = body.notes
    
    item.line_total = item.quantity * item.unit_cost
    
    # Update order total
    items_total = sum(i.line_total for i in order.items if i.line_total)
    order.total_amount = items_total + order.shipping_cost + order.tax_amount
    
    db.commit()
    db.refresh(item)
    
    return {
        "success": True,
        "message": "Item updated successfully",
        "item": {
            "id": str(item.id),
            "quantity": item.quantity,
            "unit_cost": float(item.unit_cost),
            "received_quantity": item.received_quantity,
            "line_total": float(item.line_total)
        }
    }


@router.delete("/{order_id}/items/{item_id}")
def delete_purchase_order_item(
    order_id: UUID,
    item_id: UUID,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN")),
):
    """Delete a purchase order item"""
    item = db.query(PurchaseOrderItem).filter(
        PurchaseOrderItem.id == item_id,
        PurchaseOrderItem.purchase_order_id == order_id
    ).first()
    
    if not item:
        raise HTTPException(404, "Item not found")
    
    order = db.query(PurchaseOrder).filter(PurchaseOrder.id == order_id).first()
    if order.status not in [PurchaseOrderStatus.draft, PurchaseOrderStatus.pending]:
        raise HTTPException(400, "Can only delete items from draft or pending orders")
    
    db.delete(item)
    
    # Update order total
    items_total = sum(i.line_total for i in order.items if i.line_total)
    order.total_amount = items_total + order.shipping_cost + order.tax_amount
    
    db.commit()
    
    return {
        "success": True,
        "message": "Item deleted successfully"
    }


class ReceiveItemsRequest(BaseModel):
    items: List[dict]  # [{"item_id": UUID, "quantity_received": int}]


@router.post("/{order_id}/receive")
def receive_purchase_order(
    order_id: UUID,
    body: ReceiveItemsRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Receive goods for a purchase order and update inventory"""
    order = db.query(PurchaseOrder).filter(PurchaseOrder.id == order_id).first()
    if not order:
        raise HTTPException(404, "Purchase order not found")
    
    if order.status not in [PurchaseOrderStatus.ordered, PurchaseOrderStatus.in_transit, PurchaseOrderStatus.partially_received]:
        raise HTTPException(400, f"Cannot receive goods for order in status: {order.status.value}")
    
    all_received = True
    any_received = False
    
    for item_data in body.items:
        item = db.query(PurchaseOrderItem).filter(
            PurchaseOrderItem.id == item_data["item_id"],
            PurchaseOrderItem.purchase_order_id == order_id
        ).first()
        
        if not item:
            raise HTTPException(404, f"Item {item_data['item_id']} not found")
        
        qty_to_receive = item_data["quantity_received"]
        if qty_to_receive <= 0:
            continue
        
        if item.received_quantity + qty_to_receive > item.quantity:
            raise HTTPException(400, f"Cannot receive more than ordered quantity for item {item.id}")
        
        # Update received quantity
        item.received_quantity += qty_to_receive
        any_received = True
        
        # Create stock movement
        if item.product_id:
            stock_movement = StockMovement(
                product_id=item.product_id,
                branch_id=order.branch_id,
                type=StockMovementType.IN,
                quantity=qty_to_receive,
                reason=f"Received from PO {order.order_number}",
                user_id=current_user.id,
                purchase_order_item_id=item.id
            )
            db.add(stock_movement)
            
            # Update product stock
            product = db.query(Product).filter(Product.id == item.product_id).first()
            if product:
                product.stock_quantity += qty_to_receive
        
        # Check if all items are now received
        if item.received_quantity < item.quantity:
            all_received = False
    
    if not any_received:
        raise HTTPException(400, "No items were received")

    # Calculate total cost of received items for expense tracking
    total_received_cost = sum(
        item_data["quantity_received"] * item.unit_cost
        for item_data in body.items
        for item in [db.query(PurchaseOrderItem).filter(
            PurchaseOrderItem.id == item_data["item_id"],
            PurchaseOrderItem.purchase_order_id == order_id
        ).first()]
        if item and item_data["quantity_received"] > 0
    )

    # Create expense entry for parts cost
    if total_received_cost > 0:
        expense = Expense(
            category=ExpenseCategory.parts,
            description=f"Parts received from PO {order.order_number}",
            amount=total_received_cost,
            tax_amount=0,
            total_amount=total_received_cost,
            date=datetime.utcnow().date(),
            branch_id=order.branch_id,
            source_type="purchase_order",
            source_id=order.id,
            status="approved"  # Auto-approve purchase order expenses
        )
        db.add(expense)

    # Update order status
    if all_received:
        order.status = PurchaseOrderStatus.received
        order.actual_delivery_date = datetime.utcnow()
    else:
        order.status = PurchaseOrderStatus.partially_received
    
    db.commit()
    db.refresh(order)
    
    return {
        "success": True,
        "message": f"Items received. Order status updated to {order.status.value}",
        "order": {
            "id": str(order.id),
            "order_number": order.order_number,
            "status": order.status.value,
            "actual_delivery_date": order.actual_delivery_date.isoformat() if order.actual_delivery_date else None
        }
    }


@router.post("/{order_id}/submit")
def submit_purchase_order(
    order_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Submit a draft purchase order for approval"""
    order = db.query(PurchaseOrder).filter(PurchaseOrder.id == order_id).first()
    if not order:
        raise HTTPException(404, "Purchase order not found")
    
    if order.status != PurchaseOrderStatus.draft:
        raise HTTPException(400, f"Can only submit draft orders. Current status: {order.status.value}")
    
    if not order.items or len(order.items) == 0:
        raise HTTPException(400, "Cannot submit order without items")
    
    order.status = PurchaseOrderStatus.pending
    db.commit()
    db.refresh(order)
    
    # Notify approvers (in a real system, this would send to specific roles)
    create_notification(
        db,
        current_user.id,
        "purchase_order_submitted",
        "Purchase Order Submitted",
        f"Your purchase order {order.order_number} has been submitted for approval",
        f"/admin/purchase-orders"
    )
    
    return {
        "success": True,
        "message": "Purchase order submitted for approval",
        "order": {
            "id": str(order.id),
            "order_number": order.order_number,
            "status": order.status.value
        }
    }


@router.post("/{order_id}/send")
def send_purchase_order(
    order_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Mark purchase order as sent to supplier"""
    order = db.query(PurchaseOrder).filter(PurchaseOrder.id == order_id).first()
    if not order:
        raise HTTPException(404, "Purchase order not found")
    
    if order.status != PurchaseOrderStatus.ordered:
        raise HTTPException(400, f"Order must be approved before sending. Current status: {order.status.value}")
    
    order.status = PurchaseOrderStatus.in_transit
    db.commit()
    db.refresh(order)
    
    return {
        "success": True,
        "message": "Purchase order marked as in transit",
        "order": {
            "id": str(order.id),
            "order_number": order.order_number,
            "status": order.status.value
        }
    }


@router.post("/{order_id}/cancel")
def cancel_purchase_order(
    order_id: UUID,
    body: Optional[dict] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Cancel a purchase order"""
    order = db.query(PurchaseOrder).filter(PurchaseOrder.id == order_id).first()
    if not order:
        raise HTTPException(404, "Purchase order not found")
    
    if order.status in [PurchaseOrderStatus.received, PurchaseOrderStatus.cancelled]:
        raise HTTPException(400, f"Cannot cancel order in status: {order.status.value}")
    
    reason = body.get("reason") if body else None
    order.status = PurchaseOrderStatus.cancelled
    order.rejection_reason = reason
    db.commit()
    db.refresh(order)
    
    return {
        "success": True,
        "message": "Purchase order cancelled",
        "order": {
            "id": str(order.id),
            "order_number": order.order_number,
            "status": order.status.value
        }
    }


@router.get("/stats")
def get_approval_stats(
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN")),
):
    """Get statistics about purchase orders"""
    total = db.query(PurchaseOrder).count()
    draft = db.query(PurchaseOrder).filter(PurchaseOrder.status == PurchaseOrderStatus.draft).count()
    pending = db.query(PurchaseOrder).filter(PurchaseOrder.status == PurchaseOrderStatus.pending).count()
    ordered = db.query(PurchaseOrder).filter(PurchaseOrder.status == PurchaseOrderStatus.ordered).count()
    in_transit = db.query(PurchaseOrder).filter(PurchaseOrder.status == PurchaseOrderStatus.in_transit).count()
    partially_received = db.query(PurchaseOrder).filter(PurchaseOrder.status == PurchaseOrderStatus.partially_received).count()
    received = db.query(PurchaseOrder).filter(PurchaseOrder.status == PurchaseOrderStatus.received).count()
    cancelled = db.query(PurchaseOrder).filter(PurchaseOrder.status == PurchaseOrderStatus.cancelled).count()

    return {
        "success": True,
        "stats": {
            "total": total,
            "draft": draft,
            "pending": pending,
            "ordered": ordered,
            "in_transit": in_transit,
            "partially_received": partially_received,
            "received": received,
            "cancelled": cancelled,
        }
    }

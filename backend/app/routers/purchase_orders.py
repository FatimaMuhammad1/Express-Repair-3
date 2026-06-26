from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from decimal import Decimal
from typing import Optional
from datetime import datetime

from app.database import get_db
from app.models import PurchaseOrder, User, TradeRequestStatus
from app.dependencies import require_roles, get_current_user
from pydantic import BaseModel

router = APIRouter(prefix="/api/purchase-orders", tags=["Purchase Orders"])


class PurchaseOrderApproval(BaseModel):
    action: str  # "approve" or "reject"
    rejection_reason: Optional[str] = None


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
    created_at: str
    updated_at: str

    model_config = {"from_attributes": True}


@router.get("/pending")
def get_pending_purchase_orders(
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin", "SUPER_ADMIN")),
):
    """Get all pending purchase orders awaiting approval"""
    orders = db.query(PurchaseOrder).filter(
        PurchaseOrder.status == TradeRequestStatus.pending
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

    if order.status != TradeRequestStatus.pending:
        raise HTTPException(400, f"Order is not pending. Current status: {order.status.value}")

    if body.action == "approve":
        order.status = TradeRequestStatus.approved
        order.approved_by = current_user.id
        order.approved_at = datetime.utcnow()
        order.rejection_reason = None
        message = "Purchase order approved successfully"
    elif body.action == "reject":
        if not body.rejection_reason:
            raise HTTPException(400, "Rejection reason is required when rejecting an order")
        order.status = TradeRequestStatus.rejected
        order.approved_by = current_user.id
        order.approved_at = datetime.utcnow()
        order.rejection_reason = body.rejection_reason
        message = "Purchase order rejected"
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
    _: User = Depends(require_roles("admin", "staff", "SUPER_ADMIN")),
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


@router.get("/stats")
def get_approval_stats(
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin", "SUPER_ADMIN")),
):
    """Get statistics about purchase order approvals"""
    total = db.query(PurchaseOrder).count()
    pending = db.query(PurchaseOrder).filter(PurchaseOrder.status == TradeRequestStatus.pending).count()
    approved = db.query(PurchaseOrder).filter(PurchaseOrder.status == TradeRequestStatus.approved).count()
    rejected = db.query(PurchaseOrder).filter(PurchaseOrder.status == TradeRequestStatus.rejected).count()

    return {
        "success": True,
        "stats": {
            "total": total,
            "pending": pending,
            "approved": approved,
            "rejected": rejected,
            "approval_rate": (approved / total * 100) if total > 0 else 0,
        }
    }

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, and_, extract
from datetime import datetime, date
from typing import Optional

from app.database import get_db
from app.models import Transaction, Expense, Invoice
from app.dependencies import require_roles
from app.models import User

router = APIRouter(prefix="/api/financials", tags=["Financials"])


@router.get("/profit-loss")
def get_profit_loss(
    period: str = Query("month", description="month, quarter, or year"),
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin", "SUPER_ADMIN"))
):
    now = datetime.utcnow()
    
    if period == "month":
        start_date = now.replace(day=1)
    elif period == "quarter":
        quarter = (now.month - 1) // 3 + 1
        start_date = now.replace(month=(quarter - 1) * 3 + 1, day=1)
    else:  # year
        start_date = now.replace(month=1, day=1)
    
    # Calculate revenue from invoices
    revenue = db.query(
        func.sum(Invoice.amount)
    ).filter(
        Invoice.created_at >= start_date,
        Invoice.status.in_(["paid", "partial"])
    ).scalar() or 0
    
    # Calculate expenses
    expenses = db.query(
        func.sum(Expense.amount)
    ).filter(
        Expense.date >= start_date.date()
    ).scalar() or 0
    
    # Get breakdown by category
    expense_breakdown = db.query(
        Expense.category,
        func.sum(Expense.amount).label("total")
    ).filter(
        Expense.date >= start_date.date()
    ).group_by(Expense.category).all()
    
    # Get revenue breakdown
    revenue_breakdown = db.query(
        func.date(Invoice.created_at).label("date"),
        func.sum(Invoice.amount).label("total")
    ).filter(
        Invoice.created_at >= start_date,
        Invoice.status.in_(["paid", "partial"])
    ).group_by(func.date(Invoice.created_at)).all()
    
    result = []
    for cat, total in expense_breakdown:
        result.append({
            "id": str(cat),
            "category": cat,
            "revenue": 0,
            "expenses": float(total),
            "period": period
        })
    
    for date_row, total in revenue_breakdown:
        result.append({
            "id": str(date_row),
            "category": "Sales",
            "revenue": float(total),
            "expenses": 0,
            "period": period
        })
    
    return {
        "success": True,
        "profitLoss": result,
        "summary": {
            "totalRevenue": float(revenue),
            "totalExpenses": float(expenses),
            "netProfit": float(revenue - expenses),
            "profitMargin": float((revenue - expenses) / revenue * 100) if revenue > 0 else 0
        }
    }


@router.get("/cash-flow")
def get_cash_flow(
    period: str = Query("month", description="month, quarter, or year"),
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin", "SUPER_ADMIN"))
):
    now = datetime.utcnow()
    
    if period == "month":
        start_date = now.replace(day=1)
    elif period == "quarter":
        quarter = (now.month - 1) // 3 + 1
        start_date = now.replace(month=(quarter - 1) * 3 + 1, day=1)
    else:  # year
        start_date = now.replace(month=1, day=1)
    
    # Get cash inflows (payments, completed invoices)
    inflows = db.query(Transaction).filter(
        Transaction.type == "payment",
        Transaction.status == "completed",
        Transaction.created_at >= start_date
    ).all()
    
    # Get cash outflows (expenses, refunds)
    outflows = db.query(Transaction).filter(
        Transaction.type.in_(["expense", "refund"]),
        Transaction.status == "completed",
        Transaction.created_at >= start_date
    ).all()
    
    result = []
    
    for t in inflows:
        result.append({
            "id": str(t.id),
            "date": t.created_at.isoformat(),
            "description": t.description or "Payment received",
            "category": "Payment",
            "type": "in",
            "amount": float(t.amount)
        })
    
    for t in outflows:
        result.append({
            "id": str(t.id),
            "date": t.created_at.isoformat(),
            "description": t.description or "Expense",
            "category": "Expense",
            "type": "out",
            "amount": float(t.amount)
        })
    
    total_in = sum(r["amount"] for r in result if r["type"] == "in")
    total_out = sum(r["amount"] for r in result if r["type"] == "out")
    
    return {
        "success": True,
        "cashFlow": sorted(result, key=lambda x: x["date"], reverse=True),
        "summary": {
            "cashIn": total_in,
            "cashOut": total_out,
            "netCashFlow": total_in - total_out,
            "cashBalance": total_in - total_out
        }
    }


@router.get("/repair-tracking")
def get_repair_tracking(
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin", "SUPER_ADMIN", "technician", "staff"))
):
    from app.models import Repair, RepairTimeline
    
    repairs = db.query(Repair).all()
    result = []
    
    status_progress = {
        "received": 10,
        "diagnosed": 30,
        "repairing": 50,
        "testing": 75,
        "collection": 90,
        "completed": 100
    }
    
    for r in repairs:
        # Calculate progress based on status
        progress = status_progress.get(r.status, 0)
        
        # Map status to repair_tracking format
        status_map = {
            "received": "pending",
            "diagnosed": "in_progress",
            "repairing": "in_progress",
            "testing": "in_progress",
            "collection": "in_progress",
            "completed": "completed"
        }
        
        result.append({
            "id": str(r.id),
            "trackingId": r.tracking_id,
            "customer": r.customer_name,
            "device": r.device_model,
            "status": status_map.get(r.status, "pending"),
            "progress": progress,
            "startDate": r.created_at.isoformat(),
            "estimatedCost": float(r.estimated_cost) if r.estimated_cost else 0
        })
    
    return {"success": True, "repairTracking": result}

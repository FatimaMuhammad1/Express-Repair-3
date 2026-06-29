from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, and_, or_
from datetime import datetime, date, timedelta
from typing import Optional
import csv
from io import StringIO
from uuid import UUID
from pydantic import BaseModel

from app.database import get_db
from app.models import Transaction, Invoice, Expense, User, Branch, OnlineSale, InHouseSale
from app.dependencies import get_current_user, require_roles

router = APIRouter(prefix="/api/finance", tags=["Finance"])


class ExpenseCreate(BaseModel):
    category: str
    description: str
    amount: float
    date: date
    branch_id: Optional[str] = None


class ExpenseUpdate(BaseModel):
    category: str = None
    description: str = None
    amount: float = None
    date: date = None


class RevenueCreate(BaseModel):
    source: str  # repair, product, service
    description: str
    amount: float
    date: date
    branch_id: Optional[str] = None


class RevenueUpdate(BaseModel):
    source: str = None
    description: str = None
    amount: float = None
    date: date = None


class OnlineSaleCreate(BaseModel):
    order_id: str
    customer_name: str
    customer_email: str = None
    customer_phone: str = None
    amount: float
    item_count: int = 0
    status: str = "pending"
    payment_method: str = None


class OnlineSaleUpdate(BaseModel):
    customer_name: str = None
    customer_email: str = None
    customer_phone: str = None
    amount: float = None
    item_count: int = None
    status: str = None
    payment_method: str = None


class InHouseSaleCreate(BaseModel):
    reference: str
    customer_name: str
    customer_phone: str = None
    amount: float
    item_count: int = 0
    payment_method: str = None


class InHouseSaleUpdate(BaseModel):
    customer_name: str = None
    customer_phone: str = None
    amount: float = None
    item_count: int = None
    payment_method: str = None


@router.get("/stats")
async def get_finance_stats(
    period: str = "monthly",
    branch_id: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get financial statistics for a given period"""
    
    # Calculate date range based on period
    now = datetime.utcnow()
    if period == "daily":
        start_date = now.date()
    elif period == "weekly":
        start_date = (now - timedelta(days=7)).date()
    elif period == "monthly":
        start_date = (now - timedelta(days=30)).date()
    elif period == "quarterly":
        start_date = (now - timedelta(days=90)).date()
    elif period == "yearly":
        start_date = (now - timedelta(days=365)).date()
    else:  # all time
        start_date = date.min
    
    # Build query filters
    filters = []
    if branch_id and branch_id != "all":
        filters.append(Transaction.branch_id == branch_id)
    
    # Total Revenue
    total_revenue = db.query(func.sum(Transaction.amount)).filter(
        and_(
            Transaction.type == "payment",
            Transaction.status == "completed",
            *filters
        )
    ).scalar() or 0
    
    # Monthly Revenue
    monthly_revenue = db.query(func.sum(Transaction.amount)).filter(
        and_(
            Transaction.type == "payment",
            Transaction.status == "completed",
            Transaction.created_at >= datetime.combine((now - timedelta(days=30)).date(), datetime.min.time()),
            *filters
        )
    ).scalar() or 0
    
    # Outstanding Payments
    outstanding_payments = db.query(func.sum(Invoice.amount - Invoice.deposit_paid)).filter(
        and_(
            Invoice.status.in_(["pending", "partial"]),
            *filters
        )
    ).scalar() or 0
    
    # Total Expenses
    total_expenses = db.query(func.sum(Expense.amount)).filter(
        and_(
            Expense.created_at >= datetime.combine(start_date, datetime.min.time()),
            *filters
        )
    ).scalar() or 0
    
    # Net Profit
    net_profit = total_revenue - total_expenses
    
    # Paid Invoices
    paid_invoices = db.query(Invoice).filter(
        and_(
            Invoice.status == "paid",
            *filters
        )
    ).count()
    
    # Pending Invoices
    pending_invoices = db.query(Invoice).filter(
        and_(
            Invoice.status.in_(["pending", "partial"]),
            *filters
        )
    ).count()
    
    return {
        "success": True,
        "stats": {
            "totalRevenue": float(total_revenue),
            "monthlyRevenue": float(monthly_revenue),
            "outstandingPayments": float(outstanding_payments),
            "netProfit": float(net_profit),
            "totalExpenses": float(total_expenses),
            "paidInvoices": paid_invoices,
            "pendingInvoices": pending_invoices,
        }
    }


@router.get("/transactions")
async def get_transactions(
    branch_id: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all financial transactions"""
    
    query = db.query(Transaction)
    
    if branch_id and branch_id != "all":
        query = query.filter(Transaction.branch_id == branch_id)
    
    transactions = query.order_by(Transaction.created_at.desc()).limit(100).all()
    
    return {
        "success": True,
        "transactions": [
            {
                "id": str(t.id),
                "type": t.type,
                "amount": float(t.amount),
                "description": t.description,
                "customer_name": t.customer_name,
                "invoice_number": t.invoice_number,
                "status": t.status,
                "payment_method": t.payment_method,
                "created_at": t.created_at.isoformat(),
            }
            for t in transactions
        ]
    }


@router.get("/invoices")
async def get_invoices(
    branch_id: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all invoices"""
    
    query = db.query(Invoice)
    
    if branch_id and branch_id != "all":
        query = query.filter(Invoice.branch_id == branch_id)
    
    invoices = query.order_by(Invoice.created_at.desc()).limit(100).all()
    
    return {
        "success": True,
        "invoices": [
            {
                "id": str(i.id),
                "invoice_number": i.invoice_number,
                "customer_name": i.customer_name,
                "amount": float(i.amount),
                "tax_amount": float(i.tax_amount),
                "deposit_paid": float(i.deposit_paid),
                "status": i.status,
                "due_date": i.due_date.isoformat() if i.due_date else None,
                "created_at": i.created_at.isoformat(),
            }
            for i in invoices
        ]
    }


@router.post("/inhouse-sales", status_code=201)
async def create_inhouse_sale(
    body: InHouseSaleCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN", "staff"))
):
    """Create a new in-house sale (accessories, etc) - Staff can use this for manual accessory book-in"""
    sale = InHouseSale(
        reference=body.reference,
        customer_name=body.customer_name,
        customer_phone=body.customer_phone,
        amount=body.amount,
        item_count=body.item_count,
        payment_method=body.payment_method
    )
    db.add(sale)
    db.commit()
    db.refresh(sale)
    
    return {
        "success": True,
        "message": "In-house sale recorded successfully",
        "sale": {
            "id": str(sale.id),
            "reference": sale.reference,
            "customer_name": sale.customer_name,
            "amount": float(sale.amount),
            "item_count": sale.item_count,
            "payment_method": sale.payment_method,
            "created_at": sale.created_at.isoformat()
        }
    }


@router.get("/expenses")
async def get_expenses(
    branch_id: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all expenses"""
    
    query = db.query(Expense)
    
    if branch_id and branch_id != "all":
        query = query.filter(Expense.branch_id == branch_id)
    
    expenses = query.order_by(Expense.created_at.desc()).limit(100).all()
    
    return {
        "success": True,
        "expenses": [
            {
                "id": str(e.id),
                "category": e.category,
                "description": e.description,
                "amount": float(e.amount),
                "date": e.date.isoformat(),
                "created_at": e.created_at.isoformat(),
            }
            for e in expenses
        ]
    }


@router.post("/expenses")
async def create_expense(
    expense_data: ExpenseCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Create a new expense"""
    expense = Expense(
        category=expense_data.category,
        description=expense_data.description,
        amount=expense_data.amount,
        date=expense_data.date,
        branch_id=expense_data.branch_id
    )
    db.add(expense)
    db.commit()
    db.refresh(expense)
    
    return {
        "success": True,
        "expense": {
            "id": str(expense.id),
            "category": expense.category,
            "description": expense.description,
            "amount": float(expense.amount),
            "date": expense.date.isoformat(),
            "created_at": expense.created_at.isoformat(),
        }
    }


@router.put("/expenses/{expense_id}")
async def update_expense(
    expense_id: UUID,
    expense_data: ExpenseUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Update an expense"""
    expense = db.query(Expense).filter(Expense.id == expense_id).first()
    if not expense:
        raise HTTPException(404, "Expense not found")
    
    if expense_data.category is not None:
        expense.category = expense_data.category
    if expense_data.description is not None:
        expense.description = expense_data.description
    if expense_data.amount is not None:
        expense.amount = expense_data.amount
    if expense_data.date is not None:
        expense.date = expense_data.date
    
    db.commit()
    
    return {"success": True, "message": "Expense updated"}


@router.delete("/expenses/{expense_id}")
async def delete_expense(
    expense_id: UUID,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Delete an expense"""
    expense = db.query(Expense).filter(Expense.id == expense_id).first()
    if not expense:
        raise HTTPException(404, "Expense not found")
    
    db.delete(expense)
    db.commit()
    
    return {"success": True, "message": "Expense deleted"}


@router.get("/revenue")
async def get_revenue(
    branch_id: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all revenue entries (from invoices and transactions)"""
    
    # Get revenue from invoices
    invoice_query = db.query(Invoice)
    if branch_id and branch_id != "all":
        invoice_query = invoice_query.filter(Invoice.branch_id == branch_id)
    
    invoices = invoice_query.filter(Invoice.status.in_(["paid", "partial"])).all()
    
    result = []
    for inv in invoices:
        result.append({
            "id": str(inv.id),
            "source": "repair",
            "description": f"Invoice {inv.invoice_number}",
            "amount": float(inv.amount),
            "date": inv.created_at.date().isoformat(),
            "created_at": inv.created_at.isoformat(),
        })
    
    # Add revenue from transactions
    trans_query = db.query(Transaction).filter(Transaction.type == "payment", Transaction.status == "completed")
    if branch_id and branch_id != "all":
        trans_query = trans_query.filter(Transaction.branch_id == branch_id)
    
    transactions = trans_query.all()
    for t in transactions:
        result.append({
            "id": str(t.id),
            "source": "payment",
            "description": t.description or "Payment",
            "amount": float(t.amount),
            "date": t.created_at.date().isoformat(),
            "created_at": t.created_at.isoformat(),
        })
    
    return {"success": True, "revenue": sorted(result, key=lambda x: x["date"], reverse=True)}


@router.post("/revenue")
async def create_revenue(
    revenue_data: RevenueCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Create a new revenue entry (as a transaction)"""
    transaction = Transaction(
        type="payment",
        amount=revenue_data.amount,
        description=revenue_data.description,
        status="completed",
        branch_id=revenue_data.branch_id
    )
    db.add(transaction)
    db.commit()
    db.refresh(transaction)
    
    return {
        "success": True,
        "revenue": {
            "id": str(transaction.id),
            "source": revenue_data.source,
            "description": transaction.description,
            "amount": float(transaction.amount),
            "date": transaction.created_at.date().isoformat(),
            "created_at": transaction.created_at.isoformat(),
        }
    }


@router.get("/online-sales")
async def get_online_sales(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all online sales"""
    sales = db.query(OnlineSale).order_by(OnlineSale.created_at.desc()).limit(100).all()
    
    return {
        "success": True,
        "onlineSales": [
            {
                "id": str(s.id),
                "orderId": s.order_id,
                "customer": s.customer_name,
                "customerEmail": s.customer_email,
                "customerPhone": s.customer_phone,
                "amount": float(s.amount),
                "itemCount": s.item_count,
                "status": s.status,
                "paymentMethod": s.payment_method,
                "date": s.created_at.isoformat(),
            }
            for s in sales
        ]
    }


@router.post("/online-sales")
async def create_online_sale(
    sale_data: OnlineSaleCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Create a new online sale"""
    sale = OnlineSale(
        order_id=sale_data.order_id,
        customer_name=sale_data.customer_name,
        customer_email=sale_data.customer_email,
        customer_phone=sale_data.customer_phone,
        amount=sale_data.amount,
        item_count=sale_data.item_count,
        status=sale_data.status,
        payment_method=sale_data.payment_method
    )
    db.add(sale)
    db.commit()
    db.refresh(sale)
    
    return {
        "success": True,
        "onlineSale": {
            "id": str(sale.id),
            "orderId": sale.order_id,
            "customer": sale.customer_name,
            "amount": float(sale.amount),
            "status": sale.status,
            "date": sale.created_at.isoformat(),
        }
    }


@router.put("/online-sales/{sale_id}")
async def update_online_sale(
    sale_id: UUID,
    sale_data: OnlineSaleUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Update an online sale"""
    sale = db.query(OnlineSale).filter(OnlineSale.id == sale_id).first()
    if not sale:
        raise HTTPException(404, "Online sale not found")
    
    if sale_data.customer_name is not None:
        sale.customer_name = sale_data.customer_name
    if sale_data.customer_email is not None:
        sale.customer_email = sale_data.customer_email
    if sale_data.customer_phone is not None:
        sale.customer_phone = sale_data.customer_phone
    if sale_data.amount is not None:
        sale.amount = sale_data.amount
    if sale_data.item_count is not None:
        sale.item_count = sale_data.item_count
    if sale_data.status is not None:
        sale.status = sale_data.status
    if sale_data.payment_method is not None:
        sale.payment_method = sale_data.payment_method
    
    db.commit()
    return {"success": True, "message": "Online sale updated"}


@router.delete("/online-sales/{sale_id}")
async def delete_online_sale(
    sale_id: UUID,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Delete an online sale"""
    sale = db.query(OnlineSale).filter(OnlineSale.id == sale_id).first()
    if not sale:
        raise HTTPException(404, "Online sale not found")
    
    db.delete(sale)
    db.commit()
    return {"success": True, "message": "Online sale deleted"}


@router.get("/inhouse-sales")
async def get_inhouse_sales(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all in-house sales"""
    sales = db.query(InHouseSale).order_by(InHouseSale.created_at.desc()).limit(100).all()
    
    return {
        "success": True,
        "inhouseSales": [
            {
                "id": str(s.id),
                "reference": s.reference,
                "customer": s.customer_name,
                "customerPhone": s.customer_phone,
                "amount": float(s.amount),
                "itemCount": s.item_count,
                "paymentMethod": s.payment_method,
                "date": s.created_at.isoformat(),
            }
            for s in sales
        ]
    }


@router.put("/inhouse-sales/{sale_id}")
async def update_inhouse_sale(
    sale_id: UUID,
    sale_data: InHouseSaleUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Update an in-house sale"""
    sale = db.query(InHouseSale).filter(InHouseSale.id == sale_id).first()
    if not sale:
        raise HTTPException(404, "In-house sale not found")
    
    if sale_data.customer_name is not None:
        sale.customer_name = sale_data.customer_name
    if sale_data.customer_phone is not None:
        sale.customer_phone = sale_data.customer_phone
    if sale_data.amount is not None:
        sale.amount = sale_data.amount
    if sale_data.item_count is not None:
        sale.item_count = sale_data.item_count
    if sale_data.payment_method is not None:
        sale.payment_method = sale_data.payment_method
    
    db.commit()
    return {"success": True, "message": "In-house sale updated"}


@router.delete("/inhouse-sales/{sale_id}")
async def delete_inhouse_sale(
    sale_id: UUID,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Delete an in-house sale"""
    sale = db.query(InHouseSale).filter(InHouseSale.id == sale_id).first()
    if not sale:
        raise HTTPException(404, "In-house sale not found")
    
    db.delete(sale)
    db.commit()
    return {"success": True, "message": "In-house sale deleted"}


@router.get("/export")
async def export_financial_report(
    period: str = "monthly",
    branch_id: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Export financial report as CSV"""
    
    # Get transactions
    query = db.query(Transaction)
    if branch_id and branch_id != "all":
        query = query.filter(Transaction.branch_id == branch_id)
    
    transactions = query.order_by(Transaction.created_at.desc()).all()
    
    # Create CSV
    output = StringIO()
    writer = csv.writer(output)
    writer.writerow(["Date", "Type", "Amount", "Description", "Customer", "Status", "Payment Method"])
    
    for t in transactions:
        writer.writerow([
            t.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            t.type,
            float(t.amount),
            t.description,
            t.customer_name,
            t.status,
            t.payment_method,
        ])
    
    output.seek(0)
    
    from fastapi.responses import Response
    return Response(
        content=output.getvalue(),
        media_type="text/csv",
        headers={
            "Content-Disposition": f"attachment; filename=financial_report_{period}_{datetime.now().strftime('%Y%m%d')}.csv"
        }
    )

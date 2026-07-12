from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, and_, or_
from datetime import datetime, date, timedelta
from typing import Optional
import csv
from io import StringIO
from uuid import UUID
from pydantic import BaseModel, field_validator

from app.database import get_db
from app.models import Transaction, Invoice, Expense, User, Branch, OnlineSale, InHouseSale, InvoiceStatus, TransactionStatus, TransactionType, ExpenseStatus, Product, PaymentMethod
from app.dependencies import get_current_user, require_roles

router = APIRouter(prefix="/api/finance", tags=["Finance"])


def resolve_invoice_status(invoice: Invoice) -> str:
    """Return the display status for an invoice, including overdue when appropriate."""
    if invoice.status == InvoiceStatus.paid:
        return InvoiceStatus.paid.value

    if invoice.due_date and invoice.due_date < date.today() and invoice.deposit_paid < invoice.amount:
        return InvoiceStatus.overdue.value

    if invoice.deposit_paid > 0 and invoice.deposit_paid < invoice.amount:
        return InvoiceStatus.partial.value

    return invoice.status.value if invoice.status else InvoiceStatus.pending.value


class ExpenseCreate(BaseModel):
    category: str
    description: str
    amount: float
    tax_amount: float = 0
    total_amount: Optional[float] = None  # If not provided, calculated as amount + tax_amount
    date: date
    branch_id: Optional[str] = None
    supplier_id: Optional[str] = None
    payment_method: Optional[str] = None
    receipt_path: Optional[str] = None
    notes: Optional[str] = None


class ExpenseUpdate(BaseModel):
    category: str = None
    description: str = None
    amount: float = None
    tax_amount: float = None
    total_amount: float = None
    date: date = None
    branch_id: str = None
    supplier_id: str = None
    payment_method: str = None
    receipt_path: str = None
    notes: str = None


class ExpenseStatusUpdate(BaseModel):
    status: str  # pending, approved, rejected, paid
    rejection_reason: Optional[str] = None


class InvoiceStatusUpdate(BaseModel):
    status: str


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
    reference: Optional[str] = None
    customer_name: str
    customer_phone: Optional[str] = None
    customer_email: Optional[str] = None
    product_id: str
    quantity: Optional[int] = 1
    price_override: Optional[float] = None
    payment_method: Optional[str] = None
    payment_status: Optional[str] = "paid"  # paid, partial, pending
    payment_amount: Optional[float] = None

    @field_validator('payment_amount')
    @classmethod
    def validate_payment_amount(cls, v, info):
        if info.data.get('payment_status') == "partial" and v is None:
            raise ValueError("payment_amount is required when payment_status is 'partial'")
        return v


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
    invoice_filters = []
    if branch_id and branch_id != "all":
        invoice_filters.append(Invoice.branch_id == branch_id)
    
    # Total Revenue (from invoices, online sales, in-house sales, and revenue transactions)
    invoice_revenue = db.query(func.sum(Invoice.amount)).filter(
        and_(
            Invoice.status.in_([InvoiceStatus.paid, InvoiceStatus.partial]),
            *invoice_filters
        )
    ).scalar() or 0
    
    online_sales_revenue = db.query(func.sum(OnlineSale.amount)).filter(
        OnlineSale.status == "completed"
    ).scalar() or 0
    
    inhouse_sales_revenue = db.query(func.sum(InHouseSale.amount)).scalar() or 0
    
    transaction_revenue = db.query(func.sum(Transaction.amount)).filter(
        and_(
            Transaction.type == "revenue",
            Transaction.status == "completed"
        )
    ).scalar() or 0
    
    total_revenue = invoice_revenue + online_sales_revenue + inhouse_sales_revenue + transaction_revenue
    
    # Monthly Revenue (from all revenue sources in last 30 days)
    monthly_invoice_revenue = db.query(func.sum(Invoice.amount)).filter(
        and_(
            Invoice.status.in_([InvoiceStatus.paid, InvoiceStatus.partial]),
            Invoice.created_at >= datetime.combine((now - timedelta(days=30)).date(), datetime.min.time()),
            *invoice_filters
        )
    ).scalar() or 0
    
    monthly_online_sales_revenue = db.query(func.sum(OnlineSale.amount)).filter(
        and_(
            OnlineSale.status == "completed",
            OnlineSale.created_at >= datetime.combine((now - timedelta(days=30)).date(), datetime.min.time())
        )
    ).scalar() or 0
    
    monthly_inhouse_sales_revenue = db.query(func.sum(InHouseSale.amount)).filter(
        InHouseSale.created_at >= datetime.combine((now - timedelta(days=30)).date(), datetime.min.time())
    ).scalar() or 0
    
    monthly_transaction_revenue = db.query(func.sum(Transaction.amount)).filter(
        and_(
            Transaction.type == "revenue",
            Transaction.status == "completed",
            Transaction.created_at >= datetime.combine((now - timedelta(days=30)).date(), datetime.min.time())
        )
    ).scalar() or 0
    
    monthly_revenue = monthly_invoice_revenue + monthly_online_sales_revenue + monthly_inhouse_sales_revenue + monthly_transaction_revenue
    
    # Outstanding Payments
    outstanding_payments = db.query(func.sum(Invoice.amount - Invoice.deposit_paid)).filter(
        and_(
            Invoice.status.in_([InvoiceStatus.pending, InvoiceStatus.partial, InvoiceStatus.overdue]),
            *invoice_filters
        )
    ).scalar() or 0
    
    # Total Expenses (includes both manual and automated parts costs)
    expense_filters = []
    if branch_id and branch_id != "all":
        expense_filters.append(Expense.branch_id == branch_id)

    total_expenses = db.query(func.sum(Expense.total_amount)).filter(
        and_(
            Expense.date >= start_date,
            *expense_filters
        )
    ).scalar() or 0
    
    # Net Profit
    net_profit = total_revenue - total_expenses
    
    # Paid Invoices
    paid_invoices = db.query(Invoice).filter(
        and_(
            Invoice.status == InvoiceStatus.paid,
            *invoice_filters
        )
    ).count()
    
    # Pending Invoices
    pending_invoices = db.query(Invoice).filter(
        and_(
            Invoice.status.in_([InvoiceStatus.pending, InvoiceStatus.partial, InvoiceStatus.overdue]),
            *invoice_filters
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
    period: str = "all",
    branch_id: Optional[str] = None,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN", "BUSINESS_OWNER"))
):
    """Get all financial transactions with optional time period filtering"""
    
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
    
    query = db.query(Transaction)
    
    if branch_id and branch_id != "all":
        query = query.filter(Transaction.branch_id == branch_id)
    
    if period != "all":
        query = query.filter(Transaction.created_at >= datetime.combine(start_date, datetime.min.time()))
    
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
    _: User = Depends(require_roles("SUPER_ADMIN", "BUSINESS_OWNER"))
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
                "status": resolve_invoice_status(i),
                "due_date": i.due_date.isoformat() if i.due_date else None,
                "created_at": i.created_at.isoformat(),
            }
            for i in invoices
        ]
    }


@router.patch("/invoices/{invoice_id}")
async def update_invoice_status(
    invoice_id: UUID,
    body: InvoiceStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN", "staff"))
):
    invoice = db.query(Invoice).filter(Invoice.id == invoice_id).first()
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")

    try:
        invoice.status = InvoiceStatus(body.status)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid invoice status")

    amount_due = float(invoice.amount or 0) - float(invoice.deposit_paid or 0)
    if invoice.status == InvoiceStatus.paid:
        invoice.paid_date = date.today()
        invoice.deposit_paid = invoice.amount

        if amount_due > 0:
            transaction = Transaction(
                type="payment",
                amount=amount_due,
                description=f"Payment for invoice {invoice.invoice_number}",
                invoice_number=invoice.invoice_number,
                status=TransactionStatus.completed,
                branch_id=invoice.branch_id,
            )
            db.add(transaction)

    db.commit()
    db.refresh(invoice)

    return {
        "success": True,
        "invoice": {
            "id": str(invoice.id),
            "invoice_number": invoice.invoice_number,
            "customer_name": invoice.customer_name,
            "amount": float(invoice.amount),
            "tax_amount": float(invoice.tax_amount),
            "deposit_paid": float(invoice.deposit_paid),
            "status": resolve_invoice_status(invoice),
            "due_date": invoice.due_date.isoformat() if invoice.due_date else None,
            "created_at": invoice.created_at.isoformat(),
        }
    }


@router.post("/inhouse-sales", status_code=201)
async def create_inhouse_sale(
    body: InHouseSaleCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN", "staff"))
):
    """Create a retail sale with product selection, immediate invoice creation, and payment tracking"""

    # Validate required fields
    if not body.product_id or not body.product_id.strip():
        raise HTTPException(400, "product_id is required")
    if not body.customer_name or not body.customer_name.strip():
        raise HTTPException(400, "customer_name is required")

    # Safe UUID parse
    try:
        product_uuid = UUID(body.product_id)
    except (ValueError, AttributeError):
        raise HTTPException(400, f"Invalid product_id: '{body.product_id}'")

    # Get product from inventory
    product = db.query(Product).filter(Product.id == product_uuid).first()
    if not product:
        raise HTTPException(404, "Product not found")

    qty = body.quantity or 1
    if product.stock_quantity < qty:
        raise HTTPException(400, f"Insufficient stock. Available: {product.stock_quantity}, Requested: {qty}")

    # Calculate price (use override if provided, otherwise product price)
    unit_price = body.price_override if body.price_override is not None else float(product.price)
    total_amount = unit_price * qty

    # Generate a unique reference if not provided
    import uuid as _uuid
    reference = body.reference or f"SALE-{datetime.now().strftime('%Y%m%d')}-{str(_uuid.uuid4())[:8].upper()}"
    
    # Resolve payment_method enum safely
    payment_method_enum = None
    if body.payment_method:
        try:
            payment_method_enum = PaymentMethod(body.payment_method)
        except ValueError:
            raise HTTPException(400, f"Invalid payment_method '{body.payment_method}'. Must be one of: cash, card, bank_transfer, online")

    # Create sale record (InHouseSale has no customer_email column)
    sale = InHouseSale(
        reference=reference,
        customer_name=body.customer_name,
        customer_phone=body.customer_phone,
        amount=total_amount,
        item_count=qty,
        payment_method=payment_method_enum,
    )
    db.add(sale)
    db.commit()
    db.refresh(sale)

    # Generate invoice number
    invoice_num = f"INV-{datetime.now().strftime('%Y%m%d')}-{str(sale.id)[:8].upper()}"

    # Map payment_status string to InvoiceStatus enum
    if body.payment_status == "paid":
        invoice_status = InvoiceStatus.paid
    elif body.payment_status == "partial":
        invoice_status = InvoiceStatus.partial
    else:
        invoice_status = InvoiceStatus.pending

    # Create invoice immediately
    invoice = Invoice(
        invoice_number=invoice_num,
        customer_name=body.customer_name,
        customer_email=body.customer_email,
        customer_phone=body.customer_phone,
        amount=total_amount,
        tax_amount=0,
        deposit_paid=0,
        status=invoice_status,
        due_date=datetime.now().date() if body.payment_status == "pending" else None,
    )
    db.add(invoice)
    db.commit()
    db.refresh(invoice)

    # Create payment transaction if payment was made
    if body.payment_status in ["paid", "partial"] and body.payment_amount and payment_method_enum:
        transaction = Transaction(
            type=TransactionType.payment,
            amount=body.payment_amount,
            description=f"Payment for retail sale {reference}",
            customer_name=body.customer_name,
            invoice_number=invoice_num,
            status=TransactionStatus.completed,
            payment_method=payment_method_enum,
        )
        db.add(transaction)
        db.commit()

    # Deduct from inventory
    product.stock_quantity -= body.quantity
    db.commit()

    return {
        "success": True,
        "message": "Retail sale recorded successfully",
        "sale": {
            "id": str(sale.id),
            "reference": sale.reference,
            "customer_name": sale.customer_name,
            "amount": float(sale.amount),
            "item_count": sale.item_count,
            "payment_method": sale.payment_method.value if sale.payment_method else None,
            "invoice_number": invoice_num,
            "created_at": sale.created_at.isoformat()
        }
    }


@router.get("/expenses")
async def get_expenses(
    branch_id: Optional[str] = None,
    category: Optional[str] = None,
    status: Optional[str] = None,
    supplier_id: Optional[str] = None,
    payment_method: Optional[str] = None,
    search: Optional[str] = None,
    date_from: Optional[str] = None,
    date_to: Optional[str] = None,
    amount_min: Optional[float] = None,
    amount_max: Optional[float] = None,
    sort_by: Optional[str] = "created_at",
    sort_order: Optional[str] = "desc",
    page: Optional[int] = 1,
    per_page: Optional[int] = 25,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN", "BUSINESS_OWNER"))
):
    """Get all expenses with filtering, sorting, and pagination"""

    query = db.query(Expense)

    # Apply filters
    if branch_id and branch_id != "all":
        query = query.filter(Expense.branch_id == branch_id)
    if category:
        query = query.filter(Expense.category == category)
    if status:
        query = query.filter(Expense.status == status)
    if supplier_id:
        query = query.filter(Expense.supplier_id == supplier_id)
    if payment_method:
        query = query.filter(Expense.payment_method == payment_method)
    if search:
        search_pattern = f"%{search}%"
        query = query.filter(
            or_(
                Expense.description.ilike(search_pattern),
                Expense.notes.ilike(search_pattern)
            )
        )
    if date_from:
        query = query.filter(Expense.date >= date_from)
    if date_to:
        query = query.filter(Expense.date <= date_to)
    if amount_min is not None:
        query = query.filter(Expense.total_amount >= amount_min)
    if amount_max is not None:
        query = query.filter(Expense.total_amount <= amount_max)

    # Count total records
    total_count = query.count()

    # Apply sorting
    valid_sort_fields = ["created_at", "date", "total_amount", "category", "status"]
    if sort_by not in valid_sort_fields:
        sort_by = "created_at"

    sort_column = getattr(Expense, sort_by)
    if sort_order == "desc":
        query = query.order_by(sort_column.desc())
    else:
        query = query.order_by(sort_column.asc())

    # Apply pagination
    offset = (page - 1) * per_page
    expenses = query.offset(offset).limit(per_page).all()

    return {
        "success": True,
        "expenses": [
            {
                "id": str(e.id),
                "category": e.category,
                "description": e.description,
                "amount": float(e.amount),
                "tax_amount": float(e.tax_amount) if e.tax_amount else 0,
                "total_amount": float(e.total_amount),
                "date": e.date.isoformat(),
                "branch_id": str(e.branch_id) if e.branch_id else None,
                "supplier_id": str(e.supplier_id) if e.supplier_id else None,
                "payment_method": e.payment_method,
                "status": e.status,
                "receipt_path": e.receipt_path,
                "notes": e.notes,
                "source_type": e.source_type,
                "source_id": str(e.source_id) if e.source_id else None,
                "created_by": str(e.created_by) if e.created_by else None,
                "approved_by": str(e.approved_by) if e.approved_by else None,
                "approved_at": e.approved_at.isoformat() if e.approved_at else None,
                "created_at": e.created_at.isoformat(),
                "updated_at": e.updated_at.isoformat() if e.updated_at else None,
            }
            for e in expenses
        ],
        "pagination": {
            "total": total_count,
            "page": page,
            "per_page": per_page,
            "total_pages": (total_count + per_page - 1) // per_page
        }
    }


@router.post("/expenses")
async def create_expense(
    expense_data: ExpenseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN", "staff"))
):
    """Create a new expense"""
    # Validation
    if expense_data.amount < 0:
        raise HTTPException(400, "Amount cannot be negative")
    if expense_data.tax_amount < 0:
        raise HTTPException(400, "Tax amount cannot be negative")
    if not expense_data.description or not expense_data.description.strip():
        raise HTTPException(400, "Description is required")

    # Calculate total amount
    total_amount = expense_data.total_amount if expense_data.total_amount is not None else expense_data.amount + expense_data.tax_amount

    # Convert empty strings to None for UUID fields
    branch_id = expense_data.branch_id if expense_data.branch_id else None
    supplier_id = expense_data.supplier_id if expense_data.supplier_id else None

    expense = Expense(
        category=expense_data.category,
        description=expense_data.description,
        amount=expense_data.amount,
        tax_amount=expense_data.tax_amount,
        total_amount=total_amount,
        date=expense_data.date,
        branch_id=branch_id,
        supplier_id=supplier_id,
        payment_method=expense_data.payment_method,
        receipt_path=expense_data.receipt_path,
        notes=expense_data.notes,
        source_type="manual",
        created_by=current_user.id,
        status="pending"  # Default to pending status
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
            "tax_amount": float(expense.tax_amount),
            "total_amount": float(expense.total_amount),
            "date": expense.date.isoformat(),
            "branch_id": str(expense.branch_id) if expense.branch_id else None,
            "supplier_id": str(expense.supplier_id) if expense.supplier_id else None,
            "payment_method": expense.payment_method,
            "status": expense.status,
            "receipt_path": expense.receipt_path,
            "notes": expense.notes,
            "created_by": str(expense.created_by) if expense.created_by else None,
            "created_at": expense.created_at.isoformat(),
        }
    }


@router.put("/expenses/{expense_id}")
async def update_expense(
    expense_id: UUID,
    expense_data: ExpenseUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN", "staff"))
):
    """Update an expense"""
    expense = db.query(Expense).filter(Expense.id == expense_id).first()
    if not expense:
        raise HTTPException(404, "Expense not found")

    # Permission check: staff can only edit their own pending expenses
    if current_user.role != "SUPER_ADMIN":
        if expense.created_by != current_user.id:
            raise HTTPException(403, "You can only edit your own expenses")
        if expense.status != "pending":
            raise HTTPException(403, "You can only edit pending expenses")

    # Validation
    if expense_data.amount is not None and expense_data.amount < 0:
        raise HTTPException(400, "Amount cannot be negative")
    if expense_data.tax_amount is not None and expense_data.tax_amount < 0:
        raise HTTPException(400, "Tax amount cannot be negative")

    # Update fields
    if expense_data.category is not None:
        expense.category = expense_data.category
    if expense_data.description is not None:
        expense.description = expense_data.description
    if expense_data.amount is not None:
        expense.amount = expense_data.amount
    if expense_data.tax_amount is not None:
        expense.tax_amount = expense_data.tax_amount
    if expense_data.total_amount is not None:
        expense.total_amount = expense_data.total_amount
    elif expense_data.amount is not None or expense_data.tax_amount is not None:
        # Recalculate total if amount or tax changed
        expense.total_amount = (expense.amount if expense_data.amount is None else expense_data.amount) + (expense.tax_amount if expense_data.tax_amount is None else expense_data.tax_amount)
    if expense_data.date is not None:
        expense.date = expense_data.date
    if expense_data.branch_id is not None:
        expense.branch_id = expense_data.branch_id
    if expense_data.supplier_id is not None:
        expense.supplier_id = expense_data.supplier_id
    if expense_data.payment_method is not None:
        expense.payment_method = expense_data.payment_method
    if expense_data.receipt_path is not None:
        expense.receipt_path = expense_data.receipt_path
    if expense_data.notes is not None:
        expense.notes = expense_data.notes

    db.commit()

    return {"success": True, "message": "Expense updated"}


@router.delete("/expenses/{expense_id}")
async def delete_expense(
    expense_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN", "staff"))
):
    """Delete an expense"""
    expense = db.query(Expense).filter(Expense.id == expense_id).first()
    if not expense:
        raise HTTPException(404, "Expense not found")

    # Permission check: staff can only delete their own pending expenses
    if current_user.role != "SUPER_ADMIN":
        if expense.created_by != current_user.id:
            raise HTTPException(403, "You can only delete your own expenses")
        if expense.status != "pending":
            raise HTTPException(403, "You can only delete pending expenses")

    db.delete(expense)
    db.commit()

    return {"success": True, "message": "Expense deleted"}


@router.patch("/expenses/{expense_id}/status")
async def update_expense_status(
    expense_id: UUID,
    status_data: ExpenseStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Approve or reject an expense (Admin only)"""
    expense = db.query(Expense).filter(Expense.id == expense_id).first()
    if not expense:
        raise HTTPException(404, "Expense not found")

    # Validate status
    valid_statuses = ["pending", "approved", "rejected", "paid"]
    if status_data.status not in valid_statuses:
        raise HTTPException(400, f"Invalid status. Must be one of: {', '.join(valid_statuses)}")

    # Update status
    expense.status = status_data.status
    if status_data.status in ["approved", "rejected"]:
        expense.approved_by = current_user.id
        expense.approved_at = datetime.utcnow()

    db.commit()

    return {
        "success": True,
        "message": f"Expense status updated to {status_data.status}",
        "expense": {
            "id": str(expense.id),
            "status": expense.status,
            "approved_by": str(expense.approved_by) if expense.approved_by else None,
            "approved_at": expense.approved_at.isoformat() if expense.approved_at else None,
        }
    }


@router.get("/expenses/analytics")
async def get_expense_analytics(
    branch_id: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get expense analytics for dashboard cards and charts"""
    now = datetime.utcnow()
    today = now.date()
    week_ago = (now - timedelta(days=7)).date()
    month_ago = (now - timedelta(days=30)).date()

    # Build query filters
    filters = []
    if branch_id and branch_id != "all":
        filters.append(Expense.branch_id == branch_id)

    # Total expenses
    total_expenses = db.query(func.sum(Expense.total_amount)).filter(
        and_(*filters)
    ).scalar() or 0

    # Today's expenses
    today_expenses = db.query(func.sum(Expense.total_amount)).filter(
        and_(
            Expense.date == today,
            *filters
        )
    ).scalar() or 0

    # This week's expenses
    week_expenses = db.query(func.sum(Expense.total_amount)).filter(
        and_(
            Expense.date >= week_ago,
            *filters
        )
    ).scalar() or 0

    # This month's expenses
    month_expenses = db.query(func.sum(Expense.total_amount)).filter(
        and_(
            Expense.date >= month_ago,
            *filters
        )
    ).scalar() or 0

    # Pending approval count
    pending_count = db.query(Expense).filter(
        and_(
            Expense.status == ExpenseStatus.pending,
            *filters
        )
    ).count()

    # Average expense
    avg_expense = db.query(func.avg(Expense.total_amount)).filter(
        and_(*filters)
    ).scalar() or 0

    # Largest expense
    largest_expense = db.query(func.max(Expense.total_amount)).filter(
        and_(*filters)
    ).scalar() or 0

    # Top expense category
    category_stats = db.query(
        Expense.category,
        func.sum(Expense.total_amount).label('total')
    ).filter(
        and_(*filters)
    ).group_by(Expense.category).order_by(func.sum(Expense.total_amount).desc()).first()

    top_category = category_stats[0] if category_stats else None

    # Monthly trend (last 6 months)
    monthly_trend = []
    for i in range(6):
        month_start = (now - timedelta(days=30*i)).replace(day=1).date()
        month_end = (month_start.replace(day=28) + timedelta(days=4)).replace(day=1) - timedelta(days=1)

        month_total = db.query(func.sum(Expense.total_amount)).filter(
            and_(
                Expense.date >= month_start,
                Expense.date <= month_end,
                *filters
            )
        ).scalar() or 0

        monthly_trend.append({
            "month": month_start.strftime("%b %Y"),
            "amount": float(month_total)
        })

    monthly_trend.reverse()

    # Category breakdown
    category_breakdown = db.query(
        Expense.category,
        func.sum(Expense.total_amount).label('total'),
        func.count(Expense.id).label('count')
    ).filter(
        and_(*filters)
    ).group_by(Expense.category).all()

    category_data = [
        {
            "category": cat[0],
            "amount": float(cat[1]),
            "count": cat[2]
        }
        for cat in category_breakdown
    ]

    # Supplier spending
    supplier_spending = db.query(
        Expense.supplier_id,
        func.sum(Expense.total_amount).label('total')
    ).filter(
        and_(
            Expense.supplier_id.isnot(None),
            *filters
        )
    ).group_by(Expense.supplier_id).order_by(func.sum(Expense.total_amount).desc()).limit(10).all()

    supplier_data = [
        {
            "supplier_id": str(sup[0]),
            "amount": float(sup[1])
        }
        for sup in supplier_spending
    ]

    return {
        "success": True,
        "analytics": {
            "total_expenses": float(total_expenses),
            "today_expenses": float(today_expenses),
            "week_expenses": float(week_expenses),
            "month_expenses": float(month_expenses),
            "pending_count": pending_count,
            "average_expense": float(avg_expense),
            "largest_expense": float(largest_expense),
            "top_category": top_category,
            "monthly_trend": monthly_trend,
            "category_breakdown": category_data,
            "supplier_spending": supplier_data
        }
    }


@router.get("/revenue")
async def get_revenue(
    branch_id: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all revenue entries (from invoices, online sales, in-house sales, and transactions)"""
    
    result = []
    
    # Get revenue from invoices (repairs)
    invoice_query = db.query(Invoice)
    if branch_id and branch_id != "all":
        invoice_query = invoice_query.filter(Invoice.branch_id == branch_id)
    
    invoices = invoice_query.filter(Invoice.status.in_([InvoiceStatus.paid, InvoiceStatus.partial])).all()
    
    for inv in invoices:
        invoice_status = "received" if inv.status == InvoiceStatus.paid else inv.status.value
        result.append({
            "id": str(inv.id),
            "source": "repair",
            "description": f"Invoice {inv.invoice_number}",
            "amount": float(inv.amount),
            "date": inv.created_at.date().isoformat(),
            "created_at": inv.created_at.isoformat(),
            "status": invoice_status,
        })
    
    # Get revenue from online sales
    online_sales = db.query(OnlineSale).filter(OnlineSale.status == "completed").all()
    
    for sale in online_sales:
        result.append({
            "id": str(sale.id),
            "source": "online",
            "description": f"Online Order {sale.order_id}",
            "amount": float(sale.amount),
            "date": sale.created_at.date().isoformat(),
            "created_at": sale.created_at.isoformat(),
            "status": "received",
        })
    
    # Get revenue from in-house sales
    inhouse_sales = db.query(InHouseSale).all()
    
    for sale in inhouse_sales:
        result.append({
            "id": str(sale.id),
            "source": "retail",
            "description": f"In-House Sale {sale.reference or sale.id}",
            "amount": float(sale.amount),
            "date": sale.created_at.date().isoformat(),
            "created_at": sale.created_at.isoformat(),
            "status": "received",
        })
    
    # Add revenue from non-invoice payments only to avoid double-counting invoice-linked payments
    trans_query = db.query(Transaction).filter(
        Transaction.type == "payment",
        Transaction.status == "completed",
        or_(Transaction.invoice_number == None, Transaction.invoice_number == "")
    )
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
            "status": "received",
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
            "status": "received",
        }
    }


@router.delete("/revenue/{revenue_id}")
async def delete_revenue(
    revenue_id: UUID,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Delete a revenue entry (transaction)"""
    transaction = db.query(Transaction).filter(Transaction.id == revenue_id).first()
    if not transaction:
        raise HTTPException(404, "Revenue entry not found")
    
    db.delete(transaction)
    db.commit()
    return {"success": True, "message": "Revenue entry deleted"}


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
    _: User = Depends(require_roles("SUPER_ADMIN", "staff", "BUSINESS_OWNER"))
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

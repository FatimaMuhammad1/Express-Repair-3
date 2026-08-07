from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from decimal import Decimal
from typing import Optional
from datetime import datetime, timedelta
from datetime import timezone

from app.database import get_db
from app.models import Repair, User, TaxRate, Invoice, InvoiceStatus
from app.dependencies import require_roles
from pydantic import BaseModel

router = APIRouter(prefix="/api/invoices", tags=["Invoices"])


class InvoiceCreate(BaseModel):
    repair_id: UUID
    tax_rate_id: Optional[UUID] = None
    notes: Optional[str] = None


class InvoiceResponse(BaseModel):
    success: bool
    message: str
    invoice_url: Optional[str] = None


@router.post("/generate")
async def generate_invoice(
    body: InvoiceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN")),
):
    """Generate a professional HTML invoice for a repair (can be printed/saved as PDF from browser)"""

    repair = db.query(Repair).filter(Repair.id == body.repair_id).first()
    if not repair:
        raise HTTPException(404, "Repair not found")
    
    # Get tax rate - use provided tax_rate_id, or default to 20% VAT
    tax_percentage = 20.0  # Default UK VAT rate
    if body.tax_rate_id:
        tax_rate = db.query(TaxRate).filter(TaxRate.id == body.tax_rate_id).first()
        if tax_rate:
            tax_percentage = float(tax_rate.rate * 100)

    # Calculate totals - use final_repair_cost if available, otherwise estimated_cost
    cost = repair.final_repair_cost or repair.estimated_cost
    subtotal = float(cost) if cost else 0
    tax_amount = subtotal * (tax_percentage / 100)
    total = subtotal + tax_amount

    # Check if invoice already exists for this repair
    existing_invoice = db.query(Invoice).filter(Invoice.repair_id == repair.id).first()
    if existing_invoice:
        raise HTTPException(400, "Invoice already exists for this repair")

    # Create invoice record in database
    invoice_num = f"INV-{datetime.now().strftime('%Y%m%d')}-{repair.tracking_id}"
    invoice = Invoice(
        invoice_number=invoice_num,
        repair_id=repair.id,
        customer_name=repair.customer_name,
        customer_email=repair.customer_email,
        customer_phone=repair.customer_phone,
        amount=total,
        tax_amount=tax_amount,
        deposit_paid=repair.deposit_paid or 0,
        status=InvoiceStatus.pending if (repair.deposit_paid or 0) == 0 else InvoiceStatus.partial,
        due_date=datetime.now(timezone.utc).date() + timedelta(days=7),
        notes=body.notes
    )
    db.add(invoice)
    try:
        db.commit()
        db.refresh(invoice)
    except Exception as e:
        db.rollback()
        raise HTTPException(500, f"Failed to create invoice: {str(e)}")

    # Generate professional HTML invoice
    invoice_html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Invoice INV-{repair.tracking_id}</title>
        <style>
            body {{ font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }}
            .header {{ display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0095ff; padding-bottom: 20px; margin-bottom: 20px; }}
            .company {{ color: #0095ff; }}
            .invoice-details {{	text-align: right; }}
            .section {{ margin-bottom: 20px; }}
            .section-title {{ font-weight: bold; color: #333; margin-bottom: 10px; }}
            table {{ width: 100%; border-collapse: collapse; margin-bottom: 20px; }}
            th, td {{ padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }}
            th {{ background-color: #f5f5f5; }}
            .totals {{ text-align: right; margin-top: 20px; }}
            .total-row {{ display: flex; justify-content: flex-end; padding: 5px 0; }}
            .total-label {{ width: 150px; }}
            .total-value {{ width: 100px; font-weight: bold; }}
            .grand-total {{ font-size: 18px; color: #0095ff; border-top: 2px solid #0095ff; padding-top: 10px; }}
            .footer {{ margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px; }}
            @media print {{ body {{ margin: 0; }} }}
        </style>
    </head>
    <body>
        <div class="header">
            <div class="company">
                <h1 style="margin: 0; color: #0095ff;">Express Phone & Laptop Repair</h1>
                <p style="margin: 5px 0; color: #666;">Nuneaton's Trusted Repair Service</p>
                <p style="margin: 5px 0; color: #666;">6 Harefield Road, Nuneaton, CV11 4HD</p>
                <p style="margin: 5px 0; color: #666;">07415 278767</p>
            </div>
            <div class="invoice-details">
                <h2 style="margin: 0;">INVOICE</h2>
                <p style="margin: 5px 0;"><strong>Invoice Number:</strong> INV-{repair.tracking_id}</p>
                <p style="margin: 5px 0;"><strong>Date:</strong> {datetime.utcnow().strftime('%B %d, %Y')}</p>
                <p style="margin: 5px 0;"><strong>Status:</strong> {repair.status.value if repair.status else 'Pending'}</p>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Bill To:</div>
            <p><strong>{repair.customer_name}</strong></p>
            <p>Phone: {repair.customer_phone or 'N/A'}</p>
        </div>

        <div class="section">
            <div class="section-title">Repair Details:</div>
            <table>
                <tr>
                    <th>Tracking ID</th>
                    <th>Device Model</th>
                    <th>Status</th>
                    <th>Amount</th>
                </tr>
                <tr>
                    <td>{repair.tracking_id}</td>
                    <td>{repair.device_model}</td>
                    <td>{repair.status.value if repair.status else 'Pending'}</td>
                    <td>£{subtotal:.2f}</td>
                </tr>
            </table>
        </div>

        <div class="totals">
            <div class="total-row">
                <span class="total-label">Subtotal:</span>
                <span class="total-value">£{subtotal:.2f}</span>
            </div>
            <div class="total-row">
                <span class="total-label">Tax ({tax_percentage}%):</span>
                <span class="total-value">£{tax_amount:.2f}</span>
            </div>
            <div class="total-row grand-total">
                <span class="total-label">Total:</span>
                <span class="total-value">£{total:.2f}</span>
            </div>
        </div>

        {f'<div class="section"><div class="section-title">Notes:</div><p>{body.notes}</p></div>' if body.notes else ''}

        <div class="footer">
            <p>Thank you for your business!</p>
            <p>Payment terms: Due upon collection</p>
            <p>Generated by {current_user.name} on {datetime.utcnow().strftime('%B %d, %Y at %I:%M %p')}</p>
        </div>
    </body>
    </html>
    """

    return {
        "success": True,
        "message": "Invoice generated successfully",
        "invoice": {
            "id": str(invoice.id),
            "invoice_number": f"INV-{repair.tracking_id}",
            "repair_id": str(body.repair_id),
            "tracking_id": repair.tracking_id,
            "customer_name": repair.customer_name,
            "customer_phone": repair.customer_phone,
            "device_model": repair.device_model,
            "status": repair.status.value if repair.status else None,
            "subtotal": subtotal,
            "tax_percentage": tax_percentage,
            "tax_amount": tax_amount,
            "total": total,
            "notes": body.notes,
            "generated_at": datetime.utcnow().isoformat(),
            "generated_by": current_user.name,
            "html": invoice_html,
        },
        "print_instruction": "Use the returned HTML to display/print the invoice. Users can print to PDF from their browser."
    }


@router.get("/preview/{repair_id}")
async def preview_invoice(
    repair_id: UUID,
    tax_rate_id: Optional[UUID] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN")),
):
    """Preview invoice data before generating PDF"""
    
    repair = db.query(Repair).filter(Repair.id == repair_id).first()
    if not repair:
        raise HTTPException(404, "Repair not found")
    
    # Get tax rate if provided
    tax_rate = None
    tax_percentage = 0
    if tax_rate_id:
        tax_rate = db.query(TaxRate).filter(TaxRate.id == tax_rate_id).first()
        if tax_rate:
            tax_percentage = float(tax_rate.rate * 100)
    
    # Calculate totals
    subtotal = float(repair.estimated_cost) if repair.estimated_cost else 0
    tax_amount = subtotal * (tax_percentage / 100)
    total = subtotal + tax_amount
    
    return {
        "success": True,
        "preview": {
            "invoice_number": f"INV-{repair.tracking_id}",
            "repair_id": str(repair_id),
            "tracking_id": repair.tracking_id,
            "customer_name": repair.customer_name,
            "customer_phone": repair.customer_phone,
            "customer_email": repair.customer_email,
            "device_model": repair.device_model,
            "status": repair.status.value if repair.status else None,
            "status_notes": repair.status_notes,
            "created_at": repair.created_at.isoformat() if repair.created_at else None,
            "subtotal": subtotal,
            "tax_percentage": tax_percentage,
            "tax_amount": tax_amount,
            "total": total,
        }
    }


@router.post("/batch")
async def generate_batch_invoices(
    repair_ids: list[UUID],
    tax_rate_id: Optional[UUID] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN")),
):
    """Generate multiple invoices at once"""
    
    invoices = []
    for repair_id in repair_ids:
        repair = db.query(Repair).filter(Repair.id == repair_id).first()
        if repair:
            # Get tax rate if provided
            tax_percentage = 0
            if tax_rate_id:
                tax_rate = db.query(TaxRate).filter(TaxRate.id == tax_rate_id).first()
                if tax_rate:
                    tax_percentage = float(tax_rate.rate * 100)
            
            subtotal = float(repair.estimated_cost) if repair.estimated_cost else 0
            tax_amount = subtotal * (tax_percentage / 100)
            total = subtotal + tax_amount
            
            invoices.append({
                "invoice_number": f"INV-{repair.tracking_id}",
                "repair_id": str(repair_id),
                "customer_name": repair.customer_name,
                "subtotal": subtotal,
                "tax_amount": tax_amount,
                "total": total,
            })
    
    return {
        "success": True,
        "message": f"Generated {len(invoices)} invoices",
        "invoices": invoices,
        "total_amount": sum(inv["total"] for inv in invoices)
    }


@router.get("/tax-rates")
async def get_available_tax_rates(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN")),
):
    """Get available tax rates for invoice generation"""
    
    tax_rates = db.query(TaxRate).filter(TaxRate.is_active == True).all()
    
    return {
        "success": True,
        "tax_rates": [
            {
                "id": str(rate.id),
                "name": rate.name,
                "rate": float(rate.rate),
                "percentage": float(rate.rate * 100),
                "is_default": rate.is_default,
            }
            for rate in tax_rates
        ]
    }

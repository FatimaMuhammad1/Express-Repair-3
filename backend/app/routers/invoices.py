from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from decimal import Decimal
from typing import Optional
from datetime import datetime

from app.database import get_db
from app.models import Repair, User, TaxRate
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
    repair_id: UUID,
    tax_rate_id: Optional[UUID] = None,
    notes: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN")),
):
    """Generate a PDF invoice for a repair"""
    
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
    
    # In a real implementation, this would:
    # 1. Use a PDF library like ReportLab or WeasyPrint
    # 2. Generate a professional invoice with company branding
    # 3. Include repair details, customer info, line items, taxes
    # 4. Save to storage and return a URL
    
    return {
        "success": True,
        "message": "Invoice generated successfully",
        "invoice": {
            "invoice_number": f"INV-{repair.tracking_id}",
            "repair_id": str(repair_id),
            "tracking_id": repair.tracking_id,
            "customer_name": repair.customer_name,
            "customer_phone": repair.customer_phone,
            "device_model": repair.device_model,
            "status": repair.status.value if repair.status else None,
            "subtotal": subtotal,
            "tax_percentage": tax_percentage,
            "tax_amount": tax_amount,
            "total": total,
            "notes": notes,
            "generated_at": datetime.utcnow().isoformat(),
            "generated_by": current_user.name,
        },
        "note": "In production, this would generate an actual PDF file using ReportLab or WeasyPrint"
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

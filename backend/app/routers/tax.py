from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from decimal import Decimal
from typing import Optional

from app.database import get_db
from app.models import TaxRate, User
from app.dependencies import require_roles
from pydantic import BaseModel

router = APIRouter(prefix="/api/tax", tags=["Tax Management"])


class TaxRateCreate(BaseModel):
    name: str
    rate: float  # e.g., 0.20 for 20%
    description: Optional[str] = None
    is_default: bool = False


class TaxRateUpdate(BaseModel):
    name: Optional[str] = None
    rate: Optional[float] = None
    description: Optional[str] = None
    is_default: Optional[bool] = None
    is_active: Optional[bool] = None


class TaxCalculationRequest(BaseModel):
    amount: float
    tax_rate_id: Optional[UUID] = None  # If not provided, use default


@router.get("/rates")
def get_tax_rates(
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin", "staff", "SUPER_ADMIN")),
):
    """Get all tax rates"""
    rates = db.query(TaxRate).filter(TaxRate.is_active == True).all()

    result = []
    for rate in rates:
        result.append({
            "id": str(rate.id),
            "name": rate.name,
            "rate": float(rate.rate),
            "percentage": float(rate.rate * 100),
            "description": rate.description,
            "is_default": rate.is_default,
            "is_active": rate.is_active,
            "created_at": rate.created_at.isoformat(),
        })

    return {
        "success": True,
        "rates": result
    }


@router.get("/rates/default")
def get_default_tax_rate(
    db: Session = Depends(get_db),
):
    """Get the default tax rate"""
    rate = db.query(TaxRate).filter(
        TaxRate.is_default == True,
        TaxRate.is_active == True
    ).first()

    if not rate:
        # If no default set, return the first active rate or 0
        rate = db.query(TaxRate).filter(TaxRate.is_active == True).first()
        if not rate:
            return {
                "success": True,
                "rate": None,
                "message": "No tax rates configured"
            }

    return {
        "success": True,
        "rate": {
            "id": str(rate.id),
            "name": rate.name,
            "rate": float(rate.rate),
            "percentage": float(rate.rate * 100),
        }
    }


@router.post("/rates", status_code=201)
def create_tax_rate(
    body: TaxRateCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin", "SUPER_ADMIN")),
):
    """Create a new tax rate"""
    # If setting as default, unset other defaults
    if body.is_default:
        db.query(TaxRate).filter(TaxRate.is_default == True).update({"is_default": False})

    tax_rate = TaxRate(
        name=body.name,
        rate=Decimal(str(body.rate)),
        description=body.description,
        is_default=body.is_default,
    )

    db.add(tax_rate)
    db.commit()
    db.refresh(tax_rate)

    return {
        "success": True,
        "message": "Tax rate created successfully",
        "rate": {
            "id": str(tax_rate.id),
            "name": tax_rate.name,
            "rate": float(tax_rate.rate),
            "percentage": float(tax_rate.rate * 100),
            "is_default": tax_rate.is_default,
        }
    }


@router.put("/rates/{rate_id}")
def update_tax_rate(
    rate_id: UUID,
    body: TaxRateUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin", "SUPER_ADMIN")),
):
    """Update a tax rate"""
    tax_rate = db.query(TaxRate).filter(TaxRate.id == rate_id).first()
    if not tax_rate:
        raise HTTPException(404, "Tax rate not found")

    # If setting as default, unset other defaults
    if body.is_default is True:
        db.query(TaxRate).filter(
            TaxRate.is_default == True,
            TaxRate.id != rate_id
        ).update({"is_default": False})

    if body.name is not None:
        tax_rate.name = body.name
    if body.rate is not None:
        tax_rate.rate = Decimal(str(body.rate))
    if body.description is not None:
        tax_rate.description = body.description
    if body.is_default is not None:
        tax_rate.is_default = body.is_default
    if body.is_active is not None:
        tax_rate.is_active = body.is_active

    db.commit()
    db.refresh(tax_rate)

    return {
        "success": True,
        "message": "Tax rate updated successfully",
        "rate": {
            "id": str(tax_rate.id),
            "name": tax_rate.name,
            "rate": float(tax_rate.rate),
            "percentage": float(tax_rate.rate * 100),
            "is_default": tax_rate.is_default,
            "is_active": tax_rate.is_active,
        }
    }


@router.delete("/rates/{rate_id}")
def delete_tax_rate(
    rate_id: UUID,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin", "SUPER_ADMIN")),
):
    """Delete a tax rate (soft delete by setting is_active to False)"""
    tax_rate = db.query(TaxRate).filter(TaxRate.id == rate_id).first()
    if not tax_rate:
        raise HTTPException(404, "Tax rate not found")

    if tax_rate.is_default:
        raise HTTPException(400, "Cannot delete the default tax rate. Set another as default first.")

    tax_rate.is_active = False
    db.commit()

    return {
        "success": True,
        "message": "Tax rate deleted successfully"
    }


@router.post("/calculate")
def calculate_tax(
    body: TaxCalculationRequest,
    db: Session = Depends(get_db),
):
    """Calculate tax for a given amount"""
    tax_rate = None

    if body.tax_rate_id:
        tax_rate = db.query(TaxRate).filter(
            TaxRate.id == body.tax_rate_id,
            TaxRate.is_active == True
        ).first()
    else:
        # Use default rate
        tax_rate = db.query(TaxRate).filter(
            TaxRate.is_default == True,
            TaxRate.is_active == True
        ).first()

    if not tax_rate:
        # No tax rate found, return 0 tax
        return {
            "success": True,
            "amount": body.amount,
            "tax_amount": 0.0,
            "total_with_tax": body.amount,
            "tax_rate": 0.0,
            "tax_percentage": 0.0,
            "message": "No tax rate configured"
        }

    amount = Decimal(str(body.amount))
    tax_amount = amount * tax_rate.rate
    total_with_tax = amount + tax_amount

    return {
        "success": True,
        "amount": float(amount),
        "tax_amount": float(tax_amount),
        "total_with_tax": float(total_with_tax),
        "tax_rate": float(tax_rate.rate),
        "tax_percentage": float(tax_rate.rate * 100),
        "tax_rate_name": tax_rate.name,
    }


@router.post("/calculate/batch")
def calculate_tax_batch(
    items: list[TaxCalculationRequest],
    db: Session = Depends(get_db),
):
    """Calculate tax for multiple items"""
    results = []
    total_amount = Decimal("0")
    total_tax = Decimal("0")

    for item in items:
        tax_rate = None

        if item.tax_rate_id:
            tax_rate = db.query(TaxRate).filter(
                TaxRate.id == item.tax_rate_id,
                TaxRate.is_active == True
            ).first()
        else:
            tax_rate = db.query(TaxRate).filter(
                TaxRate.is_default == True,
                TaxRate.is_active == True
            ).first()

        amount = Decimal(str(item.amount))
        tax_amount = amount * tax_rate.rate if tax_rate else Decimal("0")
        total_with_tax = amount + tax_amount

        total_amount += amount
        total_tax += tax_amount

        results.append({
            "amount": float(amount),
            "tax_amount": float(tax_amount),
            "total_with_tax": float(total_with_tax),
            "tax_rate": float(tax_rate.rate) if tax_rate else 0.0,
            "tax_percentage": float(tax_rate.rate * 100) if tax_rate else 0.0,
        })

    return {
        "success": True,
        "items": results,
        "summary": {
            "total_amount": float(total_amount),
            "total_tax": float(total_tax),
            "total_with_tax": float(total_amount + total_tax),
        }
    }

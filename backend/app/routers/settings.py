from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
import logging

from app.database import get_db
from app.models import User
from app.dependencies import require_roles
from app.config import settings

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/settings", tags=["Business Settings"])


class BusinessSettings(BaseModel):
    business_name: str = "Express Phone & Laptop Repair"
    business_address: str = "6 Harefield Road, Nuneaton, CV11 4HD"
    business_phone: str = "07415 278767"
    business_email: str = "noreply@electronicsrepair.com"
    default_tax_rate: float = 0.20  # 20% VAT
    currency: str = "GBP"
    invoice_prefix: str = "INV"
    repair_prefix: str = "REP"
    quote_validity_days: int = 30
    payment_terms: str = "Due upon collection"
    notes: Optional[str] = None


# In-memory settings (in production, these would be stored in database)
_business_settings = BusinessSettings()


@router.get("/business")
def get_business_settings(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Get current business settings"""
    return {
        "success": True,
        "settings": _business_settings
    }


@router.put("/business")
def update_business_settings(
    settings_data: BusinessSettings,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Update business settings"""
    global _business_settings
    _business_settings = settings_data
    logger.info(f"Business settings updated by {current_user.name}")
    return {
        "success": True,
        "message": "Business settings updated successfully",
        "settings": _business_settings
    }


@router.get("/system")
def get_system_settings(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN"))
):
    """Get system configuration (read-only)"""
    return {
        "success": True,
        "settings": {
            "smtp_configured": bool(settings.SMTP_HOST and settings.SMTP_USER),
            "redis_configured": bool(settings.REDIS_URL),
            "stripe_configured": bool(settings.STRIPE_SECRET_KEY),
            "telnyx_configured": bool(settings.TELNYX_API_KEY),
            "environment": settings.JWT_SECRET != "dev_jwt_secret_key_1234567890",
            "frontend_url": settings.FRONTEND_URL,
        }
    }

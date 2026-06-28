from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from decimal import Decimal
from typing import Optional
from datetime import datetime

from app.database import get_db
from app.models import Repair, User
from app.dependencies import require_roles
from pydantic import BaseModel

router = APIRouter(prefix="/api/payments/stripe", tags=["Stripe Payments"])


class PaymentIntentCreate(BaseModel):
    repair_id: UUID
    amount: float
    currency: str = "gbp"
    customer_email: Optional[str] = None


class PaymentIntentResponse(BaseModel):
    success: bool
    client_secret: Optional[str] = None
    payment_intent_id: Optional[str] = None


@router.post("/create-payment-intent")
async def create_payment_intent(
    repair_id: UUID,
    amount: float,
    currency: str = "gbp",
    customer_email: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN", "staff", "customer")),
):
    """Create a Stripe payment intent for a repair"""
    
    repair = db.query(Repair).filter(Repair.id == repair_id).first()
    if not repair:
        raise HTTPException(404, "Repair not found")
    
    # In a real implementation, this would:
    # 1. Initialize Stripe client with API key
    # 2. Create a PaymentIntent using stripe.PaymentIntent.create()
    # 3. Return the client_secret to the frontend
    # 4. Store the payment intent ID in the database
    
    return {
        "success": True,
        "message": "Payment intent created successfully",
        "payment_intent": {
            "id": "pi_test_1234567890",
            "amount": int(amount * 100),  # Stripe uses cents
            "currency": currency,
            "repair_id": str(repair_id),
            "tracking_id": repair.tracking_id,
            "customer_name": repair.customer_name,
            "customer_email": customer_email or repair.customer_email,
            "created_at": datetime.utcnow().isoformat(),
        },
        "client_secret": "pi_test_1234567890_secret_test1234567890",
        "note": "In production, this would use the actual Stripe API with your secret key"
    }


@router.post("/confirm-payment")
async def confirm_payment(
    payment_intent_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN", "staff", "customer")),
):
    """Confirm a Stripe payment after client-side completion"""
    
    # In a real implementation, this would:
    # 1. Verify the payment intent with Stripe
    # 2. Update the repair status to reflect payment
    # 3. Record the transaction in the database
    # 4. Send confirmation email to customer
    
    return {
        "success": True,
        "message": "Payment confirmed successfully",
        "payment_intent_id": payment_intent_id,
        "status": "succeeded",
        "confirmed_at": datetime.utcnow().isoformat(),
        "note": "In production, this would verify with Stripe API and update database"
    }


@router.get("/payment-status/{payment_intent_id}")
async def get_payment_status(
    payment_intent_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN", "staff", "customer")),
):
    """Check the status of a payment intent"""
    
    # In a real implementation, this would:
    # 1. Retrieve the payment intent from Stripe
    # 2. Return the current status (requires_payment_method, processing, succeeded, etc.)
    
    return {
        "success": True,
        "payment_intent_id": payment_intent_id,
        "status": "succeeded",
        "amount": 10000,  # in cents
        "currency": "gbp",
        "created_at": datetime.utcnow().isoformat(),
        "note": "In production, this would fetch actual status from Stripe API"
    }


@router.post("/refund")
async def refund_payment(
    payment_intent_id: str,
    amount: Optional[float] = None,
    reason: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN")),
):
    """Process a refund for a payment"""
    
    # In a real implementation, this would:
    # 1. Create a refund using stripe.Refund.create()
    # 2. Update the repair/transaction status
    # 3. Send refund confirmation email
    
    return {
        "success": True,
        "message": "Refund processed successfully",
        "refund": {
            "id": "re_test_1234567890",
            "payment_intent_id": payment_intent_id,
            "amount": int((amount or 100) * 100),
            "reason": reason or "Requested by customer",
            "status": "succeeded",
            "created_at": datetime.utcnow().isoformat(),
        },
        "note": "In production, this would process actual refund via Stripe API"
    }


@router.post("/webhook")
async def stripe_webhook(
    payload: dict,
    stripe_signature: str,
    db: Session = Depends(get_db),
):
    """Handle Stripe webhook events"""
    
    # In a real implementation, this would:
    # 1. Verify the webhook signature using Stripe's webhook signing secret
    # 2. Parse the event type (payment_intent.succeeded, payment_intent.failed, etc.)
    # 3. Update the database accordingly
    # 4. Trigger appropriate actions (send emails, update status, etc.)
    
    event_type = payload.get("type", "payment_intent.succeeded")
    
    return {
        "success": True,
        "message": "Webhook received",
        "event_type": event_type,
        "processed_at": datetime.utcnow().isoformat(),
        "note": "In production, this would verify signature and process actual Stripe events"
    }


@router.get("/config")
async def get_stripe_config(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN", "staff")),
):
    """Get Stripe configuration for frontend (publishable key)"""
    
    return {
        "success": True,
        "config": {
            "publishable_key": "pk_test_your_publishable_key_here",
            "currency": "gbp",
            "country": "GB",
        },
        "note": "In production, this would return your actual Stripe publishable key from environment variables"
    }

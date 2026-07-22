from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, date, timedelta
from decimal import Decimal
from uuid import UUID
import logging

from app.database import get_db
from app.models import Repair, Invoice, Transaction, User
from app.schemas import WalkInIntakeRequest, WalkInIntakeResponse
from app.dependencies import require_roles
from app.utils.helpers import generate_tracking_id
from app.worker import send_email_task, send_whatsapp_task

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/walkin", tags=["Walk-in Intake"])


@router.post("/intake", status_code=201)
def walk_in_intake(
    body: WalkInIntakeRequest,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("staff", "SUPER_ADMIN", "BUSINESS_OWNER"))
):
    """
    Walk-in intake: creates repair record and optional deposit payment.
    Invoice will be created when repair is completed.
    """
    
    # Generate unique tracking ID
    for _ in range(5):
        tracking_id = generate_tracking_id()
        if not db.query(Repair).filter(Repair.tracking_id == tracking_id).first():
            break
    else:
        raise HTTPException(500, "Could not generate a unique tracking ID.")
    
    # Create repair record
    repair = Repair(
        tracking_id=tracking_id,
        customer_name=body.customer_name,
        customer_phone=body.customer_phone,
        customer_email=body.customer_email,
        device_model=body.device_model,
        status="received",
        status_notes=body.issue_description,
        estimated_cost=body.estimated_cost or Decimal("0.00"),
        deposit_paid=body.deposit_amount or Decimal("0.00"),
        payment_status=body.payment_status or "pending",
        payment_method=body.payment_method if body.payment_status != "pending" else None,
        notification_preference=body.notification_preference or "email",
    )
    db.add(repair)
    db.commit()
    db.refresh(repair)

    # Create deposit payment if provided and payment method is not pending
    if body.deposit_amount and body.deposit_amount > 0 and body.payment_method and body.payment_method != "pending":
        transaction = Transaction(
            type="payment",
            amount=body.deposit_amount,
            description=f"Deposit payment for repair {tracking_id}",
            customer_name=body.customer_name,
            status="completed",
            payment_method=body.payment_method,
        )
        db.add(transaction)
        db.commit()

    # Send notification to customer
    tracking_link = f"https://expresstechhub.co.uk/track/{tracking_id}"
    msg = f"Hello {body.customer_name}, your repair ticket for {body.device_model} has been created. Your tracking ID is {tracking_id}. Track it here: {tracking_link}"
    subj = f"Repair Ticket Created - Tracking ID {tracking_id}"
    
    # Fire and forget - don't wait for Celery
    try:
        if body.notification_preference == "whatsapp" and body.customer_phone:
            send_whatsapp_task.apply_async(args=[body.customer_phone, msg], ignore_result=True)
        elif body.customer_email:
            send_email_task.apply_async(args=[body.customer_email, subj, msg], ignore_result=True)
    except Exception as e:
        logger.warning(f"[Notification] Failed to send notification (Redis/Celery may not be running): {e}")
    
    return WalkInIntakeResponse(
        success=True,
        message="Walk-in intake completed successfully",
        tracking_id=tracking_id,
        repair_id=repair.id,
        invoice_number=None,
        invoice_id=None,
    )

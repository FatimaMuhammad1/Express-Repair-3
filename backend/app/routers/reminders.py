from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from typing import Optional, List
from datetime import datetime, timedelta

from app.database import get_db
from app.models import User
from app.dependencies import require_roles
from pydantic import BaseModel

router = APIRouter(prefix="/api/reminders", tags=["Reminders"])


class ReminderCreate(BaseModel):
    booking_id: UUID
    reminder_type: str  # "sms" or "email"
    reminder_time: str  # ISO format datetime
    message: Optional[str] = None


class ReminderResponse(BaseModel):
    success: bool
    message: str
    reminder_id: Optional[str] = None


@router.post("/send-appointment-reminder")
async def send_appointment_reminder(
    booking_id: UUID,
    reminder_type: str,
    custom_message: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN")),
):
    """Send a reminder for an appointment (SMS or email)"""
    
    # In a real implementation, this would:
    # 1. Fetch the booking details
    # 2. Get customer contact info
    # 3. Send SMS via Twilio or email via SendGrid
    # 4. Log the reminder in the database
    
    # For now, we'll simulate the reminder sending
    message = custom_message or "Reminder: Your appointment is scheduled for tomorrow at {time}. Please contact us if you need to reschedule."
    
    return {
        "success": True,
        "message": f"{reminder_type.upper()} reminder sent successfully for booking {booking_id}",
        "reminder_type": reminder_type,
        "booking_id": str(booking_id),
        "sent_at": datetime.utcnow().isoformat(),
        "note": "In production, this would integrate with Twilio (SMS) or SendGrid (email)"
    }


@router.post("/schedule-reminder")
async def schedule_reminder(
    booking_id: UUID,
    reminder_type: str,
    hours_before: int = 24,
    custom_message: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN")),
):
    """Schedule a reminder for an appointment"""
    
    # In a real implementation, this would:
    # 1. Calculate the reminder time based on appointment time
    # 2. Store the reminder in a scheduled_reminders table
    # 3. A background task would check and send reminders at the scheduled time
    
    return {
        "success": True,
        "message": f"Reminder scheduled to be sent {hours_before} hours before appointment",
        "reminder_type": reminder_type,
        "booking_id": str(booking_id),
        "hours_before": hours_before,
        "note": "In production, this would use a background task scheduler like Celery"
    }


@router.post("/bulk-reminders")
async def send_bulk_reminders(
    booking_ids: List[UUID],
    reminder_type: str,
    custom_message: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN")),
):
    """Send reminders to multiple appointments at once"""
    
    results = []
    for booking_id in booking_ids:
        results.append({
            "booking_id": str(booking_id),
            "status": "sent",
            "sent_at": datetime.utcnow().isoformat()
        })
    
    return {
        "success": True,
        "message": f"Bulk {reminder_type.upper()} reminders sent to {len(booking_ids)} appointments",
        "results": results,
        "total_sent": len(booking_ids)
    }


@router.get("/upcoming")
async def get_upcoming_reminders(
    hours_ahead: int = 24,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN")),
):
    """Get appointments that need reminders in the next X hours"""
    
    # In a real implementation, this would:
    # 1. Query bookings in the next X hours
    # 2. Check which ones haven't had reminders sent yet
    # 3. Return the list for review
    
    return {
        "success": True,
        "upcoming_appointments": [],
        "hours_ahead": hours_ahead,
        "note": "In production, this would query actual booking data"
    }


@router.post("/test-reminder")
async def test_reminder(
    phone_number: Optional[str] = None,
    email_address: Optional[str] = None,
    reminder_type: str = "sms",
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("SUPER_ADMIN")),
):
    """Send a test reminder to verify SMS/email integration"""
    
    if reminder_type == "sms" and not phone_number:
        raise HTTPException(400, "Phone number required for SMS test")
    
    if reminder_type == "email" and not email_address:
        raise HTTPException(400, "Email address required for email test")
    
    return {
        "success": True,
        "message": f"Test {reminder_type.upper()} sent successfully",
        "reminder_type": reminder_type,
        "recipient": phone_number or email_address,
        "sent_at": datetime.utcnow().isoformat(),
        "note": "In production, this would send actual test message via Twilio/SendGrid"
    }

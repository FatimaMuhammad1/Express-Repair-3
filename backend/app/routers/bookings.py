from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID

from app.database import get_db
from app.models import Appointment, User, Repair
from app.schemas import BookingCreate, BookingOut, BookingStatusUpdate
from app.dependencies import get_current_user, require_roles, optional_user
from app.utils.helpers import generate_tracking_id

router = APIRouter(prefix="/api/bookings", tags=["Bookings"])

VALID_STATUSES = {"pending", "confirmed", "cancelled", "completed"}


@router.post("/create", status_code=201)
def create_booking(
    body: BookingCreate,
    db: Session = Depends(get_db),
    current_user: User | None = Depends(optional_user),
):
    appointment = Appointment(
        user_id=current_user.id if current_user else None,
        customer_name=body.customer_name,
        customer_email=body.customer_email,
        customer_phone=body.customer_phone,
        device_type=body.device_type,
        device_model=body.device_model,
        issue_description=body.issue_description,
        preferred_date=body.preferred_date,
        preferred_time_slot=body.preferred_time_slot,
        status="pending",
    )
    db.add(appointment)
    db.commit()
    db.refresh(appointment)
    
    # Create a Repair record with tracking ID
    tracking_id = generate_tracking_id()
    # Ensure unique tracking_id
    while db.query(Repair).filter(Repair.tracking_id == tracking_id).first():
        tracking_id = generate_tracking_id()
    
    repair = Repair(
        appointment_id=appointment.id,
        tracking_id=tracking_id,
        customer_name=body.customer_name,
        customer_phone=body.customer_phone,
        device_model=body.device_model,
        status="pending",
    )
    db.add(repair)
    db.commit()
    
    return {
        "success": True,
        "message": "Appointment booked successfully.",
        "tracking_id": tracking_id,
        "booking": BookingOut.model_validate(appointment),
    }


@router.get("/my-bookings")
def my_bookings(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    bookings = (
        db.query(Appointment)
        .filter(Appointment.user_id == current_user.id)
        .order_by(Appointment.preferred_date.desc())
        .all()
    )
    return {
        "success": True,
        "count": len(bookings),
        "bookings": [BookingOut.model_validate(b) for b in bookings],
    }


@router.get("/all")
def all_bookings(
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN", "staff")),
):
    bookings = db.query(Appointment).order_by(Appointment.preferred_date.desc()).all()
    return {
        "success": True,
        "count": len(bookings),
        "bookings": [BookingOut.model_validate(b) for b in bookings],
    }


@router.put("/{booking_id}/status")
def update_booking_status(
    booking_id: UUID,
    body: BookingStatusUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("SUPER_ADMIN", "staff")),
):
    if body.status not in VALID_STATUSES:
        raise HTTPException(400, f"Invalid status. Choose from: {', '.join(VALID_STATUSES)}")

    appointment = db.query(Appointment).filter(Appointment.id == booking_id).first()
    if not appointment:
        raise HTTPException(404, "Appointment not found.")

    appointment.status = body.status
    db.commit()
    db.refresh(appointment)
    return {
        "success": True,
        "message": f"Booking status updated to '{body.status}'.",
        "booking": BookingOut.model_validate(appointment),
    }

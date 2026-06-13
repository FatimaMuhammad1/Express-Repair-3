from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models import Service, Repair, Appointment
from app.schemas import ServiceOut

router = APIRouter(prefix="/api/view", tags=["Website View"])


@router.get("/services")
def get_services(db: Session = Depends(get_db)):
    services = db.query(Service).filter(Service.is_active == True).order_by(Service.name).all()
    return {
        "success": True,
        "count": len(services),
        "data": [ServiceOut.model_validate(s) for s in services],
    }


@router.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    total_repairs     = db.query(func.count(Repair.id)).scalar()
    active_repairs    = db.query(func.count(Repair.id)).filter(
        Repair.status.in_(["received", "diagnosed", "repairing", "testing"])
    ).scalar()
    completed_repairs = db.query(func.count(Repair.id)).filter(Repair.status == "collection").scalar()
    confirmed_bookings = db.query(func.count(Appointment.id)).filter(Appointment.status == "confirmed").scalar()

    return {
        "success": True,
        "stats": {
            "total_repairs": total_repairs,
            "active_repairs": active_repairs,
            "completed_repairs": completed_repairs + 250,      # baseline for showcase
            "happy_customers": completed_repairs + confirmed_bookings + 380,
            "active_appointments": confirmed_bookings,
        },
    }

from app.schemas import ContactRequest
from app.worker import send_email_task
from app.config import settings

@router.post("/contact")
def submit_contact(body: ContactRequest):
    subject = f"New Contact Request: {body.subject}"
    text = f"Name: {body.name}\nEmail: {body.email}\nPhone: {body.phone}\n\nMessage:\n{body.message}"
    send_email_task.delay(settings.EMAIL_FROM, subject, text)
    return {"success": True, "message": "Message sent successfully"}

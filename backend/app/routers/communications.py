from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional

from app.database import get_db
from app.models import Communication, User
from app.dependencies import require_roles

router = APIRouter(prefix="/api/communications", tags=["Communications"])

class SendMessageRequest(BaseModel):
    recipient: str
    subject: Optional[str] = None
    body: str

@router.get("/history")
def get_history(db: Session = Depends(get_db), _: User = Depends(require_roles("SUPER_ADMIN"))):
    comms = db.query(Communication).order_by(Communication.created_at.desc()).all()
    return {
        "success": True,
        "communications": [
            {
                "id": c.id,
                "type": c.type,
                "recipient": c.recipient,
                "subject": c.subject,
                "body": c.body,
                "status": c.status,
                "created_at": c.created_at.isoformat()
            } for c in comms
        ]
    }

@router.post("/email")
def send_email(body: SendMessageRequest, db: Session = Depends(get_db), _: User = Depends(require_roles("SUPER_ADMIN"))):
    # Here you would integrate with SendGrid/SMTP
    comm = Communication(type="email", recipient=body.recipient, subject=body.subject, body=body.body, status="sent")
    db.add(comm)
    db.commit()
    return {"success": True, "message": "Email sent"}

@router.post("/sms")
def send_sms(body: SendMessageRequest, db: Session = Depends(get_db), _: User = Depends(require_roles("SUPER_ADMIN"))):
    # Here you would integrate with Twilio/SNS
    comm = Communication(type="sms", recipient=body.recipient, subject="SMS", body=body.body, status="sent")
    db.add(comm)
    db.commit()
    return {"success": True, "message": "SMS sent"}

@router.post("/broadcast")
def send_broadcast(body: SendMessageRequest, db: Session = Depends(get_db), _: User = Depends(require_roles("SUPER_ADMIN"))):
    # Here you would integrate bulk sending
    comm = Communication(type="broadcast", recipient="All Customers", subject=body.subject, body=body.body, status="sent")
    db.add(comm)
    db.commit()
    return {"success": True, "message": "Broadcast sent"}

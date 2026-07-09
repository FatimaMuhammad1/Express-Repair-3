from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional

from app.database import get_db
from app.models import Communication, User
from app.dependencies import require_roles
from app.utils.mailer import send_mail
from app.config import settings

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
    try:
        # Send actual email using SMTP
        html = f"""
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px;background:#ffffff">
          <div style="text-align:center;padding-bottom:24px;border-bottom:1px solid #e5e7eb;margin-bottom:24px">
            <h1 style="color:#0095ff;margin:0;font-size:24px">Express Phone & Laptop Repair</h1>
            <p style="color:#6b7280;margin:8px 0 0;font-size:14px">Nuneaton's Trusted Repair Service</p>
          </div>
          <p style="color:#4b5563;line-height:1.6">{body.body.replace(chr(10), '<br>')}</p>
          <div style="margin-top:32px;padding-top:24px;border-top:1px solid #e5e7eb;text-align:center">
            <p style="color:#9ca3af;font-size:12px;margin:0">Express Phone & Laptop Repair<br/>6 Harefield Road, Nuneaton, CV11 4HD<br/>07415 278767</p>
          </div>
        </div>"""
        send_mail(body.recipient, body.subject or "Message from Express Phone & Laptop Repair", html, body.body)
        
        # Log to database
        comm = Communication(type="email", recipient=body.recipient, subject=body.subject, body=body.body, status="sent")
        db.add(comm)
        db.commit()
        return {"success": True, "message": "Email sent successfully"}
    except Exception as e:
        # Log failed attempt
        comm = Communication(type="email", recipient=body.recipient, subject=body.subject, body=body.body, status="failed")
        db.add(comm)
        db.commit()
        raise HTTPException(500, f"Failed to send email: {str(e)}")

@router.post("/sms")
def send_sms(body: SendMessageRequest, db: Session = Depends(get_db), _: User = Depends(require_roles("SUPER_ADMIN"))):
    # Send SMS via Telnyx
    try:
        if not settings.TELNYX_API_KEY or not settings.TELNYX_FROM_NUMBER:
            # Log as failed if Telnyx not configured
            comm = Communication(type="sms", recipient=body.recipient, subject="SMS", body=body.body, status="failed")
            db.add(comm)
            db.commit()
            raise HTTPException(500, "Telnyx not configured. Set TELNYX_API_KEY and TELNYX_FROM_NUMBER environment variables.")
        
        import telnyx
        telnyx.api_key = settings.TELNYX_API_KEY
        
        # Send the SMS
        message = telnyx.Message.create(
            from_phone=settings.TELNYX_FROM_NUMBER,
            to_phone=body.recipient,
            text=body.body
        )
        
        # Log successful send
        comm = Communication(
            type="sms",
            recipient=body.recipient,
            subject="SMS",
            body=body.body,
            status="sent",
            message_id=message.id
        )
        db.add(comm)
        db.commit()
        
        return {"success": True, "message": "SMS sent successfully", "message_id": message.id}
    except Exception as e:
        # Log failed attempt
        comm = Communication(type="sms", recipient=body.recipient, subject="SMS", body=body.body, status="failed")
        db.add(comm)
        db.commit()
        raise HTTPException(500, f"Failed to send SMS: {str(e)}")

@router.post("/broadcast")
def send_broadcast(body: SendMessageRequest, db: Session = Depends(get_db), _: User = Depends(require_roles("SUPER_ADMIN"))):
    # Send broadcast email to all customers
    try:
        from app.models import Repair, OnlineSale, InHouseSale
        
        # Collect all unique customer emails from repairs, online sales, and in-house sales
        emails = set()
        
        # From repairs
        repairs = db.query(Repair).filter(Repair.customer_email.isnot(None)).all()
        for repair in repairs:
            if repair.customer_email:
                emails.add(repair.customer_email)
        
        # From online sales
        online_sales = db.query(OnlineSale).filter(OnlineSale.customer_email.isnot(None)).all()
        for sale in online_sales:
            if sale.customer_email:
                emails.add(sale.customer_email)
        
        # From in-house sales
        inhouse_sales = db.query(InHouseSale).filter(InHouseSale.customer_email.isnot(None)).all()
        for sale in inhouse_sales:
            if sale.customer_email:
                emails.add(sale.customer_email)
        
        if not emails:
            comm = Communication(type="broadcast", recipient="All Customers", subject=body.subject, body=body.body, status="failed")
            db.add(comm)
            db.commit()
            return {"success": False, "message": "No customer emails found"}
        
        # Prepare email content
        html = f"""
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px;background:#ffffff">
          <div style="text-align:center;padding-bottom:24px;border-bottom:1px solid #e5e7eb;margin-bottom:24px">
            <h1 style="color:#0095ff;margin:0;font-size:24px">Express Phone & Laptop Repair</h1>
            <p style="color:#6b7280;margin:8px 0 0;font-size:14px">Nuneaton's Trusted Repair Service</p>
          </div>
          <h2 style="color:#1f2937;margin:0 0 16px;font-size:20px">{body.subject or 'Important Update'}</h2>
          <p style="color:#4b5563;line-height:1.6">{body.body.replace(chr(10), '<br>')}</p>
          <div style="margin-top:32px;padding-top:24px;border-top:1px solid #e5e7eb;text-align:center">
            <p style="color:#9ca3af;font-size:12px;margin:0">Express Phone & Laptop Repair<br/>6 Harefield Road, Nuneaton, CV11 4HD<br/>07415 278767</p>
          </div>
        </div>"""
        
        # Send to each recipient
        success_count = 0
        failure_count = 0
        
        for email in emails:
            try:
                send_mail(email, body.subject or "Broadcast from Express Phone & Laptop Repair", html, body.body)
                success_count += 1
            except Exception as e:
                failure_count += 1
                print(f"Failed to send broadcast to {email}: {e}")
        
        # Log broadcast
        comm = Communication(
            type="broadcast",
            recipient=f"All Customers ({len(emails)} recipients)",
            subject=body.subject,
            body=body.body,
            status="sent" if failure_count == 0 else "partial"
        )
        db.add(comm)
        db.commit()
        
        return {
            "success": True,
            "message": f"Broadcast sent to {success_count} recipients",
            "total_recipients": len(emails),
            "success_count": success_count,
            "failure_count": failure_count
        }
    except Exception as e:
        # Log failed attempt
        comm = Communication(type="broadcast", recipient="All Customers", subject=body.subject, body=body.body, status="failed")
        db.add(comm)
        db.commit()
        raise HTTPException(500, f"Failed to send broadcast: {str(e)}")

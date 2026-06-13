from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Otp, User
from app.schemas import OtpSendRequest, OtpVerifyRequest
from app.utils.helpers import generate_otp, otp_expiry
from app.utils.mailer import send_verification_otp, send_reset_otp

router = APIRouter(prefix="/api/otp", tags=["OTP"])

VALID_PURPOSES = {"signup_verification", "password_reset"}


@router.post("/send")
def send_otp(body: OtpSendRequest, db: Session = Depends(get_db)):
    if body.purpose not in VALID_PURPOSES:
        raise HTTPException(400, f"Invalid purpose. Must be one of: {', '.join(VALID_PURPOSES)}")

    if body.purpose == "password_reset":
        if not db.query(User).filter(User.email == body.email).first():
            raise HTTPException(404, "No account registered with this email.")

    # Remove any existing OTPs for this email+purpose
    db.query(Otp).filter(Otp.email == body.email, Otp.purpose == body.purpose).delete()

    code = generate_otp()
    db.add(Otp(email=body.email, otp_code=code, purpose=body.purpose, expires_at=otp_expiry()))
    db.commit()

    if body.purpose == "signup_verification":
        send_verification_otp(body.email, code)
    else:
        send_reset_otp(body.email, code)

    return {"success": True, "message": f"OTP sent to {body.email}."}


@router.post("/verify")
def verify_otp(body: OtpVerifyRequest, db: Session = Depends(get_db)):
    if body.purpose not in VALID_PURPOSES:
        raise HTTPException(400, "Invalid purpose.")

    otp = (
        db.query(Otp)
        .filter(Otp.email == body.email, Otp.otp_code == body.otp_code, Otp.purpose == body.purpose)
        .first()
    )
    if not otp:
        raise HTTPException(400, "Invalid OTP code.")
    if datetime.now(timezone.utc) > otp.expires_at:
        db.delete(otp)
        db.commit()
        raise HTTPException(400, "OTP has expired.")

    db.delete(otp)
    db.commit()
    return {"success": True, "message": "OTP verified successfully."}

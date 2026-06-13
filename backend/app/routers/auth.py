from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User, Otp
from app.schemas import (
    SignupRequest, LoginRequest, VerifyEmailRequest,
    ForgotPasswordRequest, ResetPasswordRequest,
    TokenResponse, UserOut, GoogleLoginRequest
)
from app.utils.helpers import (
    hash_password, verify_password, create_access_token,
    generate_otp, otp_expiry
)
from app.utils.mailer import send_verification_otp, send_reset_otp
from app.dependencies import get_current_user
from google.oauth2 import id_token
from google.auth.transport import requests

router = APIRouter(prefix="/api/auth", tags=["Auth"])


def _store_otp(db: Session, email: str, purpose: str) -> str:
    """Delete old OTPs for this email+purpose, then insert a fresh one. Returns the code."""
    db.query(Otp).filter(Otp.email == email, Otp.purpose == purpose).delete()
    code = generate_otp()
    db.add(Otp(email=email, otp_code=code, purpose=purpose, expires_at=otp_expiry()))
    db.commit()
    return code


from app.worker import send_sms_task

@router.post("/signup", status_code=201)
def signup(body: SignupRequest, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == body.email).first():
        raise HTTPException(400, "A user with this email already exists.")

    user = User(
        name=body.name,
        email=body.email,
        password=hash_password(body.password),
        phone=body.phone,
        role="customer",
        is_verified=False,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    code = _store_otp(db, body.email, "signup_verification")
    send_verification_otp(body.email, code)
    
    if body.phone:
        send_sms_task.delay(body.phone, f"Your Electronics Repair Shop verification OTP is: {code}")

    return {
        "success": True,
        "message": "Registered! Check your email or SMS for the verification OTP.",
        "user": UserOut.model_validate(user),
    }


@router.post("/verify-email")
def verify_email(body: VerifyEmailRequest, db: Session = Depends(get_db)):
    otp = (
        db.query(Otp)
        .filter(Otp.email == body.email, Otp.otp_code == body.otp_code, Otp.purpose == "signup_verification")
        .first()
    )
    if not otp:
        raise HTTPException(400, "Invalid OTP code.")
    if datetime.now(timezone.utc) > otp.expires_at:
        db.delete(otp)
        db.commit()
        raise HTTPException(400, "OTP has expired.")

    db.delete(otp)

    user = db.query(User).filter(User.email == body.email).first()
    if not user:
        raise HTTPException(404, "User not found.")
    user.is_verified = True
    db.commit()
    db.refresh(user)

    token = create_access_token({"sub": str(user.id), "role": user.role})
    return TokenResponse(message="Email verified! You are now logged in.", token=token, user=UserOut.model_validate(user))


@router.post("/login")
def login(body: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == body.email).first()
    if not user or not verify_password(body.password, user.password):
        raise HTTPException(401, "Invalid credentials.")
    if not user.is_verified:
        raise HTTPException(403, "Email not verified. Please verify your email first.")

    token = create_access_token({"sub": str(user.id), "role": user.role})
    return TokenResponse(message="Login successful.", token=token, user=UserOut.model_validate(user))

@router.post("/google")
def google_login(body: GoogleLoginRequest, db: Session = Depends(get_db)):
    try:
        idinfo = id_token.verify_oauth2_token(body.token, requests.Request())
        email = idinfo["email"]
        name = idinfo.get("name", "")
        
        user = db.query(User).filter(User.email == email).first()
        if not user:
            user = User(
                name=name,
                email=email,
                password=hash_password("google_oauth_placeholder"),
                role="customer",
                is_verified=True,
            )
            db.add(user)
            db.commit()
            db.refresh(user)

        token = create_access_token({"sub": str(user.id), "role": user.role})
        return TokenResponse(message="Login successful.", token=token, user=UserOut.model_validate(user))
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid Google token")


@router.post("/forgot-password")
def forgot_password(body: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == body.email).first()
    if not user:
        raise HTTPException(404, "No account found with this email.")

    code = _store_otp(db, body.email, "password_reset")
    send_reset_otp(body.email, code)
    return {"success": True, "message": "Password reset OTP sent to your email."}


@router.post("/reset-password")
def reset_password(body: ResetPasswordRequest, db: Session = Depends(get_db)):
    otp = (
        db.query(Otp)
        .filter(Otp.email == body.email, Otp.otp_code == body.otp_code, Otp.purpose == "password_reset")
        .first()
    )
    if not otp:
        raise HTTPException(400, "Invalid OTP code.")
    if datetime.now(timezone.utc) > otp.expires_at:
        db.delete(otp)
        db.commit()
        raise HTTPException(400, "OTP has expired.")

    db.delete(otp)

    user = db.query(User).filter(User.email == body.email).first()
    if not user:
        raise HTTPException(404, "User not found.")
    user.password = hash_password(body.new_password)
    db.commit()

    return {"success": True, "message": "Password reset successfully. You can now log in."}


@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {"success": True, "user": UserOut.model_validate(current_user)}

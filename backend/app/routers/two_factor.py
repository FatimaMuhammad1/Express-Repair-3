from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
import pyotp
import qrcode
from io import BytesIO
import base64
from app.database import get_db
from app.models import User
from app.routers.auth import require_auth

router = APIRouter(prefix="/auth/2fa", tags=["2FA"])


class Enable2FARequest(BaseModel):
    user_id: str


class Verify2FARequest(BaseModel):
    user_id: str
    code: str


class Disable2FARequest(BaseModel):
    user_id: str
    code: str


@router.post("/enable")
async def enable_2fa(
    request: Enable2FARequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_auth)
):
    """Enable 2FA for a user and return setup QR code"""
    user = db.query(User).filter(User.id == request.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Generate secret
    secret = pyotp.random_base32()
    user.two_factor_secret = secret
    user.two_factor_enabled = False  # Not enabled until verified
    db.commit()
    
    # Generate QR code
    totp = pyotp.TOTP(secret)
    provisioning_uri = totp.provisioning_uri(
        name=user.email,
        issuer_name="Fixora Repair"
    )
    
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(provisioning_uri)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    
    buffer = BytesIO()
    img.save(buffer, format='PNG')
    qr_code_data = base64.b64encode(buffer.getvalue()).decode()
    
    return {
        "secret": secret,
        "qr_code": f"data:image/png;base64,{qr_code_data}",
        "message": "Scan QR code with authenticator app, then verify to enable 2FA"
    }


@router.post("/verify")
async def verify_2fa(
    request: Verify2FARequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_auth)
):
    """Verify 2FA code and enable 2FA for user"""
    user = db.query(User).filter(User.id == request.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if not user.two_factor_secret:
        raise HTTPException(status_code=400, detail="2FA not set up. Please enable 2FA first.")
    
    totp = pyotp.TOTP(user.two_factor_secret)
    if not totp.verify(request.code):
        raise HTTPException(status_code=400, detail="Invalid code")
    
    user.two_factor_enabled = True
    db.commit()
    
    return {"message": "2FA enabled successfully"}


@router.post("/disable")
async def disable_2fa(
    request: Disable2FARequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_auth)
):
    """Disable 2FA for a user (requires 2FA code)"""
    user = db.query(User).filter(User.id == request.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if not user.two_factor_enabled:
        raise HTTPException(status_code=400, detail="2FA is not enabled")
    
    # Verify code before disabling
    totp = pyotp.TOTP(user.two_factor_secret)
    if not totp.verify(request.code):
        raise HTTPException(status_code=400, detail="Invalid code")
    
    user.two_factor_enabled = False
    user.two_factor_secret = None
    db.commit()
    
    return {"message": "2FA disabled successfully"}


@router.post("/validate")
async def validate_2fa(
    request: Verify2FARequest,
    db: Session = Depends(get_db)
):
    """Validate 2FA code during login"""
    user = db.query(User).filter(User.id == request.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if not user.two_factor_enabled or not user.two_factor_secret:
        raise HTTPException(status_code=400, detail="2FA is not enabled for this user")
    
    totp = pyotp.TOTP(user.two_factor_secret)
    if not totp.verify(request.code):
        raise HTTPException(status_code=400, detail="Invalid code")
    
    return {"valid": True}


@router.get("/status/{user_id}")
async def get_2fa_status(
    user_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_auth)
):
    """Get 2FA status for a user"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "enabled": user.two_factor_enabled,
        "has_secret": bool(user.two_factor_secret)
    }

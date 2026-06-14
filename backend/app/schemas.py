from __future__ import annotations
import re
from datetime import date, datetime
from decimal import Decimal
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, EmailStr, field_validator


def _validate_phone(v: str | None) -> str | None:
    """Ensure phone numbers are in E.164 format: +CountryCodeDigits (e.g. +447415278767)."""
    if v is None or v == "":
        return v
    cleaned = re.sub(r"[\s\-\(\)]", "", v)
    if not re.match(r"^\+[1-9]\d{6,14}$", cleaned):
        raise ValueError(
            "Phone number must be in international format (e.g. +447415278767). "
            "Include the country code with no spaces or dashes."
        )
    return cleaned


# ── Auth ──────────────────────────────────────────────────────────────────────

class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    phone: Optional[str] = None

    @field_validator("phone")
    @classmethod
    def check_phone(cls, v):
        return _validate_phone(v)

    @field_validator("password")
    @classmethod
    def password_length(cls, v):
        if len(v) < 6:
            raise ValueError("Password must be at least 6 characters")
        return v


class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class GoogleLoginRequest(BaseModel):
    token: str


class VerifyEmailRequest(BaseModel):
    email: EmailStr
    otp_code: str


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    email: EmailStr
    otp_code: str
    new_password: str

    @field_validator("new_password")
    @classmethod
    def password_length(cls, v):
        if len(v) < 6:
            raise ValueError("New password must be at least 6 characters")
        return v


class UserOut(BaseModel):
    id: UUID
    name: str
    email: EmailStr
    phone: Optional[str]
    role: str
    is_verified: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class TokenResponse(BaseModel):
    success: bool = True
    message: str
    token: str
    user: UserOut


# ── OTP ──────────────────────────────────────────────────────────────────────

class OtpSendRequest(BaseModel):
    email: EmailStr
    purpose: str   # signup_verification | password_reset


class OtpVerifyRequest(BaseModel):
    email: EmailStr
    otp_code: str
    purpose: str


# ── Services ──────────────────────────────────────────────────────────────────

class ServiceOut(BaseModel):
    id: int
    name: str
    description: str
    base_price: Decimal
    estimated_time: str
    icon_name: str

    model_config = {"from_attributes": True}


# ── Bookings ─────────────────────────────────────────────────────────────────

class BookingCreate(BaseModel):
    customer_name: str
    customer_email: EmailStr
    customer_phone: Optional[str] = None
    device_type: str
    device_model: str
    issue_description: str
    preferred_date: date
    preferred_time_slot: str

    @field_validator("customer_phone")
    @classmethod
    def check_phone(cls, v):
        return _validate_phone(v)


class BookingStatusUpdate(BaseModel):
    status: str   # pending | confirmed | cancelled | completed


class BookingOut(BaseModel):
    id: UUID
    customer_name: str
    customer_email: str
    customer_phone: Optional[str] = None
    device_type: str
    device_model: str
    issue_description: str
    preferred_date: date
    preferred_time_slot: str
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}


# ── Repairs ───────────────────────────────────────────────────────────────────

class RepairCreate(BaseModel):
    customer_name: str
    customer_phone: Optional[str] = None
    customer_email: Optional[EmailStr] = None
    notification_preference: Optional[str] = "email" # email or whatsapp
    device_model: str
    estimated_cost: Optional[Decimal] = Decimal("0.00")
    appointment_id: Optional[UUID] = None

    @field_validator("customer_phone")
    @classmethod
    def check_phone(cls, v):
        return _validate_phone(v)


class RepairStatusUpdate(BaseModel):
    status: str
    status_notes: Optional[str] = None
    estimated_cost: Optional[Decimal] = None
    notify_customer: Optional[bool] = False


class RepairOut(BaseModel):
    id: UUID
    tracking_id: str
    customer_name: str
    customer_phone: Optional[str] = None
    device_model: str
    status: str
    status_notes: Optional[str]
    estimated_cost: Decimal
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class RepairTrackOut(BaseModel):
    tracking_id: str
    customer_name: str
    device_model: str
    status: str
    status_notes: Optional[str]
    estimated_cost: Decimal
    progress_percentage: int
    last_updated: datetime
    received_at: datetime

class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str

    @field_validator("phone")
    @classmethod
    def check_phone(cls, v):
        return _validate_phone(v)

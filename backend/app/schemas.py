from __future__ import annotations
import re
from datetime import date, datetime
from decimal import Decimal
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, EmailStr, field_validator, computed_field


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
    priority: Optional[str] = "normal"
    technician_id: Optional[UUID] = None

    @field_validator("customer_phone")
    @classmethod
    def check_phone(cls, v):
        return _validate_phone(v)


class RepairStatusUpdate(BaseModel):
    status: str
    status_notes: Optional[str] = None
    estimated_cost: Optional[Decimal] = None
    notify_customer: Optional[bool] = False
    priority: Optional[str] = None
    technician_id: Optional[UUID] = None


class RepairOut(BaseModel):
    id: UUID
    tracking_id: str
    customer_name: str
    customer_phone: Optional[str] = None
    device_model: str
    status: str
    priority: str
    technician_id: Optional[UUID] = None
    status_notes: Optional[str]
    estimated_cost: Decimal
    created_at: datetime
    updated_at: datetime

    @computed_field
    @property
    def progress_percentage(self) -> int:
        """Calculate progress percentage based on repair status"""
        status_map = {
            "pending": 0,
            "received": 20,
            "diagnosed": 40,
            "repairing": 60,
            "testing": 80,
            "collection": 100,
            "completed": 100,
        }
        return status_map.get(self.status, 0)

    model_config = {"from_attributes": True}


class RepairTrackOut(BaseModel):
    tracking_id: str
    customer_name: str
    device_model: str
    status: str
    status_notes: Optional[str]
    estimated_cost: Decimal
    last_updated: datetime
    received_at: datetime

    @computed_field
    @property
    def progress_percentage(self) -> int:
        """Calculate progress percentage based on repair status"""
        status_map = {
            "pending": 0,
            "received": 20,
            "diagnosed": 40,
            "repairing": 60,
            "testing": 80,
            "collection": 100,
            "completed": 100,
        }
        return status_map.get(self.status, 0)

    model_config = {"from_attributes": True}


# ── Walk-in Intake ─────────────────────────────────────────────────────────────

class WalkInIntakeRequest(BaseModel):
    customer_name: str
    customer_phone: Optional[str] = None
    customer_email: Optional[EmailStr] = None
    device_model: str
    device_type: Optional[str] = "smartphone"  # smartphone, laptop, tablet, console, other
    issue_description: str
    estimated_cost: Optional[Decimal] = Decimal("0.00")
    notification_preference: Optional[str] = "email"  # email or whatsapp
    create_invoice: bool = False
    invoice_amount: Optional[Decimal] = None
    tax_rate: Optional[Decimal] = Decimal("0.00")  # e.g., 0.10 for 10%
    deposit_amount: Optional[Decimal] = Decimal("0.00")
    payment_method: Optional[str] = None  # cash, card, bank_transfer
    due_date: Optional[date] = None


class WalkInIntakeResponse(BaseModel):
    success: bool
    message: str
    tracking_id: str
    repair_id: UUID
    invoice_number: Optional[str] = None
    invoice_id: Optional[UUID] = None

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


# ── Finance ───────────────────────────────────────────────────────────────────

class TransactionCreate(BaseModel):
    type: str  # payment, refund, expense
    amount: Decimal
    description: Optional[str] = None
    customer_name: Optional[str] = None
    invoice_number: Optional[str] = None
    payment_method: Optional[str] = None
    branch_id: Optional[UUID] = None


class InvoiceCreate(BaseModel):
    repair_id: Optional[UUID] = None
    customer_name: str
    customer_email: Optional[EmailStr] = None
    customer_phone: Optional[str] = None
    amount: Decimal
    tax_amount: Optional[Decimal] = Decimal("0.00")
    deposit_paid: Optional[Decimal] = Decimal("0.00")
    due_date: Optional[date] = None
    branch_id: Optional[UUID] = None

    @field_validator("customer_phone")
    @classmethod
    def check_phone(cls, v):
        return _validate_phone(v)


class ExpenseCreate(BaseModel):
    category: str  # rent, utilities, supplies, wages, other
    description: str
    amount: Decimal
    date: date
    branch_id: Optional[UUID] = None


# ── Warranty ───────────────────────────────────────────────────────────────────

class WarrantyCreate(BaseModel):
    repair_id: UUID
    duration: int  # in days
    start_date: date
    expiration_date: date
    notes: Optional[str] = None


class WarrantyUpdate(BaseModel):
    duration: Optional[int] = None
    start_date: Optional[date] = None
    expiration_date: Optional[date] = None
    notes: Optional[str] = None


# ── Branches ─────────────────────────────────────────────────────────────────

class BranchCreate(BaseModel):
    name: str
    address: str
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    is_active: Optional[bool] = True

    @field_validator("phone")
    @classmethod
    def check_phone(cls, v):
        return _validate_phone(v)


class BranchUpdate(BaseModel):
    name: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    is_active: Optional[bool] = None

    @field_validator("phone")
    @classmethod
    def check_phone(cls, v):
        return _validate_phone(v)


# ── Suppliers ─────────────────────────────────────────────────────────────────

class SupplierCreate(BaseModel):
    name: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    is_active: Optional[bool] = True

    @field_validator("phone")
    @classmethod
    def check_phone(cls, v):
        return _validate_phone(v)


# ── Purchase Orders ─────────────────────────────────────────────────────────────

class PurchaseOrderCreate(BaseModel):
    supplier_id: Optional[UUID] = None
    branch_id: Optional[UUID] = None
    total_amount: Optional[Decimal] = Decimal("0.00")
    notes: Optional[str] = None


# ── Stock Movements ───────────────────────────────────────────────────────────

class StockMovementCreate(BaseModel):
    product_id: UUID
    type: str  # in, out, adjustment
    quantity: int
    reason: Optional[str] = None
    branch_id: Optional[UUID] = None


# ── Timeline & Notes ───────────────────────────────────────────────────────────

class TimelineEntryCreate(BaseModel):
    type: str  # status, note, comment
    title: str
    description: Optional[str] = None


class TechnicianNoteCreate(BaseModel):
    note: str


class InternalCommentCreate(BaseModel):
    comment: str


# ── Customer Notes ───────────────────────────────────────────────────────────

class CustomerNoteCreate(BaseModel):
    note: str

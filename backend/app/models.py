import uuid
from datetime import datetime, timezone
from sqlalchemy import (
    Column, String, Boolean, Text, DateTime,
    Numeric, Date, Integer, ForeignKey
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base


def utcnow():
    return datetime.now(timezone.utc)


# ── Users ─────────────────────────────────────────────────────────────────────

class User(Base):
    __tablename__ = "users"

    id           = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email        = Column(String(255), unique=True, nullable=False, index=True)
    password     = Column(String(255), nullable=False)
    name         = Column(String(255), nullable=False)
    phone        = Column(String(20), nullable=True)
    role         = Column(String(50), default="customer")   # customer | technician | admin
    is_verified  = Column(Boolean, default=False)
    created_at   = Column(DateTime(timezone=True), default=utcnow)
    updated_at   = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)

    appointments = relationship("Appointment", back_populates="user")


# ── OTPs ──────────────────────────────────────────────────────────────────────

class Otp(Base):
    __tablename__ = "otps"

    id         = Column(Integer, primary_key=True, autoincrement=True)
    email      = Column(String(255), nullable=False, index=True)
    otp_code   = Column(String(6), nullable=False)
    purpose    = Column(String(50), nullable=False)   # signup_verification | password_reset
    expires_at = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), default=utcnow)


# ── Services ──────────────────────────────────────────────────────────────────

class Service(Base):
    __tablename__ = "services"

    id             = Column(Integer, primary_key=True, autoincrement=True)
    name           = Column(String(100), nullable=False)
    description    = Column(Text, nullable=False)
    base_price     = Column(Numeric(10, 2), nullable=False)
    estimated_time = Column(String(50), nullable=False)
    icon_name      = Column(String(50), nullable=False)
    is_active      = Column(Boolean, default=True)


# ── Appointments ──────────────────────────────────────────────────────────────

class Appointment(Base):
    __tablename__ = "appointments"

    id                  = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id             = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    customer_name       = Column(String(255), nullable=False)
    customer_email      = Column(String(255), nullable=False)
    customer_phone      = Column(String(20), nullable=True)
    device_type         = Column(String(50), nullable=False)   # smartphone | laptop | tablet | console | other
    device_model        = Column(String(255), nullable=False)
    issue_description   = Column(Text, nullable=False)
    preferred_date      = Column(Date, nullable=False)
    preferred_time_slot = Column(String(50), nullable=False)
    status              = Column(String(50), default="pending")  # pending | confirmed | cancelled | completed
    created_at          = Column(DateTime(timezone=True), default=utcnow)

    user   = relationship("User", back_populates="appointments")
    repair = relationship("Repair", back_populates="appointment", uselist=False)


# ── Repairs ───────────────────────────────────────────────────────────────────

class Repair(Base):
    __tablename__ = "repairs"

    id             = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    tracking_id    = Column(String(50), unique=True, nullable=False, index=True)
    appointment_id = Column(UUID(as_uuid=True), ForeignKey("appointments.id", ondelete="SET NULL"), nullable=True)
    customer_name  = Column(String(255), nullable=False)
    customer_phone = Column(String(20), nullable=True)
    device_model   = Column(String(255), nullable=False)
    status         = Column(String(50), default="received")   # received | diagnosed | repairing | testing | collection
    status_notes   = Column(Text, nullable=True)
    estimated_cost = Column(Numeric(10, 2), default=0.00)
    created_at     = Column(DateTime(timezone=True), default=utcnow)
    updated_at     = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)

    appointment = relationship("Appointment", back_populates="repair")


# ── Products (Buy & Sell + Accessories) ───────────────────────────────────────

class Product(Base):
    __tablename__ = "products"

    id             = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name           = Column(String(255), nullable=False)
    description    = Column(Text, nullable=True)
    category       = Column(String(50), nullable=False)  # smartphone, laptop, tablet, accessories, etc.
    brand          = Column(String(100), nullable=True)
    model          = Column(String(100), nullable=True)
    condition      = Column(String(50), nullable=False)  # new, refurbished, used
    price          = Column(Numeric(10, 2), nullable=False)
    stock_quantity = Column(Integer, default=0)
    image_url      = Column(String(500), nullable=True)
    is_active      = Column(Boolean, default=True)
    is_for_sale    = Column(Boolean, default=True)  # true = for sale, false = we buy
    created_at     = Column(DateTime(timezone=True), default=utcnow)
    updated_at     = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)


# ── Product Categories ───────────────────────────────────────────────────────────

class Category(Base):
    __tablename__ = "categories"

    id          = Column(Integer, primary_key=True, autoincrement=True)
    name        = Column(String(100), nullable=False, unique=True)
    slug        = Column(String(100), nullable=False, unique=True)
    description = Column(Text, nullable=True)
    icon_name   = Column(String(50), nullable=True)
    is_active   = Column(Boolean, default=True)
    created_at  = Column(DateTime(timezone=True), default=utcnow)


# ── Trade Requests (Buy & Sell) ─────────────────────────────────────────────────

class TradeRequest(Base):
    __tablename__ = "trade_requests"

    id              = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id         = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    customer_name   = Column(String(255), nullable=False)
    customer_email  = Column(String(255), nullable=False)
    customer_phone  = Column(String(20), nullable=True)
    device_type     = Column(String(50), nullable=False)
    device_brand    = Column(String(100), nullable=False)
    device_model    = Column(String(100), nullable=False)
    device_condition = Column(String(50), nullable=False)
    requested_price = Column(Numeric(10, 2), nullable=True)
    description     = Column(Text, nullable=True)
    status          = Column(String(50), default="pending")  # pending, approved, rejected, completed
    created_at      = Column(DateTime(timezone=True), default=utcnow)
    updated_at      = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)

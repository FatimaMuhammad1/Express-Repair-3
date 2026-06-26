import uuid
from datetime import datetime, timezone
from sqlalchemy import (
    Column, String, Boolean, Text, DateTime,
    Numeric, Date, Integer, ForeignKey, Enum, Index, CheckConstraint
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base
import enum


def utcnow():
    return datetime.now(timezone.utc)


# ── Enums ───────────────────────────────────────────────────────────────────

class UserRole(enum.Enum):
    customer = "customer"
    technician = "technician"
    staff = "staff"
    admin = "admin"
    SUPER_ADMIN = "SUPER_ADMIN"


class OtpPurpose(enum.Enum):
    signup_verification = "signup_verification"
    password_reset = "password_reset"


class AppointmentStatus(enum.Enum):
    pending = "pending"
    confirmed = "confirmed"
    cancelled = "cancelled"
    completed = "completed"


class DeviceType(enum.Enum):
    smartphone = "smartphone"
    mobile = "mobile"
    laptop = "laptop"
    tablet = "tablet"
    console = "console"
    other = "other"


class RepairStatus(enum.Enum):
    pending = "pending"
    received = "received"
    diagnosed = "diagnosed"
    repairing = "repairing"
    testing = "testing"
    collection = "collection"
    completed = "completed"


class RepairPriority(enum.Enum):
    low = "low"
    normal = "normal"
    high = "high"
    urgent = "urgent"


class ProductCondition(enum.Enum):
    new = "new"
    refurbished = "refurbished"
    used = "used"


class ProductCategory(enum.Enum):
    smartphone = "smartphone"
    laptop = "laptop"
    tablet = "tablet"
    accessories = "accessories"
    other = "other"


class TradeRequestStatus(enum.Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"
    completed = "completed"


class CommunicationType(enum.Enum):
    email = "email"
    sms = "sms"
    broadcast = "broadcast"


class CommunicationStatus(enum.Enum):
    sent = "sent"
    failed = "failed"
    pending = "pending"


class StockMovementType(enum.Enum):
    IN = "in"
    OUT = "out"
    ADJUSTMENT = "adjustment"


class TransactionType(enum.Enum):
    payment = "payment"
    refund = "refund"
    expense = "expense"


class TransactionStatus(enum.Enum):
    completed = "completed"
    pending = "pending"
    failed = "failed"


class PaymentMethod(enum.Enum):
    cash = "cash"
    card = "card"
    bank_transfer = "bank_transfer"
    online = "online"


class InvoiceStatus(enum.Enum):
    pending = "pending"
    partial = "partial"
    paid = "paid"
    overdue = "overdue"


class ExpenseCategory(enum.Enum):
    rent = "rent"
    utilities = "utilities"
    supplies = "supplies"
    wages = "wages"
    other = "other"


class OnlineSaleStatus(enum.Enum):
    pending = "pending"
    completed = "completed"
    cancelled = "cancelled"


class RepairTrackingStatus(enum.Enum):
    pending = "pending"
    in_progress = "in_progress"
    completed = "completed"


class NotificationType(enum.Enum):
    booking = "booking"
    low_stock = "low_stock"
    repair_completed = "repair_completed"
    message = "message"
    error = "error"


class AuditAction(enum.Enum):
    login = "login"
    logout = "logout"
    create = "create"
    update = "update"
    delete = "delete"
    status_change = "status_change"
    inventory_change = "inventory_change"


class AuditEntity(enum.Enum):
    repair = "repair"
    customer = "customer"
    product = "product"
    booking = "booking"
    staff = "staff"
    invoice = "invoice"
    expense = "expense"
    role = "role"


# ── Users ─────────────────────────────────────────────────────────────────────

class User(Base):
    __tablename__ = "users"

    id           = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email        = Column(String(255), unique=True, nullable=False, index=True)
    password     = Column(String(255), nullable=False)
    name         = Column(String(255), nullable=False)
    phone        = Column(String(20), nullable=True, index=True)
    role         = Column(Enum(UserRole), default=UserRole.customer, nullable=False, index=True)
    is_verified  = Column(Boolean, default=False, index=True)
    is_active    = Column(Boolean, default=True, index=True)
    created_at   = Column(DateTime(timezone=True), default=utcnow, index=True)
    updated_at   = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)

    appointments = relationship("Appointment", back_populates="user")
    
    __table_args__ = (
        CheckConstraint('length(email) >= 5', name='check_email_length'),
        CheckConstraint('length(password) >= 8', name='check_password_length'),
        Index('idx_users_role_active', 'role', 'is_active'),
    )


# ── OTPs ──────────────────────────────────────────────────────────────────────

class Otp(Base):
    __tablename__ = "otps"

    id         = Column(Integer, primary_key=True, autoincrement=True)
    email      = Column(String(255), nullable=False, index=True)
    otp_code   = Column(String(6), nullable=False)
    purpose    = Column(Enum(OtpPurpose), nullable=False, index=True)
    expires_at = Column(DateTime(timezone=True), nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), default=utcnow)
    
    __table_args__ = (
        Index('idx_otps_email_purpose', 'email', 'purpose'),
        CheckConstraint('expires_at > created_at', name='check_otp_expiry'),
    )


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
    user_id             = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    customer_name       = Column(String(255), nullable=False)
    customer_email      = Column(String(255), nullable=False)
    customer_phone      = Column(String(20), nullable=True, index=True)
    device_type         = Column(Enum(DeviceType), nullable=False, index=True)
    device_model        = Column(String(255), nullable=False)
    issue_description   = Column(Text, nullable=False)
    preferred_date      = Column(Date, nullable=False, index=True)
    preferred_time_slot = Column(String(50), nullable=False)
    status              = Column(Enum(AppointmentStatus), default=AppointmentStatus.pending, nullable=False, index=True)
    created_at          = Column(DateTime(timezone=True), default=utcnow, index=True)

    user   = relationship("User", back_populates="appointments")
    repair = relationship("Repair", back_populates="appointment", uselist=False)
    
    __table_args__ = (
        Index('idx_appointments_status_date', 'status', 'preferred_date'),
        Index('idx_appointments_customer_phone', 'customer_phone'),
    )


# ── Repairs ───────────────────────────────────────────────────────────────────

class Repair(Base):
    __tablename__ = "repairs"

    id             = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    tracking_id    = Column(String(50), unique=True, nullable=False, index=True)
    appointment_id = Column(UUID(as_uuid=True), ForeignKey("appointments.id", ondelete="SET NULL"), nullable=True, index=True)
    customer_name  = Column(String(255), nullable=False)
    customer_phone = Column(String(20), nullable=True, index=True)
    device_model   = Column(String(255), nullable=False)
    status         = Column(Enum(RepairStatus), default=RepairStatus.received, nullable=False, index=True)
    technician_id  = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    status_notes   = Column(Text, nullable=True)
    estimated_cost = Column(Numeric(10, 2), default=0.00)
    created_at     = Column(DateTime(timezone=True), default=utcnow, index=True)
    updated_at     = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)

    appointment = relationship("Appointment", back_populates="repair")
    technician = relationship("User", foreign_keys=[technician_id])
    
    __table_args__ = (
        Index('idx_repairs_status_created', 'status', 'created_at'),
        Index('idx_repairs_customer_phone', 'customer_phone'),
        CheckConstraint('estimated_cost >= 0', name='check_repair_cost_positive'),
    )


# ── Products (Buy & Sell + Accessories) ───────────────────────────────────────

class Product(Base):
    __tablename__ = "products"

    id             = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name           = Column(String(255), nullable=False, index=True)
    description    = Column(Text, nullable=True)
    category       = Column(Enum(ProductCategory), nullable=False, index=True)
    brand          = Column(String(100), nullable=True, index=True)
    model          = Column(String(100), nullable=True)
    condition      = Column(Enum(ProductCondition), nullable=False, index=True)
    price          = Column(Numeric(10, 2), nullable=False)
    stock_quantity = Column(Integer, default=0, index=True)
    reorder_threshold = Column(Integer, default=5)  # Stock level at which to reorder
    reorder_quantity = Column(Integer, default=10)  # Default quantity to reorder
    supplier_id    = Column(UUID(as_uuid=True), ForeignKey("suppliers.id", ondelete="SET NULL"), nullable=True, index=True)
    image_url      = Column(String(500), nullable=True)
    is_active      = Column(Boolean, default=True, index=True)
    is_for_sale    = Column(Boolean, default=True)
    created_at     = Column(DateTime(timezone=True), default=utcnow)
    updated_at     = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)

    supplier = relationship("Supplier", backref="products")
    
    __table_args__ = (
        Index('idx_products_category_condition', 'category', 'condition'),
        Index('idx_products_stock_active', 'stock_quantity', 'is_active'),
        CheckConstraint('price >= 0', name='check_product_price_positive'),
        CheckConstraint('stock_quantity >= 0', name='check_stock_quantity_positive'),
    )


class RepairPart(Base):
    """Parts used in repairs - links repairs to inventory items"""
    __tablename__ = "repair_parts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    repair_id = Column(UUID(as_uuid=True), ForeignKey("repairs.id", ondelete="CASCADE"), nullable=False, index=True)
    product_id = Column(UUID(as_uuid=True), ForeignKey("products.id", ondelete="SET NULL"), nullable=True, index=True)
    part_name = Column(String(255), nullable=False)  # Fallback if product_id is null
    quantity = Column(Integer, default=1, nullable=False)
    unit_cost = Column(Numeric(10, 2), default=0.00)  # Cost per unit at time of use
    total_cost = Column(Numeric(10, 2), default=0.00)  # quantity * unit_cost
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=utcnow)

    repair = relationship("Repair", backref="parts")
    product = relationship("Product")

    __table_args__ = (
        CheckConstraint('quantity > 0', name='check_repair_part_quantity_positive'),
        CheckConstraint('unit_cost >= 0', name='check_repair_part_cost_positive'),
    )


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
    user_id         = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    customer_name   = Column(String(255), nullable=False)
    customer_email  = Column(String(255), nullable=False)
    customer_phone  = Column(String(20), nullable=True)
    device_type     = Column(Enum(DeviceType), nullable=False)
    device_brand    = Column(String(100), nullable=False)
    device_model    = Column(String(100), nullable=False)
    device_condition = Column(Enum(ProductCondition), nullable=False)
    requested_price = Column(Numeric(10, 2), nullable=True)
    description     = Column(Text, nullable=True)
    status          = Column(Enum(TradeRequestStatus), default=TradeRequestStatus.pending, nullable=False, index=True)
    created_at      = Column(DateTime(timezone=True), default=utcnow, index=True)
    updated_at      = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)
    
    __table_args__ = (
        Index('idx_trade_requests_status_created', 'status', 'created_at'),
        CheckConstraint('requested_price >= 0', name='check_trade_price_positive'),
    )

# ── Communication History ────────────────────────────────────────────────────────
class Communication(Base):
    __tablename__ = "communications"

    id          = Column(Integer, primary_key=True, autoincrement=True)
    type        = Column(Enum(CommunicationType), nullable=False, index=True)
    recipient   = Column(String(255), nullable=False, index=True)
    subject     = Column(String(255), nullable=True)
    body        = Column(Text, nullable=False)
    status      = Column(Enum(CommunicationStatus), default=CommunicationStatus.sent, nullable=False, index=True)
    created_at  = Column(DateTime(timezone=True), default=utcnow, index=True)
    
    __table_args__ = (
        Index('idx_communications_type_status', 'type', 'status'),
        Index('idx_communications_recipient_created', 'recipient', 'created_at'),
    )


# ── Branches (Multi-Branch Support) ─────────────────────────────────────────────
class Branch(Base):
    __tablename__ = "branches"

    id          = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name        = Column(String(255), nullable=False, index=True)
    address     = Column(String(500), nullable=False)
    phone       = Column(String(20), nullable=True)
    email       = Column(String(255), nullable=True)
    is_active   = Column(Boolean, default=True, index=True)
    created_at  = Column(DateTime(timezone=True), default=utcnow)
    updated_at  = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)


# ── Suppliers ───────────────────────────────────────────────────────────────────
class Supplier(Base):
    __tablename__ = "suppliers"

    id          = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name        = Column(String(255), nullable=False, index=True)
    email       = Column(String(255), nullable=True)
    phone       = Column(String(20), nullable=True)
    address     = Column(String(500), nullable=True)
    is_active   = Column(Boolean, default=True, index=True)
    created_at  = Column(DateTime(timezone=True), default=utcnow)
    updated_at  = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)


# ── Purchase Orders ─────────────────────────────────────────────────────────────
class PurchaseOrder(Base):
    __tablename__ = "purchase_orders"

    id              = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    supplier_id     = Column(UUID(as_uuid=True), ForeignKey("suppliers.id", ondelete="SET NULL"), nullable=True, index=True)
    branch_id       = Column(UUID(as_uuid=True), ForeignKey("branches.id", ondelete="SET NULL"), nullable=True, index=True)
    order_number    = Column(String(50), unique=True, nullable=False, index=True)
    status          = Column(Enum(TradeRequestStatus), default=TradeRequestStatus.pending, nullable=False, index=True)
    total_amount    = Column(Numeric(10, 2), default=0.00)
    notes           = Column(Text, nullable=True)
    requested_by    = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)  # User who created the PO
    approved_by     = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)  # User who approved
    approved_at     = Column(DateTime(timezone=True), nullable=True)  # When approved
    rejection_reason = Column(Text, nullable=True)  # Reason for rejection
    created_at      = Column(DateTime(timezone=True), default=utcnow, index=True)
    updated_at      = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)

    requested_by_user = relationship("User", foreign_keys=[requested_by])
    approved_by_user = relationship("User", foreign_keys=[approved_by])
    
    __table_args__ = (
        Index('idx_purchase_orders_supplier_status', 'supplier_id', 'status'),
        CheckConstraint('total_amount >= 0', name='check_purchase_amount_positive'),
    )


# ── Stock Movements ─────────────────────────────────────────────────────────────
class StockMovement(Base):
    __tablename__ = "stock_movements"

    id              = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_id      = Column(UUID(as_uuid=True), ForeignKey("products.id", ondelete="CASCADE"), nullable=False, index=True)
    branch_id       = Column(UUID(as_uuid=True), ForeignKey("branches.id", ondelete="SET NULL"), nullable=True, index=True)
    type            = Column(Enum(StockMovementType), nullable=False, index=True)
    quantity        = Column(Integer, nullable=False)
    reason          = Column(String(255), nullable=True)
    user_id         = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    created_at      = Column(DateTime(timezone=True), default=utcnow, index=True)
    
    __table_args__ = (
        Index('idx_stock_movements_product_type', 'product_id', 'type'),
        Index('idx_stock_movements_branch_created', 'branch_id', 'created_at'),
        CheckConstraint('quantity != 0', name='check_stock_movement_quantity'),
    )


# ── Tax Rates ───────────────────────────────────────────────────────────────────
class TaxRate(Base):
    """Configurable tax rates for different regions/categories"""
    __tablename__ = "tax_rates"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), nullable=False)  # e.g., "UK VAT", "US Sales Tax"
    rate = Column(Numeric(5, 4), nullable=False)  # e.g., 0.2000 for 20%
    description = Column(String(255), nullable=True)
    is_default = Column(Boolean, default=False)  # Default tax rate
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=utcnow)
    updated_at = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)

    __table_args__ = (
        CheckConstraint('rate >= 0', name='check_tax_rate_positive'),
        CheckConstraint('rate <= 1', name='check_tax_rate_max_100_percent'),
    )


# ── Financial Transactions ─────────────────────────────────────────────────────
class Transaction(Base):
    __tablename__ = "transactions"

    id              = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    type            = Column(Enum(TransactionType), nullable=False, index=True)
    amount          = Column(Numeric(10, 2), nullable=False)
    description     = Column(String(500), nullable=True)
    customer_name   = Column(String(255), nullable=True, index=True)
    invoice_number  = Column(String(50), nullable=True, index=True)
    status          = Column(Enum(TransactionStatus), default=TransactionStatus.completed, nullable=False, index=True)
    payment_method  = Column(Enum(PaymentMethod), nullable=True)
    branch_id       = Column(UUID(as_uuid=True), ForeignKey("branches.id", ondelete="SET NULL"), nullable=True, index=True)
    created_at      = Column(DateTime(timezone=True), default=utcnow, index=True)
    
    __table_args__ = (
        Index('idx_transactions_type_status', 'type', 'status'),
        Index('idx_transactions_branch_created', 'branch_id', 'created_at'),
        CheckConstraint('amount >= 0', name='check_transaction_amount_positive'),
    )


# ── Invoices ─────────────────────────────────────────────────────────────────────
class Invoice(Base):
    __tablename__ = "invoices"

    id              = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    invoice_number  = Column(String(50), unique=True, nullable=False, index=True)
    repair_id       = Column(UUID(as_uuid=True), ForeignKey("repairs.id", ondelete="SET NULL"), nullable=True, index=True)
    customer_name   = Column(String(255), nullable=False)
    customer_email  = Column(String(255), nullable=True)
    customer_phone  = Column(String(20), nullable=True, index=True)
    amount          = Column(Numeric(10, 2), nullable=False)
    tax_amount      = Column(Numeric(10, 2), default=0.00)
    deposit_paid    = Column(Numeric(10, 2), default=0.00)
    status          = Column(Enum(InvoiceStatus), default=InvoiceStatus.pending, nullable=False, index=True)
    due_date        = Column(Date, nullable=True)
    paid_date       = Column(Date, nullable=True)
    branch_id       = Column(UUID(as_uuid=True), ForeignKey("branches.id", ondelete="SET NULL"), nullable=True, index=True)
    created_at      = Column(DateTime(timezone=True), default=utcnow, index=True)
    updated_at      = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)
    
    __table_args__ = (
        Index('idx_invoices_status_due', 'status', 'due_date'),
        Index('idx_invoices_customer_phone', 'customer_phone'),
        CheckConstraint('amount >= 0', name='check_invoice_amount_positive'),
        CheckConstraint('deposit_paid <= amount', name='check_deposit_not_exceed_total'),
    )


# ── Expenses ─────────────────────────────────────────────────────────────────────
class Expense(Base):
    __tablename__ = "expenses"

    id              = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    category        = Column(Enum(ExpenseCategory), nullable=False, index=True)
    description     = Column(String(500), nullable=False)
    amount          = Column(Numeric(10, 2), nullable=False)
    date            = Column(Date, nullable=False, index=True)
    branch_id       = Column(UUID(as_uuid=True), ForeignKey("branches.id", ondelete="SET NULL"), nullable=True, index=True)
    created_at      = Column(DateTime(timezone=True), default=utcnow, index=True)
    
    __table_args__ = (
        Index('idx_expenses_category_date', 'category', 'date'),
        Index('idx_expenses_branch_date', 'branch_id', 'date'),
        CheckConstraint('amount >= 0', name='check_expense_amount_positive'),
    )


# ── Warranty ────────────────────────────────────────────────────────────────────
class Warranty(Base):
    __tablename__ = "warranties"

    id              = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    repair_id       = Column(UUID(as_uuid=True), ForeignKey("repairs.id", ondelete="CASCADE"), nullable=False, index=True)
    duration        = Column(Integer, nullable=False)
    start_date      = Column(Date, nullable=False)
    expiration_date = Column(Date, nullable=False, index=True)
    notes           = Column(Text, nullable=True)
    created_at      = Column(DateTime(timezone=True), default=utcnow)
    updated_at      = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)
    
    __table_args__ = (
        CheckConstraint('duration > 0', name='check_warranty_duration_positive'),
        CheckConstraint('expiration_date > start_date', name='check_warranty_expiry_after_start'),
    )


# ── Warranty History ───────────────────────────────────────────────────────────
class WarrantyHistory(Base):
    __tablename__ = "warranty_history"

    id          = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    warranty_id = Column(UUID(as_uuid=True), ForeignKey("warranties.id", ondelete="CASCADE"), nullable=False, index=True)
    action      = Column(String(255), nullable=False)
    user_id     = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    created_at  = Column(DateTime(timezone=True), default=utcnow, index=True)
    
    __table_args__ = (
        Index('idx_warranty_history_warranty_created', 'warranty_id', 'created_at'),
    )


# ── Repair Timeline ───────────────────────────────────────────────────────────────
class RepairTimeline(Base):
    __tablename__ = "repair_timeline"

    id          = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    repair_id   = Column(UUID(as_uuid=True), ForeignKey("repairs.id", ondelete="CASCADE"), nullable=False, index=True)
    type        = Column(String(50), nullable=False, index=True)
    title       = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    user_id     = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    created_at  = Column(DateTime(timezone=True), default=utcnow, index=True)
    
    __table_args__ = (
        Index('idx_repair_timeline_repair_created', 'repair_id', 'created_at'),
    )


# ── Technician Notes ────────────────────────────────────────────────────────────
class TechnicianNote(Base):
    __tablename__ = "technician_notes"

    id          = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    repair_id   = Column(UUID(as_uuid=True), ForeignKey("repairs.id", ondelete="CASCADE"), nullable=False, index=True)
    technician_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    note        = Column(Text, nullable=False)
    created_at  = Column(DateTime(timezone=True), default=utcnow, index=True)
    
    __table_args__ = (
        Index('idx_technician_notes_repair_created', 'repair_id', 'created_at'),
    )


# ── Internal Comments ────────────────────────────────────────────────────────────
class InternalComment(Base):
    __tablename__ = "internal_comments"

    id          = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    repair_id   = Column(UUID(as_uuid=True), ForeignKey("repairs.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id     = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    comment     = Column(Text, nullable=False)
    created_at  = Column(DateTime(timezone=True), default=utcnow, index=True)
    
    __table_args__ = (
        Index('idx_internal_comments_repair_created', 'repair_id', 'created_at'),
    )


# ── Notifications ───────────────────────────────────────────────────────────────
class Notification(Base):
    __tablename__ = "notifications"

    id          = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id     = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=True, index=True)
    type        = Column(Enum(NotificationType), nullable=False, index=True)
    title       = Column(String(255), nullable=False)
    message     = Column(Text, nullable=False)
    link        = Column(String(500), nullable=True)
    read        = Column(Boolean, default=False, index=True)
    created_at  = Column(DateTime(timezone=True), default=utcnow, index=True)
    
    __table_args__ = (
        Index('idx_notifications_user_read', 'user_id', 'read'),
        Index('idx_notifications_type_created', 'type', 'created_at'),
    )


# ── Audit Logs ───────────────────────────────────────────────────────────────────
class AuditLog(Base):
    __tablename__ = "audit_logs"

    id              = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id         = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    action          = Column(Enum(AuditAction), nullable=False, index=True)
    entity          = Column(Enum(AuditEntity), nullable=False, index=True)
    entity_id       = Column(String(255), nullable=True)
    previous_value  = Column(Text, nullable=True)
    new_value       = Column(Text, nullable=True)
    ip_address      = Column(String(50), nullable=True)
    user_agent      = Column(String(500), nullable=True)
    created_at      = Column(DateTime(timezone=True), default=utcnow, index=True)
    
    __table_args__ = (
        Index('idx_audit_logs_user_action', 'user_id', 'action'),
        Index('idx_audit_logs_entity_created', 'entity', 'created_at'),
        Index('idx_audit_logs_entity_id', 'entity', 'entity_id'),
    )


# ── Customer Notes ───────────────────────────────────────────────────────────────
class CustomerNote(Base):
    __tablename__ = "customer_notes"

    id          = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    customer_phone = Column(String(20), nullable=False, index=True)
    user_id     = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    note        = Column(Text, nullable=False)
    created_at  = Column(DateTime(timezone=True), default=utcnow, index=True)
    
    __table_args__ = (
        Index('idx_customer_notes_phone_created', 'customer_phone', 'created_at'),
    )


# ── Roles ───────────────────────────────────────────────────────────────────────
class Role(Base):
    __tablename__ = "roles"

    id          = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name        = Column(Enum(UserRole), nullable=False, unique=True)
    description = Column(Text, nullable=True)
    is_active   = Column(Boolean, default=True, index=True)
    created_at  = Column(DateTime(timezone=True), default=utcnow)
    updated_at  = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)


# ── Permissions ──────────────────────────────────────────────────────────────────
class Permission(Base):
    __tablename__ = "permissions"

    id          = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    role_id     = Column(UUID(as_uuid=True), ForeignKey("roles.id", ondelete="CASCADE"), nullable=False, index=True)
    resource    = Column(String(50), nullable=False, index=True)
    action      = Column(String(50), nullable=False, index=True)
    created_at  = Column(DateTime(timezone=True), default=utcnow)
    
    __table_args__ = (
        Index('idx_permissions_role_resource', 'role_id', 'resource'),
        Index('idx_permissions_resource_action', 'resource', 'action'),
    )


# ── Online Sales ────────────────────────────────────────────────────────────────
class OnlineSale(Base):
    __tablename__ = "online_sales"

    id              = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id        = Column(String(50), unique=True, nullable=False, index=True)
    customer_name   = Column(String(255), nullable=False)
    customer_email  = Column(String(255), nullable=True)
    customer_phone  = Column(String(20), nullable=True)
    amount          = Column(Numeric(10, 2), nullable=False)
    item_count      = Column(Integer, default=0)
    status          = Column(Enum(OnlineSaleStatus), default=OnlineSaleStatus.pending, nullable=False, index=True)
    payment_method  = Column(Enum(PaymentMethod), nullable=True)
    created_at      = Column(DateTime(timezone=True), default=utcnow, index=True)
    updated_at      = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)
    
    __table_args__ = (
        Index('idx_online_sales_status_created', 'status', 'created_at'),
        CheckConstraint('amount >= 0', name='check_online_sale_amount_positive'),
    )


# ── In-House Sales ───────────────────────────────────────────────────────────────
class InHouseSale(Base):
    __tablename__ = "inhouse_sales"

    id              = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    reference       = Column(String(50), unique=True, nullable=False, index=True)
    customer_name   = Column(String(255), nullable=False)
    customer_phone  = Column(String(20), nullable=True)
    amount          = Column(Numeric(10, 2), nullable=False)
    item_count      = Column(Integer, default=0)
    payment_method  = Column(Enum(PaymentMethod), nullable=True)
    created_at      = Column(DateTime(timezone=True), default=utcnow, index=True)
    
    __table_args__ = (
        CheckConstraint('amount >= 0', name='check_inhouse_sale_amount_positive'),
    )

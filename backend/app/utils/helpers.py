import random
import string
import bcrypt
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from app.config import settings


# ── Passwords ────────────────────────────────────────────────────────────────

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode(), hashed.encode())


# ── JWT ───────────────────────────────────────────────────────────────────────

def create_access_token(data: dict) -> str:
    payload = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.JWT_EXPIRE_MINUTES)
    payload.update({"exp": expire})
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)


def decode_token(token: str) -> dict:
    return jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])


# ── OTP ──────────────────────────────────────────────────────────────────────

def generate_otp() -> str:
    """Return a random 6-digit numeric OTP."""
    return str(random.randint(100000, 999999))


def otp_expiry(minutes: int = 10) -> datetime:
    return datetime.now(timezone.utc) + timedelta(minutes=minutes)


# ── Tracking ID ───────────────────────────────────────────────────────────────

def generate_tracking_id() -> str:
    """Return a unique tracking ID like REP-X82F4D."""
    suffix = "".join(random.choices(string.ascii_uppercase + string.digits, k=6))
    return f"REP-{suffix}"

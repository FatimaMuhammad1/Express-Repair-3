import smtplib
from email.message import EmailMessage
import os

# Celery/Redis are optional — not available on serverless platforms like Vercel
try:
    from celery import Celery
    from app.config import settings

    celery_app = Celery(
        "worker",
        broker=settings.REDIS_URL,
        backend=settings.REDIS_URL
    )

    celery_app.conf.update(
        task_serializer="json",
        accept_content=["json"],
        result_serializer="json",
        timezone="UTC",
        enable_utc=True,
    )
    CELERY_AVAILABLE = True
except Exception:
    celery_app = None
    CELERY_AVAILABLE = False


def _get_settings():
    """Lazy import to avoid circular issues."""
    from app.config import settings
    return settings


def _send_email(to_email: str, subject: str, body: str):
    settings = _get_settings()
    if not settings.SMTP_HOST or not settings.SMTP_USER:
        print(f"[Worker] SMTP not configured. Would send email to {to_email}: {subject}")
        return False

    msg = EmailMessage()
    msg.set_content(body)
    msg["Subject"] = subject
    msg["From"] = settings.EMAIL_FROM
    msg["To"] = to_email

    try:
        server = smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT)
        server.starttls()
        server.login(settings.SMTP_USER, settings.SMTP_PASS)
        server.send_message(msg)
        server.quit()
        print(f"[Worker] Email sent to {to_email}")
        return True
    except Exception as e:
        print(f"[Worker] Failed to send email to {to_email}: {e}")
        return False


def _send_sms(to_phone: str, body: str):
    """Send an SMS via Telnyx."""
    settings = _get_settings()
    if not settings.TELNYX_API_KEY:
        print(f"[Worker] Telnyx not configured. Would send SMS to {to_phone}: {body}")
        return False

    try:
        import telnyx
        telnyx.api_key = settings.TELNYX_API_KEY
        message = telnyx.Message.create(
            from_=settings.TELNYX_FROM_NUMBER,
            to=to_phone,
            text=body,
        )
        print(f"[Worker] SMS sent to {to_phone} via Telnyx, ID: {message.id}")
        return True
    except Exception as e:
        print(f"[Worker] Failed to send SMS to {to_phone}: {e}")
        return False


def _send_whatsapp(to_phone: str, body: str):
    """WhatsApp via Telnyx (requires Telnyx WhatsApp Business setup)."""
    settings = _get_settings()
    if not settings.TELNYX_API_KEY:
        print(f"[Worker] Telnyx not configured. Would send WhatsApp to {to_phone}: {body}")
        return False

    try:
        import telnyx
        telnyx.api_key = settings.TELNYX_API_KEY
        message = telnyx.Message.create(
            from_=settings.TELNYX_FROM_NUMBER,
            to=to_phone,
            text=body,
            messaging_profile_id=None,  # Set this if you have a WhatsApp messaging profile
        )
        print(f"[Worker] WhatsApp sent to {to_phone} via Telnyx, ID: {message.id}")
        return True
    except Exception as e:
        print(f"[Worker] Failed to send WhatsApp to {to_phone}: {e}")
        return False


# Create Celery tasks only when Celery is available, otherwise use sync fallbacks
if CELERY_AVAILABLE and celery_app:
    @celery_app.task
    def send_email_task(to_email: str, subject: str, body: str):
        return _send_email(to_email, subject, body)

    @celery_app.task
    def send_sms_task(to_phone: str, body: str):
        return _send_sms(to_phone, body)

    @celery_app.task
    def send_whatsapp_task(to_phone: str, body: str):
        return _send_whatsapp(to_phone, body)
else:
    # Synchronous fallback when Celery/Redis is not available (e.g. Vercel)
    class _FakeTask:
        """Mimic Celery task interface with .delay() for compatibility."""
        def __init__(self, fn):
            self._fn = fn

        def delay(self, *args, **kwargs):
            return self._fn(*args, **kwargs)

        def __call__(self, *args, **kwargs):
            return self._fn(*args, **kwargs)

    send_email_task = _FakeTask(_send_email)
    send_sms_task = _FakeTask(_send_sms)
    send_whatsapp_task = _FakeTask(_send_whatsapp)

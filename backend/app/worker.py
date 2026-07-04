import smtplib
from email.message import EmailMessage
from celery import Celery
import telnyx
import logging
from app.config import settings

logger = logging.getLogger(__name__)

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

@celery_app.task
def send_email_task(to_email: str, subject: str, body: str):
    if not settings.SMTP_HOST or not settings.SMTP_USER:
        logger.info(f"[Worker] SMTP not configured. Would send email to {to_email}: {subject}")
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
        logger.info(f"[Worker] Email sent to {to_email}")
        return True
    except Exception as e:
        logger.error(f"[Worker] Failed to send email to {to_email}: {e}")
        return False

@celery_app.task
def send_sms_task(to_phone: str, body: str):
    """Send an SMS via Telnyx."""
    if not settings.TELNYX_API_KEY:
        logger.info(f"[Worker] Telnyx not configured. Would send SMS to {to_phone}: {body}")
        return False
        
    try:
        telnyx.api_key = settings.TELNYX_API_KEY
        message = telnyx.Message.create(
            from_=settings.TELNYX_FROM_NUMBER,
            to=to_phone,
            text=body,
        )
        logger.info(f"[Worker] SMS sent to {to_phone} via Telnyx, ID: {message.id}")
        return True
    except Exception as e:
        logger.error(f"[Worker] Failed to send SMS to {to_phone}: {e}")
        return False

@celery_app.task
def send_whatsapp_task(to_phone: str, body: str):
    """WhatsApp via Telnyx (requires Telnyx WhatsApp Business setup)."""
    if not settings.TELNYX_API_KEY:
        logger.info(f"[Worker] Telnyx not configured. Would send WhatsApp to {to_phone}: {body}")
        return False
        
    try:
        telnyx.api_key = settings.TELNYX_API_KEY
        message = telnyx.Message.create(
            from_=settings.TELNYX_FROM_NUMBER,
            to=to_phone,
            text=body,
            messaging_profile_id=None,  # Set this if you have a WhatsApp messaging profile
        )
        logger.info(f"[Worker] WhatsApp sent to {to_phone} via Telnyx, ID: {message.id}")
        return True
    except Exception as e:
        logger.error(f"[Worker] Failed to send WhatsApp to {to_phone}: {e}")
        return False

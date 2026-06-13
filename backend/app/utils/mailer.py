import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.config import settings


def _send_smtp(to: str, subject: str, html: str, text: str):
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"Electronics Repair Shop <{settings.EMAIL_FROM}>"
    msg["To"] = to
    msg.attach(MIMEText(text, "plain"))
    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
        server.starttls()
        server.login(settings.SMTP_USER, settings.SMTP_PASS)
        server.sendmail(settings.EMAIL_FROM, to, msg.as_string())


def _console_fallback(to: str, subject: str, text: str):
    print("\n=================== MOCK EMAIL SENT ===================")
    print(f"To:      {to}")
    print(f"Subject: {subject}")
    print(f"Content: {text}")
    print("=======================================================\n")


def send_mail(to: str, subject: str, html: str, text: str):
    if settings.SMTP_HOST and settings.SMTP_USER and settings.SMTP_PASS:
        try:
            _send_smtp(to, subject, html, text)
            print(f"[Mailer] Email sent to {to}")
        except Exception as e:
            print(f"[Mailer] SMTP failed: {e} — falling back to console")
            _console_fallback(to, subject, text)
    else:
        _console_fallback(to, subject, text)


def send_verification_otp(email: str, otp: str):
    subject = "Verify your email – Express Phone & Laptop Repair"
    text = f"Your verification OTP is: {otp}  (valid for 10 minutes)"
    html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px;background:#ffffff">
      <div style="text-align:center;padding-bottom:24px;border-bottom:1px solid #e5e7eb;margin-bottom:24px">
        <h1 style="color:#0095ff;margin:0;font-size:24px">Express Phone & Laptop Repair</h1>
        <p style="color:#6b7280;margin:8px 0 0;font-size:14px">Nuneaton's Trusted Repair Service</p>
      </div>
      <h2 style="color:#1f2937;text-align:center;margin-bottom:16px">Verify Your Account</h2>
      <p style="color:#4b5563;line-height:1.6;margin-bottom:20px">Thank you for signing up! Use the OTP below to verify your email address:</p>
      <div style="font-size:36px;font-weight:bold;letter-spacing:8px;text-align:center;
                  background:#f0f9ff;padding:24px;border-radius:8px;margin:24px 0;color:#0095ff;border:2px solid #0095ff">{otp}</div>
      <p style="color:#6b7280;font-size:13px;line-height:1.5">Valid for 10 minutes. If you didn't sign up for an account, please ignore this email.</p>
      <div style="margin-top:32px;padding-top:24px;border-top:1px solid #e5e7eb;text-align:center">
        <p style="color:#9ca3af;font-size:12px;margin:0">Express Phone & Laptop Repair<br/>6 Harefield Road, Nuneaton, CV11 4HD<br/>07415 278767</p>
      </div>
    </div>"""
    send_mail(email, subject, html, text)


def send_reset_otp(email: str, otp: str):
    subject = "Password Reset OTP – Express Phone & Laptop Repair"
    text = f"Your password reset OTP is: {otp}  (valid for 10 minutes)"
    html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px;background:#ffffff">
      <div style="text-align:center;padding-bottom:24px;border-bottom:1px solid #e5e7eb;margin-bottom:24px">
        <h1 style="color:#0095ff;margin:0;font-size:24px">Express Phone & Laptop Repair</h1>
        <p style="color:#6b7280;margin:8px 0 0;font-size:14px">Nuneaton's Trusted Repair Service</p>
      </div>
      <h2 style="color:#dc3545;text-align:center;margin-bottom:16px">Reset Your Password</h2>
      <p style="color:#4b5563;line-height:1.6;margin-bottom:20px">We received a request to reset your password. Use the OTP below:</p>
      <div style="font-size:36px;font-weight:bold;letter-spacing:8px;text-align:center;
                  background:#fff3cd;padding:24px;border-radius:8px;margin:24px 0;color:#856404;border:2px solid #ffc107">{otp}</div>
      <p style="color:#6b7280;font-size:13px;line-height:1.5">Valid for 10 minutes. If you didn't request this, please secure your account immediately.</p>
      <div style="margin-top:32px;padding-top:24px;border-top:1px solid #e5e7eb;text-align:center">
        <p style="color:#9ca3af;font-size:12px;margin:0">Express Phone & Laptop Repair<br/>6 Harefield Road, Nuneaton, CV11 4HD<br/>07415 278767</p>
      </div>
    </div>"""
    send_mail(email, subject, html, text)


def send_booking_confirmation(email: str, customer_name: str, tracking_id: str, device_model: str, preferred_date: str):
    subject = f"Booking Confirmed – {tracking_id}"
    text = f"Hi {customer_name}, Your repair booking for {device_model} is confirmed for {preferred_date}. Tracking ID: {tracking_id}"
    html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px;background:#ffffff">
      <div style="text-align:center;padding-bottom:24px;border-bottom:1px solid #e5e7eb;margin-bottom:24px">
        <h1 style="color:#0095ff;margin:0;font-size:24px">Express Phone & Laptop Repair</h1>
        <p style="color:#6b7280;margin:8px 0 0;font-size:14px">Nuneaton's Trusted Repair Service</p>
      </div>
      <div style="background:#ecfdf5;padding:20px;border-radius:8px;border-left:4px solid #10b981;margin-bottom:24px">
        <h2 style="color:#059669;margin:0 0 8px;font-size:18px">✓ Booking Confirmed</h2>
        <p style="color:#047857;margin:0">Your repair booking has been successfully confirmed.</p>
      </div>
      <p style="color:#4b5563;line-height:1.6;margin-bottom:16px">Hi {customer_name},</p>
      <p style="color:#4b5563;line-height:1.6;margin-bottom:20px">Your repair booking has been confirmed. Here are your details:</p>
      <div style="background:#f9fafb;padding:20px;border-radius:8px;margin:20px 0">
        <p style="margin:0 0 8px;color:#6b7280;font-size:13px">Tracking ID</p>
        <p style="margin:0 0 16px;color:#1f2937;font-size:18px;font-weight:bold">{tracking_id}</p>
        <p style="margin:0 0 8px;color:#6b7280;font-size:13px">Device</p>
        <p style="margin:0 0 16px;color:#1f2937;font-size:16px">{device_model}</p>
        <p style="margin:0 0 8px;color:#6b7280;font-size:13px">Preferred Date</p>
        <p style="margin:0;color:#1f2937;font-size:16px">{preferred_date}</p>
      </div>
      <p style="color:#6b7280;font-size:13px;line-height:1.5">Please bring your device to our shop at 6 Harefield Road, Nuneaton, CV11 4HD. Call us on 07415 278767 if you need to reschedule.</p>
      <div style="margin-top:32px;padding-top:24px;border-top:1px solid #e5e7eb;text-align:center">
        <p style="color:#9ca3af;font-size:12px;margin:0">Express Phone & Laptop Repair<br/>6 Harefield Road, Nuneaton, CV11 4HD<br/>07415 278767</p>
      </div>
    </div>"""
    send_mail(email, subject, html, text)

import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add backend to path
sys.path.insert(0, os.path.dirname(__file__))

from app.worker import send_sms_task

# Test SMS
test_phone = "+447415278767"  # Replace with your phone number
test_message = "Test SMS from Express Repair Shop - Telnyx integration working!"

print(f"Sending test SMS to {test_phone}...")
result = send_sms_task(test_phone, test_message)

if result:
    print("✅ SMS sent successfully!")
else:
    print("❌ SMS failed - check Telnyx API key and configuration")

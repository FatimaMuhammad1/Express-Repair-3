"""
Script to create a BUSINESS_OWNER user
Run this after starting the backend server
"""
import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_BASE = os.getenv('API_BASE_URL', 'http://localhost:8000')

# User details for the BUSINESS_OWNER user
USER_DETAILS = {
    "name": "Jawad",
    "email": "jawad@expresstechhub.co.uk",
    "password": "expresstechHUB8302-458",
    "role": "BUSINESS_OWNER",
    "phone": "+447415278767"
}

# First, login as SUPER_ADMIN to get token
print("Logging in as SUPER_ADMIN...")
login_response = requests.post(f"{API_BASE}/api/auth/login", json={
    "email": os.getenv('SUPER_ADMIN_EMAIL', 'admin@expresstechhub.co.uk'),
    "password": os.getenv('SUPER_ADMIN_PASSWORD', 'super-useradmin123673')
})

if login_response.status_code != 200:
    print(f"❌ Login failed: {login_response.text}")
    exit(1)

token = login_response.json()['token']
headers = {"Authorization": f"Bearer {token}"}
print("✅ Login successful")

# Create the BUSINESS_OWNER user
print(f"Creating BUSINESS_OWNER user: {USER_DETAILS['name']}...")
create_response = requests.post(f"{API_BASE}/api/users", json=USER_DETAILS, headers=headers)

if create_response.status_code == 200:
    print("✅ BUSINESS_OWNER user created successfully!")
    print(create_response.json())
    print(f"\n📧 Email: {USER_DETAILS['email']}")
    print(f"🔑 Password: {USER_DETAILS['password']}")
    print(f"\nLogin at: {API_BASE}/login")
    print(f"Access dashboard at: {API_BASE}/owner")
else:
    print(f"❌ Failed to create user: {create_response.text}")
    exit(1)

"""
Create an admin user securely for production.
Run with: python create_admin.py
"""
import sys
import os
import getpass
sys.path.append(os.path.dirname(__file__))

from app.database import SessionLocal, engine, Base
from app.models import User
from app.utils.helpers import hash_password

def create_admin():
    print("=== Create Admin User ===\n")
    
    email = input("Admin email: ").strip()
    if not email:
        print("Email is required.")
        return
    
    password = getpass.getpass("Admin password: ").strip()
    if not password:
        print("Password is required.")
        return
    
    confirm_password = getpass.getpass("Confirm password: ").strip()
    if password != confirm_password:
        print("Passwords do not match.")
        return
    
    name = input("Admin name (optional, press Enter for default): ").strip() or "Admin"
    phone = input("Admin phone (optional, press Enter to skip): ").strip() or None
    
    db = SessionLocal()
    try:
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == email).first()
        if existing_user:
            print(f"\n❌ User with email {email} already exists.")
            return
        
        # Create admin user
        admin = User(
            name=name,
            email=email,
            password=hash_password(password),
            phone=phone,
            role="admin",
            is_verified=True,
        )
        db.add(admin)
        db.commit()
        db.refresh(admin)
        
        print(f"\n✅ Admin user created successfully!")
        print(f"   Email: {email}")
        print(f"   Name: {name}")
        print(f"   Role: admin")
        print(f"\n⚠️  Please save these credentials securely.")
        
    except Exception as e:
        db.rollback()
        print(f"\n❌ Error creating admin user: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    create_admin()

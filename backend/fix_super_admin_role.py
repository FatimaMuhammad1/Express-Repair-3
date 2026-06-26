from app.database import SessionLocal
from app.models import User

db = SessionLocal()

# Fix SUPER_ADMIN role to uppercase
super_admin = db.query(User).filter(User.email == "prudence.services1@gmail.com").first()
if super_admin:
    print(f"Current role: {super_admin.role}")
    super_admin.role = "SUPER_ADMIN"
    db.commit()
    print(f"Updated role to: SUPER_ADMIN")
else:
    print("SUPER_ADMIN user not found")

# Also fix STAFF email if needed
staff = db.query(User).filter(User.email == "staff@example.com").first()
if staff:
    print(f"\nSTAFF user found: {staff.email}")
    print(f"Current role: {staff.role}")
    print(f"Is Verified: {staff.is_verified}")
    print(f"Is Active: {staff.is_active}")
else:
    print("\nSTAFF user not found")

db.close()

from app.database import SessionLocal
from app.models import User

db = SessionLocal()

print("=== ALL USERS IN DATABASE ===")
users = db.query(User).all()
for user in users:
    print(f"Email: {user.email}")
    print(f"  Name: {user.name}")
    print(f"  Role: {user.role}")
    print(f"  Is Verified: {user.is_verified}")
    print(f"  Is Active: {user.is_active}")
    print()

db.close()

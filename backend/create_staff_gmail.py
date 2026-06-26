from app.database import SessionLocal
from app.models import User
from app.utils.helpers import hash_password

STAFF_EMAIL = "staff@gmail.com"
STAFF_NAME = "Staff User"
STAFF_PASSWORD = "staff123"

db = SessionLocal()

# Check if staff user already exists
existing_staff = db.query(User).filter(User.email == STAFF_EMAIL).first()
if existing_staff:
    print(f"Staff user with email {STAFF_EMAIL} already exists!")
    print(f"Current role: {existing_staff.role}")
    print(f"Is Verified: {existing_staff.is_verified}")
    print(f"Is Active: {existing_staff.is_active}")
    db.close()
    exit(1)

# Create STAFF user
staff_user = User(
    name=STAFF_NAME,
    email=STAFF_EMAIL,
    password=hash_password(STAFF_PASSWORD),
    role="STAFF",
    is_verified=True,
    is_active=True
)
db.add(staff_user)
db.commit()
db.refresh(staff_user)

print(f"\n✓ STAFF user created successfully!")
print(f"  Email: {STAFF_EMAIL}")
print(f"  Name: {STAFF_NAME}")
print(f"  Password: {STAFF_PASSWORD}")
print(f"  Role: STAFF")

db.close()

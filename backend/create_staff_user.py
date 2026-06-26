from app.database import SessionLocal
from app.models import User
from app.utils.helpers import hash_password

# CHANGE THESE TO YOUR STAFF USER DETAILS
STAFF_EMAIL = "staff@example.com"  # Put staff email here
STAFF_NAME = "Staff User"  # Put staff name here
STAFF_PASSWORD = "staff123"  # Put staff password here

db = SessionLocal()

# Check if staff user already exists
existing_staff = db.query(User).filter(User.email == STAFF_EMAIL).first()
if existing_staff:
    print(f"Staff user with email {STAFF_EMAIL} already exists!")
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
print(f"\nLogin with these credentials to test the STAFF role.")
print(f"STAFF users can only access: Repairs, Customers, Bookings, Finance")

db.close()

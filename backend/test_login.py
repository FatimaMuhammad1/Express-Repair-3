from app.database import SessionLocal
from app.models import User
from app.utils.helpers import verify_password, hash_password

db = SessionLocal()

print("=== TESTING LOGIN CREDENTIALS ===")

# Test SUPER_ADMIN
super_admin = db.query(User).filter(User.email == "prudence.services1@gmail.com").first()
if super_admin:
    print(f"\nSUPER_ADMIN: {super_admin.email}")
    print(f"Role: {super_admin.role}")
    print(f"Stored password hash: {super_admin.password[:50]}...")
    
    # Test with known password
    test_password = "super-useradmin123673"
    if verify_password(test_password, super_admin.password):
        print(f"✓ Password '{test_password}' is CORRECT")
    else:
        print(f"✗ Password '{test_password}' is INCORRECT")
        
        # Try re-hashing to see if it matches
        new_hash = hash_password(test_password)
        print(f"New hash would be: {new_hash[:50]}...")
        print(f"Hashes match: {new_hash == super_admin.password}")

# Test STAFF
staff = db.query(User).filter(User.email == "staff@gmail.com").first()
if staff:
    print(f"\n\nSTAFF: {staff.email}")
    print(f"Role: {staff.role}")
    print(f"Stored password hash: {staff.password[:50]}...")
    
    # Test with known password
    test_password = "staff123"
    if verify_password(test_password, staff.password):
        print(f"✓ Password '{test_password}' is CORRECT")
    else:
        print(f"✗ Password '{test_password}' is INCORRECT")
        
        # Try re-hashing to see if it matches
        new_hash = hash_password(test_password)
        print(f"New hash would be: {new_hash[:50]}...")
        print(f"Hashes match: {new_hash == staff.password}")

db.close()

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from datetime import datetime, timedelta
from app.database import SessionLocal, engine, Base
from app.models import (
    User, UserRole, Repair, RepairStatus, RepairPriority,
    Product, Appointment, AppointmentStatus, ProductCategory, ProductCondition,
    Branch, Expense, StockMovement
)
import hashlib
import uuid

def seed_database():
    db = SessionLocal()
    
    try:
        print("Starting database seeding...")
        
        # Create branches
        branches_data = [
            {"name": "Nuneaton Main", "address": "123 High Street, Nuneaton", "phone": "07415 278767", "email": "nuneaton@fixora.co.uk"},
            {"name": "Coventry", "address": "456 City Centre, Coventry", "phone": "07415 278768", "email": "coventry@fixora.co.uk"},
            {"name": "Leicester", "address": "789 Market Street, Leicester", "phone": "07415 278769", "email": "leicester@fixora.co.uk"},
        ]
        
        branches = []
        for branch_data in branches_data:
            branch = db.query(Branch).filter(Branch.name == branch_data["name"]).first()
            if not branch:
                branch = Branch(**branch_data)
                db.add(branch)
                db.commit()
                db.refresh(branch)
            branches.append(branch)
        
        print(f"Created {len(branches)} branches")
        
        # Create staff users
        staff_data = [
            {"name": "John Smith", "email": "john@fixora.co.uk", "phone": "07700 900001", "role": "technician"},
            {"name": "Sarah Johnson", "email": "sarah@fixora.co.uk", "phone": "07700 900002", "role": "admin"},
            {"name": "Mike Williams", "email": "mike@fixora.co.uk", "phone": "07700 900003", "role": "technician"},
            {"name": "Emma Davis", "email": "emma@fixora.co.uk", "phone": "07700 900004", "role": "staff"},
            {"name": "David Brown", "email": "david@fixora.co.uk", "phone": "07700 900005", "role": "technician"},
        ]
        
        staff_users = []
        for staff_info in staff_data:
            user = db.query(User).filter(User.email == staff_info["email"]).first()
            if not user:
                user = User(
                    email=staff_info["email"],
                    password=hashlib.sha256("password123".encode()).hexdigest(),
                    name=staff_info["name"],
                    phone=staff_info["phone"],
                    role=UserRole[staff_info["role"]],
                    is_verified=True,
                    is_active=True
                )
                db.add(user)
                db.commit()
                db.refresh(user)
            staff_users.append(user)
        
        print(f"Created {len(staff_users)} staff members")
        
        # Create products
        products_data = [
            {"name": "iPhone 14 Screen", "sku": "IPH14-SCR", "category": "Screens", "brand": "Apple", "model": "iPhone 14", "price": 89.99, "stock": 25},
            {"name": "iPhone 13 Screen", "sku": "IPH13-SCR", "category": "Screens", "brand": "Apple", "model": "iPhone 13", "price": 79.99, "stock": 30},
            {"name": "Samsung S23 Screen", "sku": "SAM23-SCR", "category": "Screens", "brand": "Samsung", "model": "Galaxy S23", "price": 94.99, "stock": 20},
            {"name": "iPhone Battery", "sku": "IPH-BAT", "category": "Batteries", "brand": "Apple", "model": "Universal", "price": 29.99, "stock": 50},
            {"name": "Samsung Battery", "sku": "SAM-BAT", "category": "Batteries", "brand": "Samsung", "model": "Universal", "price": 34.99, "stock": 45},
            {"name": "USB-C Charger", "sku": "USB-C-CHG", "category": "Accessories", "brand": "Generic", "model": "65W", "price": 24.99, "stock": 100},
            {"name": "Lightning Cable", "sku": "LIT-CAB", "category": "Accessories", "brand": "Apple", "model": "1m", "price": 14.99, "stock": 150},
            {"name": "Phone Case iPhone 14", "sku": "IPH14-CASE", "category": "Cases", "brand": "Spigen", "model": "iPhone 14", "price": 19.99, "stock": 60},
            {"name": "Laptop Screen 15.6\"", "sku": "LAP-SCR-156", "category": "Screens", "brand": "Generic", "model": "15.6\"", "price": 129.99, "stock": 15},
            {"name": "SSD 512GB", "sku": "SSD-512", "category": "Storage", "brand": "Samsung", "model": "EVO 870", "price": 59.99, "stock": 40},
        ]
        
        products = []
        for prod_data in products_data:
            product = db.query(Product).filter(Product.sku == prod_data["sku"]).first()
            if not product:
                product = Product(**prod_data)
                db.add(product)
                db.commit()
                db.refresh(product)
            
            # Create stock movement for initial inventory
            stock_movement = StockMovement(
                product_id=product.id,
                branch_id=branches[0].id,
                quantity=prod_data["stock"],
                movement_type="in",
                notes="Initial stock"
            )
            db.add(stock_movement)
            db.commit()
            products.append(product)
        
        print(f"Created {len(products)} products")
        
        # Create customers
        customers_data = [
            {"name": "Alice Thompson", "email": "alice@email.com", "phone": "07700 100001"},
            {"name": "Bob Wilson", "email": "bob@email.com", "phone": "07700 100002"},
            {"name": "Carol Taylor", "email": "carol@email.com", "phone": "07700 100003"},
            {"name": "David Evans", "email": "david@email.com", "phone": "07700 100004"},
            {"name": "Emma Roberts", "email": "emma@email.com", "phone": "07700 100005"},
            {"name": "Frank Martin", "email": "frank@email.com", "phone": "07700 100006"},
            {"name": "Grace Lewis", "email": "grace@email.com", "phone": "07700 100007"},
            {"name": "Henry Clark", "email": "henry@email.com", "phone": "07700 100008"},
        ]
        
        customers = []
        for cust_data in customers_data:
            customer = db.query(User).filter(User.email == cust_data["email"]).first()
            if not customer:
                customer = User(
                    email=cust_data["email"],
                    password=hashlib.sha256("password123".encode()).hexdigest(),
                    name=cust_data["name"],
                    phone=cust_data["phone"],
                    role=UserRole.customer,
                    is_verified=True,
                    is_active=True
                )
                db.add(customer)
                db.commit()
                db.refresh(customer)
            customers.append(customer)
        
        print(f"Created {len(customers)} customers")
        
        # Create repairs
        statuses = list(RepairStatus)
        priorities = list(RepairPriority)
        devices = ["iPhone 14", "iPhone 13", "Samsung S23", "MacBook Pro", "Dell XPS", "iPad Pro"]
        issues = ["Screen cracked", "Battery replacement", "Water damage", "Software issue", "Charging port", "Speaker not working"]
        
        for i in range(50):
            customer = customers[i % len(customers)]
            branch = branches[i % len(branches)]
            technician = staff_users[i % len(staff_users)] if i % 3 != 0 else None
            
            created_date = datetime.now() - timedelta(days=i % 30)
            
            repair = Repair(
                tracking_id=f"REP-{1000 + i}",
                customer_id=customer.id,
                customer_name=customer.name,
                customer_phone=customer.phone,
                device_model=devices[i % len(devices)],
                issue_description=issues[i % len(issues)],
                status=statuses[i % len(statuses)],
                technician_id=technician.id if technician else None,
                estimated_cost=29.99 + (i % 10) * 10,
                created_at=created_date
            )
            db.add(repair)
        
        db.commit()
        print("Created 50 repairs")
        
        # Create bookings/appointments
        appointment_statuses = list(AppointmentStatus)
        time_slots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]
        
        for i in range(30):
            customer = customers[i % len(customers)]
            branch = branches[i % len(branches)]
            
            appointment_date = datetime.now() + timedelta(days=i % 14)
            
            booking = Appointment(
                user_id=customer.id,
                customer_name=customer.name,
                customer_phone=customer.phone,
                branch_id=branch.id,
                preferred_date=appointment_date.date(),
                preferred_time_slot=time_slots[i % len(time_slots)],
                status=appointment_statuses[i % len(appointment_statuses)],
                issue_description="Screen Repair" if i % 2 == 0 else "Battery Replacement"
            )
            db.add(booking)
        
        db.commit()
        print("Created 30 bookings")
        
        # Create expenses
        expense_categories = ["Rent", "Utilities", "Supplies", "Marketing", "Salaries", "Insurance"]
        
        for i in range(20):
            branch = branches[i % len(branches)]
            expense_date = datetime.now() - timedelta(days=i % 60)
            
            expense = Expense(
                branch_id=branch.id,
                category=expense_categories[i % len(expense_categories)],
                description=f"{expense_categories[i % len(expense_categories)]} payment",
                amount=100 + (i * 50),
                date=expense_date
            )
            db.add(expense)
        
        db.commit()
        print("Created 20 expenses")
        
        print("\n✅ Database seeding completed successfully!")
        print("Summary:")
        print(f"- {len(branches)} branches")
        print(f"- {len(staff_users)} staff members")
        print(f"- {len(customers)} customers")
        print(f"- {len(products)} products")
        print("- 50 repairs")
        print("- 30 bookings")
        print("- 20 expenses")
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()

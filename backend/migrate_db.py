"""
Database Migration Script
Adds missing columns to existing tables
Run this to update your database schema
"""
import os
from sqlalchemy import text
from app.database import engine, Base
from app.models import Product, Repair

def migrate():
    """Run database migrations"""
    with engine.connect() as conn:
        # Add columns to products table
        try:
            conn.execute(text("ALTER TABLE products ADD COLUMN IF NOT EXISTS reorder_threshold INTEGER DEFAULT 5"))
            print("✓ Added reorder_threshold to products")
        except Exception as e:
            print(f"✗ Failed to add reorder_threshold: {e}")
        
        try:
            conn.execute(text("ALTER TABLE products ADD COLUMN IF NOT EXISTS reorder_quantity INTEGER DEFAULT 10"))
            print("✓ Added reorder_quantity to products")
        except Exception as e:
            print(f"✗ Failed to add reorder_quantity: {e}")
        
        try:
            conn.execute(text("ALTER TABLE products ADD COLUMN IF NOT EXISTS supplier_id UUID REFERENCES suppliers(id) ON DELETE SET NULL"))
            print("✓ Added supplier_id to products")
        except Exception as e:
            print(f"✗ Failed to add supplier_id: {e}")
        
        # Add columns to repairs table
        try:
            conn.execute(text("ALTER TABLE repairs ADD COLUMN IF NOT EXISTS technician_id UUID REFERENCES users(id) ON DELETE SET NULL"))
            print("✓ Added technician_id to repairs")
        except Exception as e:
            print(f"✗ Failed to add technician_id: {e}")
        
        try:
            conn.execute(text("ALTER TABLE repairs ADD COLUMN IF NOT EXISTS priority VARCHAR(20) DEFAULT 'normal'"))
            print("✓ Added priority to repairs")
        except Exception as e:
            print(f"✗ Failed to add priority: {e}")
        
        # Create indexes
        try:
            conn.execute(text("CREATE INDEX IF NOT EXISTS idx_products_supplier ON products(supplier_id)"))
            print("✓ Created index on products.supplier_id")
        except Exception as e:
            print(f"✗ Failed to create supplier_id index: {e}")
        
        try:
            conn.execute(text("CREATE INDEX IF NOT EXISTS idx_repairs_technician ON repairs(technician_id)"))
            print("✓ Created index on repairs.technician_id")
        except Exception as e:
            print(f"✗ Failed to create technician_id index: {e}")
        
        try:
            conn.execute(text("CREATE INDEX IF NOT EXISTS idx_repairs_priority ON repairs(priority)"))
            print("✓ Created index on repairs.priority")
        except Exception as e:
            print(f"✗ Failed to create priority index: {e}")
        
        conn.commit()
        print("\n✅ Migration completed successfully!")

if __name__ == "__main__":
    migrate()

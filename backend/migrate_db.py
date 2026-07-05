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
        
        # Create deleted_items table
        try:
            conn.execute(text("""
                CREATE TABLE IF NOT EXISTS deleted_items (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    original_table VARCHAR(100) NOT NULL,
                    original_record_id VARCHAR(255) NOT NULL,
                    record_data TEXT NOT NULL,
                    item_name VARCHAR(255) NOT NULL,
                    item_type VARCHAR(100) NOT NULL,
                    deleted_by UUID REFERENCES users(id) ON DELETE SET NULL,
                    deleted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
                    hide_from_ui_at TIMESTAMP WITH TIME ZONE NOT NULL,
                    status VARCHAR(20) NOT NULL DEFAULT 'active'
                )
            """))
            print("✓ Created deleted_items table")
        except Exception as e:
            print(f"✗ Failed to create deleted_items table: {e}")
        
        # Create indexes for deleted_items
        try:
            conn.execute(text("CREATE INDEX IF NOT EXISTS idx_deleted_items_original_table ON deleted_items(original_table)"))
            print("✓ Created index on deleted_items.original_table")
        except Exception as e:
            print(f"✗ Failed to create original_table index: {e}")
        
        try:
            conn.execute(text("CREATE INDEX IF NOT EXISTS idx_deleted_items_original_record_id ON deleted_items(original_record_id)"))
            print("✓ Created index on deleted_items.original_record_id")
        except Exception as e:
            print(f"✗ Failed to create original_record_id index: {e}")
        
        try:
            conn.execute(text("CREATE INDEX IF NOT EXISTS idx_deleted_items_item_name ON deleted_items(item_name)"))
            print("✓ Created index on deleted_items.item_name")
        except Exception as e:
            print(f"✗ Failed to create item_name index: {e}")
        
        try:
            conn.execute(text("CREATE INDEX IF NOT EXISTS idx_deleted_items_item_type ON deleted_items(item_type)"))
            print("✓ Created index on deleted_items.item_type")
        except Exception as e:
            print(f"✗ Failed to create item_type index: {e}")
        
        try:
            conn.execute(text("CREATE INDEX IF NOT EXISTS idx_deleted_items_deleted_by ON deleted_items(deleted_by)"))
            print("✓ Created index on deleted_items.deleted_by")
        except Exception as e:
            print(f"✗ Failed to create deleted_by index: {e}")
        
        try:
            conn.execute(text("CREATE INDEX IF NOT EXISTS idx_deleted_items_deleted_at ON deleted_items(deleted_at)"))
            print("✓ Created index on deleted_items.deleted_at")
        except Exception as e:
            print(f"✗ Failed to create deleted_at index: {e}")
        
        try:
            conn.execute(text("CREATE INDEX IF NOT EXISTS idx_deleted_items_hide_from_ui_at ON deleted_items(hide_from_ui_at)"))
            print("✓ Created index on deleted_items.hide_from_ui_at")
        except Exception as e:
            print(f"✗ Failed to create hide_from_ui_at index: {e}")
        
        try:
            conn.execute(text("CREATE INDEX IF NOT EXISTS idx_deleted_items_status ON deleted_items(status)"))
            print("✓ Created index on deleted_items.status")
        except Exception as e:
            print(f"✗ Failed to create status index: {e}")
        
        try:
            conn.execute(text("CREATE INDEX IF NOT EXISTS idx_deleted_items_table_status ON deleted_items(original_table, status)"))
            print("✓ Created composite index on deleted_items(original_table, status)")
        except Exception as e:
            print(f"✗ Failed to create composite index: {e}")
        
        # Add SKU to products table
        try:
            conn.execute(text("ALTER TABLE products ADD COLUMN IF NOT EXISTS sku VARCHAR(100) UNIQUE"))
            print("✓ Added sku to products")
        except Exception as e:
            print(f"✗ Failed to add sku: {e}")
        
        conn.commit()
        print("\n✅ Migration completed successfully!")

if __name__ == "__main__":
    migrate()

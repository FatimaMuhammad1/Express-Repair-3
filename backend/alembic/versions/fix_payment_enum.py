"""Fix payment method enum values

Revision ID: fix_payment_enum
Revises: upgrade_expense_management
Create Date: 2025-07-04 00:45:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy import text

# revision identifiers, used by Alembic.
revision = 'fix_payment_enum'
down_revision = 'upgrade_expense_management'
branch_labels = None
depends_on = None


def upgrade():
    conn = op.get_bind()
    
    # Check if paymentmethod enum exists
    check_enum = text("SELECT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'paymentmethod')")
    enum_exists = conn.execute(check_enum).scalar()
    
    if enum_exists:
        # Get current enum values
        current_values = conn.execute(text("""
            SELECT enumlabel 
            FROM pg_enum 
            WHERE enumtypid = (SELECT oid FROM pg_type WHERE typname = 'paymentmethod')
        """)).fetchall()
        current_values = [v[0] for v in current_values]
        
        # Add missing enum values
        required_values = ['cash', 'card', 'bank_transfer', 'check', 'credit', 'other']
        for value in required_values:
            if value not in current_values:
                conn.execute(text(f"ALTER TYPE paymentmethod ADD VALUE '{value}'"))
    else:
        # Create the enum if it doesn't exist
        conn.execute(text("""
            CREATE TYPE paymentmethod AS ENUM ('cash', 'card', 'bank_transfer', 'check', 'credit', 'other')
        """))
    
    # Check if expensestatus enum exists
    check_status_enum = text("SELECT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'expensestatus')")
    status_enum_exists = conn.execute(check_status_enum).scalar()
    
    if not status_enum_exists:
        # Create the expensestatus enum if it doesn't exist
        conn.execute(text("""
            CREATE TYPE expensestatus AS ENUM ('pending', 'approved', 'rejected', 'paid')
        """))


def downgrade():
    # Note: We cannot remove enum values in PostgreSQL
    pass

"""Add expense source tracking and parts category

Revision ID: add_expense_source_tracking
Revises: 9f2c1a7d0b6e
Create Date: 2025-07-03 23:30:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
from sqlalchemy import text

# revision identifiers, used by Alembic.
revision = 'add_expense_source_tracking'
down_revision = '9f2c1a7d0b6e'
branch_labels = None
depends_on = None


def upgrade():
    # Add new columns to expenses table
    op.add_column('expenses', sa.Column('source_type', sa.String(length=50), nullable=True))
    op.add_column('expenses', sa.Column('source_id', sa.UUID(), nullable=True))
    
    # Update expense_category enum to include 'parts'
    # PostgreSQL doesn't support IF NOT EXISTS with ALTER TYPE ADD VALUE
    # So we need to check if the value exists first
    conn = op.get_bind()
    
    # Check if 'parts' already exists in the enum
    check_query = text("SELECT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'parts' AND enumtypid = 'expensecategory'::regtype)")
    exists = conn.execute(check_query).scalar()
    
    if not exists:
        op.execute("ALTER TYPE expensecategory ADD VALUE 'parts'")
    
    # Create index for source tracking
    op.create_index('idx_expenses_source', 'expenses', ['source_type', 'source_id'])


def downgrade():
    # Drop index
    op.drop_index('idx_expenses_source', table_name='expenses')
    
    # Drop new columns
    op.drop_column('expenses', 'source_id')
    op.drop_column('expenses', 'source_type')
    
    # Note: We cannot remove enum values in PostgreSQL, so 'parts' will remain in the enum

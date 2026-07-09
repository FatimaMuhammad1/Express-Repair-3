"""add supplier_code to suppliers table

Revision ID: add_supplier_code
Revises: 
Create Date: 2026-07-08

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'add_supplier_code'
down_revision = 'upgrade_expense_management'
branch_labels = None
depends_on = None


def upgrade():
    # Add supplier_code column to suppliers table
    op.add_column('suppliers', sa.Column('supplier_code', sa.String(50), nullable=True, unique=True))
    op.create_index('ix_suppliers_supplier_code', 'suppliers', ['supplier_code'])


def downgrade():
    # Remove supplier_code column from suppliers table
    op.drop_index('ix_suppliers_supplier_code', 'suppliers')
    op.drop_column('suppliers', 'supplier_code')

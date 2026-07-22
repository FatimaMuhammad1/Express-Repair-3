"""add payment status to repairs

Revision ID: add_payment_status_to_repairs
Revises: add_business_owner_role
Create Date: 2026-07-22

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import ENUM

# revision identifiers, used by Alembic.
revision = 'add_payment_status_to_repairs'
down_revision = 'add_business_owner_role'
branch_labels = None
depends_on = None


def upgrade():
    # Create the RepairPaymentStatus enum
    repair_payment_status_enum = ENUM('pending', 'partially_paid', 'paid', name='repairpaymentstatus')
    repair_payment_status_enum.create(op.get_bind(), checkfirst=True)
    
    # Add payment_status column to repairs table
    op.add_column('repairs', sa.Column('payment_status', repair_payment_status_enum, nullable=False, server_default='pending'))
    
    # Add payment_method column to repairs table
    op.add_column('repairs', sa.Column('payment_method', sa.String(50), nullable=True))


def downgrade():
    # Remove payment_method column
    op.drop_column('repairs', 'payment_method')
    
    # Remove payment_status column
    op.drop_column('repairs', 'payment_status')
    
    # Drop the enum
    ENUM(name='repairpaymentstatus').drop(op.get_bind(), checkfirst=True)

"""add notification fields to repairs

Revision ID: add_notification_fields
Revises: add_deposit_paid_to_repairs
Create Date: 2026-07-11 20:25:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'add_notification_fields'
down_revision = 'add_deposit_paid_to_repairs'
branch_labels = None
depends_on = None


def upgrade():
    # Add customer_email column
    op.add_column('repairs', sa.Column('customer_email', sa.String(255), nullable=True, index=True))
    
    # Add notification_preference column with default 'email'
    op.add_column('repairs', sa.Column('notification_preference', sa.String(20), nullable=True, server_default='email'))


def downgrade():
    # Remove notification_preference column
    op.drop_column('repairs', 'notification_preference')
    
    # Remove customer_email column
    op.drop_column('repairs', 'customer_email')

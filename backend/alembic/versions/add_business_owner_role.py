"""add business owner role

Revision ID: add_business_owner_role
Revises: add_deposit_paid_to_repairs
Create Date: 2026-07-12

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'add_business_owner_role'
down_revision = 'add_notification_fields'
branch_labels = None
depends_on = None


def upgrade():
    # Add BUSINESS_OWNER to the userrole enum
    op.execute("ALTER TYPE userrole ADD VALUE IF NOT EXISTS 'BUSINESS_OWNER'")


def downgrade():
    # Remove BUSINESS_OWNER from the userrole enum
    # Note: PostgreSQL doesn't support removing enum values directly
    # This would require recreating the type, which is complex
    # For simplicity, we'll just document this limitation
    pass

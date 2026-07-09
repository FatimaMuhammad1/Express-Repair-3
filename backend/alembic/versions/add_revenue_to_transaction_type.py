"""add revenue to transaction type enum

Revision ID: add_revenue_to_transaction_type
Revises: merge_heads
Create Date: 2026-07-09

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'add_revenue_to_transaction_type'
down_revision = 'merge_heads'
branch_labels = None
depends_on = None


def upgrade():
    # Add 'revenue' to the transactiontype enum
    op.execute("ALTER TYPE transactiontype ADD VALUE 'revenue'")


def downgrade():
    # Remove 'revenue' from the transactiontype enum
    # Note: PostgreSQL doesn't support removing enum values directly
    # This would require recreating the type, which is complex
    pass

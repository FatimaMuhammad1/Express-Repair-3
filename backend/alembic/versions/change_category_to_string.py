"""change category to string

Revision ID: change_category_to_string
Revises: upgrade_expense_management
Create Date: 2026-07-09

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'change_category_to_string'
down_revision = 'upgrade_expense_management'
branch_labels = None
depends_on = None


def upgrade():
    # Change category column from enum to varchar
    op.execute("ALTER TABLE products ALTER COLUMN category TYPE VARCHAR(100)")


def downgrade():
    # Revert back to enum (would need to recreate enum type)
    op.execute("ALTER TABLE products ALTER COLUMN category TYPE VARCHAR(100)")

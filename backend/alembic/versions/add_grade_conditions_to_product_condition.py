"""add grade conditions to product condition

Revision ID: add_grade_conditions_to_product_condition
Revises: add_payment_status_to_repairs
Create Date: 2026-07-25

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import ENUM

# revision identifiers, used by Alembic.
revision = 'add_grade_conditions_to_product_condition'
down_revision = 'add_payment_status_to_repairs'
branch_labels = None
depends_on = None


def upgrade():
    # Add new values to the existing productcondition enum
    op.execute("ALTER TYPE productcondition ADD VALUE 'grade_a_plus' IF NOT EXISTS")
    op.execute("ALTER TYPE productcondition ADD VALUE 'grade_a' IF NOT EXISTS")
    op.execute("ALTER TYPE productcondition ADD VALUE 'grade_b' IF NOT EXISTS")
    op.execute("ALTER TYPE productcondition ADD VALUE 'grade_c' IF NOT EXISTS")


def downgrade():
    # PostgreSQL doesn't support removing enum values directly
    # To revert, you would need to create a new enum without these values
    # and migrate the data, but for simplicity we'll leave the values in place
    pass

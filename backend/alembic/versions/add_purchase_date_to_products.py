"""add purchase_date to products

Revision ID: add_purchase_date
Revises: add_grade_conds
Create Date: 2026-07-30

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import DATE

# revision identifiers, used by Alembic.
revision = 'add_purchase_date'
down_revision = 'add_grade_conds'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('products', sa.Column('purchase_date', DATE(), nullable=True))


def downgrade():
    op.drop_column('products', 'purchase_date')

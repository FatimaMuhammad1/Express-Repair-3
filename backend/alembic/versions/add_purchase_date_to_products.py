"""add received_date to products

Revision ID: add_received_date_products
Revises: add_grade_conds
Create Date: 2026-07-31

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import DATE

# revision identifiers, used by Alembic.
revision = 'add_received_date_products'
down_revision = 'add_grade_conds'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('products', sa.Column('received_date', DATE(), nullable=True))


def downgrade():
    op.drop_column('products', 'received_date')

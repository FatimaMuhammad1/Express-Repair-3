"""add deposit_paid to repairs

Revision ID: add_deposit_paid_to_repairs
Revises: add_revenue_to_transaction_type
Create Date: 2026-07-10

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'add_deposit_paid_to_repairs'
down_revision = 'add_revenue_to_transaction_type'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('repairs', sa.Column('deposit_paid', sa.Numeric(10, 2), nullable=False, server_default='0.00'))


def downgrade():
    op.drop_column('repairs', 'deposit_paid')

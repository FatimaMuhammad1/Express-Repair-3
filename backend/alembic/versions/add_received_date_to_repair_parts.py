"""add received_date to repair parts inventory

Revision ID: add_received_date
Revises: add_repair_parts_tracking
Create Date: 2026-07-31

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import DATE

# revision identifiers, used by Alembic.
revision = 'add_received_date'
down_revision = 'add_repair_parts_tracking'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('repair_parts_inventory', sa.Column('received_date', DATE(), nullable=True))


def downgrade():
    op.drop_column('repair_parts_inventory', 'received_date')

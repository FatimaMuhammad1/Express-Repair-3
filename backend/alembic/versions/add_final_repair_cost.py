"""add final_repair_cost to repairs

Revision ID: add_final_repair_cost
Revises: merge_heads
Create Date: 2026-08-05 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'add_final_repair_cost'
down_revision = 'merge_heads'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('repairs', sa.Column('final_repair_cost', sa.Numeric(10, 2), nullable=True))


def downgrade():
    op.drop_column('repairs', 'final_repair_cost')

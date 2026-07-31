"""add repair parts tracking to repairs

Revision ID: add_repair_parts_tracking
Revises: add_received_date_products
Create Date: 2026-07-30

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID

# revision identifiers, used by Alembic.
revision = 'add_repair_parts_tracking'
down_revision = 'add_received_date_products'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('repairs', sa.Column('repair_part_id', UUID(as_uuid=True), nullable=True))
    op.add_column('repairs', sa.Column('repair_notes', sa.Text(), nullable=True))
    op.create_foreign_key('fk_repair_part_id', 'repairs', 'repair_parts_inventory', ['repair_part_id'], ['id'], ondelete='SET NULL')
    op.create_index('ix_repairs_repair_part_id', 'repairs', ['repair_part_id'])


def downgrade():
    op.drop_index('ix_repairs_repair_part_id', table_name='repairs')
    op.drop_constraint('fk_repair_part_id', 'repairs', type_='foreignkey')
    op.drop_column('repairs', 'repair_notes')
    op.drop_column('repairs', 'repair_part_id')

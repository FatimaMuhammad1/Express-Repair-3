"""add payment_type, repair_id, and staff_member to transactions

Revision ID: add_payment_type_to_transactions
Revises: add_final_repair_cost
Create Date: 2026-08-05 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'add_payment_type_to_transactions'
down_revision = 'add_final_repair_cost'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('transactions', sa.Column('payment_type', sa.String(50), nullable=True))
    op.add_column('transactions', sa.Column('repair_id', sa.UUID(as_uuid=True), nullable=True))
    op.create_index('idx_transactions_repair_id', 'transactions', ['repair_id'])
    op.add_column('transactions', sa.Column('staff_member', sa.String(255), nullable=True))
    op.create_foreign_key('fk_transactions_repair_id', 'transactions', 'repairs', ['repair_id'], ondelete='SET NULL')


def downgrade():
    op.drop_constraint('fk_transactions_repair_id', 'transactions', type_='foreignkey')
    op.drop_index('idx_transactions_repair_id', table_name='transactions')
    op.drop_column('transactions', 'staff_member')
    op.drop_column('transactions', 'repair_id')
    op.drop_column('transactions', 'payment_type')

"""Upgrade expense management to ERP-grade system

Revision ID: upgrade_expense_management
Revises: add_expense_source_tracking
Create Date: 2025-07-04 00:30:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
from sqlalchemy import text

# revision identifiers, used by Alembic.
revision = 'upgrade_expense_management'
down_revision = 'add_expense_source_tracking'
branch_labels = None
depends_on = None


def upgrade():
    # Add new columns to expenses table (all nullable initially for existing data)
    op.add_column('expenses', sa.Column('tax_amount', sa.Numeric(10, 2), nullable=True))
    op.add_column('expenses', sa.Column('total_amount', sa.Numeric(10, 2), nullable=True))
    op.add_column('expenses', sa.Column('supplier_id', sa.UUID(), nullable=True))
    op.add_column('expenses', sa.Column('payment_method', sa.Enum('cash', 'card', 'bank_transfer', 'check', 'credit', 'other', name='paymentmethod'), nullable=True))
    op.add_column('expenses', sa.Column('status', sa.Enum('pending', 'approved', 'rejected', 'paid', name='expensestatus'), nullable=True))
    op.add_column('expenses', sa.Column('receipt_path', sa.String(500), nullable=True))
    op.add_column('expenses', sa.Column('notes', sa.Text(), nullable=True))
    op.add_column('expenses', sa.Column('created_by', sa.UUID(), nullable=True))
    op.add_column('expenses', sa.Column('approved_by', sa.UUID(), nullable=True))
    op.add_column('expenses', sa.Column('approved_at', sa.DateTime(timezone=True), nullable=True))
    op.add_column('expenses', sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True))

    # Add foreign key constraints
    op.create_foreign_key('fk_expenses_supplier_id', 'expenses', 'suppliers', ['supplier_id'], ['id'], ondelete='SET NULL')
    op.create_foreign_key('fk_expenses_created_by', 'expenses', 'users', ['created_by'], ['id'], ondelete='SET NULL')
    op.create_foreign_key('fk_expenses_approved_by', 'expenses', 'users', ['approved_by'], ['id'], ondelete='SET NULL')

    # Create new indexes
    op.create_index('idx_expenses_status_date', 'expenses', ['status', 'date'])
    op.create_index('idx_expenses_supplier_date', 'expenses', ['supplier_id', 'date'])

    # Create expense_history table (check if it doesn't exist first)
    conn = op.get_bind()
    check_table = text("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'expense_history')")
    table_exists = conn.execute(check_table).scalar()

    if not table_exists:
        op.create_table(
            'expense_history',
            sa.Column('id', sa.UUID(), nullable=False),
            sa.Column('expense_id', sa.UUID(), nullable=False),
            sa.Column('action', sa.String(50), nullable=False),
            sa.Column('user_id', sa.UUID(), nullable=True),
            sa.Column('changes', sa.Text(), nullable=True),
            sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
            sa.ForeignKeyConstraint(['expense_id'], ['expenses.id'], ondelete='CASCADE'),
            sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='SET NULL'),
            sa.PrimaryKeyConstraint('id')
        )
        op.create_index('idx_expense_history_expense_created', 'expense_history', ['expense_id', 'created_at'])
        op.create_index('idx_expense_history_action_created', 'expense_history', ['action', 'created_at'])

    # Update existing expenses to have default values
    conn = op.get_bind()
    conn.execute(text("UPDATE expenses SET total_amount = amount WHERE total_amount IS NULL"))
    conn.execute(text("UPDATE expenses SET tax_amount = 0 WHERE tax_amount IS NULL"))
    conn.execute(text("UPDATE expenses SET status = 'pending' WHERE status IS NULL"))

    # Now make columns NOT NULL
    op.alter_column('expenses', 'total_amount', nullable=False)
    op.alter_column('expenses', 'status', nullable=False)

    # Add check constraints
    op.execute("ALTER TABLE expenses ADD CONSTRAINT check_expense_tax_positive CHECK (tax_amount >= 0)")
    op.execute("ALTER TABLE expenses ADD CONSTRAINT check_expense_total_positive CHECK (total_amount >= 0)")


def downgrade():
    # Drop check constraints
    op.execute("ALTER TABLE expenses DROP CONSTRAINT IF EXISTS check_expense_total_positive")
    op.execute("ALTER TABLE expenses DROP CONSTRAINT IF EXISTS check_expense_tax_positive")

    # Drop expense_history table
    op.drop_index('idx_expense_history_action_created', table_name='expense_history')
    op.drop_index('idx_expense_history_expense_created', table_name='expense_history')
    op.drop_table('expense_history')

    # Drop new indexes
    op.drop_index('idx_expenses_supplier_date', table_name='expenses')
    op.drop_index('idx_expenses_status_date', table_name='expenses')

    # Drop foreign key constraints
    op.drop_constraint('fk_expenses_approved_by', 'expenses', type_='foreignkey')
    op.drop_constraint('fk_expenses_created_by', 'expenses', type_='foreignkey')
    op.drop_constraint('fk_expenses_supplier_id', 'expenses', type_='foreignkey')

    # Drop new columns
    op.drop_column('expenses', 'updated_at')
    op.drop_column('expenses', 'approved_at')
    op.drop_column('expenses', 'approved_by')
    op.drop_column('expenses', 'created_by')
    op.drop_column('expenses', 'notes')
    op.drop_column('expenses', 'receipt_path')
    op.drop_column('expenses', 'status')
    op.drop_column('expenses', 'payment_method')
    op.drop_column('expenses', 'supplier_id')
    op.drop_column('expenses', 'total_amount')
    op.drop_column('expenses', 'tax_amount')

    # Note: We cannot remove enum values in PostgreSQL, so they will remain

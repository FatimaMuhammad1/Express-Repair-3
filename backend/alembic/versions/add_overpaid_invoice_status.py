"""add overpaid status to invoices

Revision ID: add_overpaid_invoice_status
Revises: add_payment_type_to_transactions
Create Date: 2026-08-05 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'add_overpaid_invoice_status'
down_revision = 'add_payment_type_to_transactions'
branch_labels = None
depends_on = None


def upgrade():
    # PostgreSQL ENUM modification requires ALTER TYPE
    op.execute("ALTER TYPE invoicestatus ADD VALUE IF NOT EXISTS 'overpaid'")
    # Remove the check constraint that prevented overpayments
    op.drop_constraint('check_deposit_not_exceed_total', 'invoices', type_='check')


def downgrade():
    # Add back the constraint
    op.create_check_constraint('check_deposit_not_exceed_total', 'invoices', 'deposit_paid <= amount')
    # Cannot remove ENUM value in PostgreSQL easily, so we leave it

"""merge payment tracking branches

Revision ID: merge_payment_branches
Revises: add_overpaid_invoice_status, add_received_date
Create Date: 2026-08-05

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'merge_payment_branches'
down_revision: Union[str, Sequence[str], None] = ('add_overpaid_invoice_status', 'add_received_date')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass

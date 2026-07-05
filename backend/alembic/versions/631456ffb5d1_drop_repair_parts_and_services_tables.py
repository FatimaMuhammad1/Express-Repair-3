"""drop_repair_parts_and_services_tables

Revision ID: 631456ffb5d1
Revises: 83ea0c6ae92c
Create Date: 2026-07-05 18:22:50.813849

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '631456ffb5d1'
down_revision: Union[str, Sequence[str], None] = '83ea0c6ae92c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.drop_table('repair_parts')
    op.drop_table('services')


def downgrade() -> None:
    """Downgrade schema."""
    pass

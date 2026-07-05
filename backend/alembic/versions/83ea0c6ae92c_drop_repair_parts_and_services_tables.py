"""drop_repair_parts_and_services_tables

Revision ID: 83ea0c6ae92c
Revises: 14bbb3782c0d
Create Date: 2026-07-05 18:21:33.264014

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '83ea0c6ae92c'
down_revision: Union[str, Sequence[str], None] = '14bbb3782c0d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass

"""Add purchase order approval columns

Revision ID: 9f2c1a7d0b6e
Revises: 88063ce506d6
Create Date: 2026-07-01 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "9f2c1a7d0b6e"
down_revision: Union[str, Sequence[str], None] = "88063ce506d6"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("purchase_orders", sa.Column("requested_by", sa.UUID(), nullable=True))
    op.add_column("purchase_orders", sa.Column("approved_by", sa.UUID(), nullable=True))
    op.add_column("purchase_orders", sa.Column("approved_at", sa.DateTime(), nullable=True))
    op.add_column("purchase_orders", sa.Column("rejection_reason", sa.Text(), nullable=True))
    op.create_foreign_key(
        "fk_purchase_orders_requested_by_users",
        "purchase_orders",
        "users",
        ["requested_by"],
        ["id"],
        ondelete="SET NULL",
    )
    op.create_foreign_key(
        "fk_purchase_orders_approved_by_users",
        "purchase_orders",
        "users",
        ["approved_by"],
        ["id"],
        ondelete="SET NULL",
    )


def downgrade() -> None:
    op.drop_constraint("fk_purchase_orders_approved_by_users", "purchase_orders", type_="foreignkey")
    op.drop_constraint("fk_purchase_orders_requested_by_users", "purchase_orders", type_="foreignkey")
    op.drop_column("purchase_orders", "rejection_reason")
    op.drop_column("purchase_orders", "approved_at")
    op.drop_column("purchase_orders", "approved_by")
    op.drop_column("purchase_orders", "requested_by")

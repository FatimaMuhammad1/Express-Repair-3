"""
Background tasks for scheduled jobs
"""

from datetime import date, datetime
from sqlalchemy import text
from app.database import SessionLocal
from app.models import Invoice, InvoiceStatus


def update_overdue_invoices():
    """
    Update invoice status to overdue when due date has passed and invoice is not paid.
    This should be run as a scheduled job (e.g., daily).
    """
    db = SessionLocal()
    try:
        # Find invoices that are:
        # - Not paid (status is pending or partial)
        # - Have a due date
        # - Due date is in the past
        # - Not already marked as overdue
        overdue_invoices = db.query(Invoice).filter(
            Invoice.status.in_([InvoiceStatus.pending, InvoiceStatus.partial]),
            Invoice.due_date.isnot(None),
            Invoice.due_date < date.today()
        ).all()
        
        updated_count = 0
        for invoice in overdue_invoices:
            invoice.status = InvoiceStatus.overdue
            updated_count += 1
        
        db.commit()
        print(f"Updated {updated_count} invoices to overdue status")
        return updated_count
    except Exception as e:
        db.rollback()
        print(f"Error updating overdue invoices: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    # Run the task directly for testing
    update_overdue_invoices()

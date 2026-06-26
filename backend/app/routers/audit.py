from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import and_
from datetime import datetime, date, timedelta
from typing import Optional
import csv
from io import StringIO

from app.database import get_db
from app.models import AuditLog, User
from app.dependencies import get_current_user, require_roles

router = APIRouter(prefix="/api/audit-logs", tags=["Audit Logs"])


@router.get("/")
async def get_audit_logs(
    days: int = Query(7, ge=1, le=365),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "SUPER_ADMIN"))
):
    """Get audit logs for a given period"""
    
    start_date = datetime.utcnow() - timedelta(days=days)
    
    logs = db.query(AuditLog).filter(
        AuditLog.created_at >= start_date
    ).order_by(AuditLog.created_at.desc()).limit(200).all()
    
    return {
        "success": True,
        "logs": [
            {
                "id": str(log.id),
                "user_id": str(log.user_id) if log.user_id else None,
                "user_name": log.user.name if log.user else "System",
                "action": log.action,
                "entity": log.entity,
                "entity_id": log.entity_id,
                "previous_value": log.previous_value,
                "new_value": log.new_value,
                "ip_address": log.ip_address,
                "user_agent": log.user_agent,
                "created_at": log.created_at.isoformat(),
            }
            for log in logs
        ]
    }


@router.get("/export")
async def export_audit_logs(
    days: int = Query(7, ge=1, le=365),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "SUPER_ADMIN"))
):
    """Export audit logs as CSV"""
    
    start_date = datetime.utcnow() - timedelta(days=days)
    
    logs = db.query(AuditLog).filter(
        AuditLog.created_at >= start_date
    ).order_by(AuditLog.created_at.desc()).all()
    
    # Create CSV
    output = StringIO()
    writer = csv.writer(output)
    writer.writerow([
        "Date", "User", "Action", "Entity", "Entity ID", 
        "Previous Value", "New Value", "IP Address", "User Agent"
    ])
    
    for log in logs:
        writer.writerow([
            log.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            log.user.name if log.user else "System",
            log.action,
            log.entity,
            log.entity_id,
            log.previous_value,
            log.new_value,
            log.ip_address,
            log.user_agent,
        ])
    
    output.seek(0)
    
    from fastapi.responses import Response
    return Response(
        content=output.getvalue(),
        media_type="text/csv",
        headers={
            "Content-Disposition": f"attachment; filename=audit_logs_{datetime.now().strftime('%Y%m%d')}.csv"
        }
    )


@router.delete("/clear")
async def clear_audit_logs(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "SUPER_ADMIN"))
):
    """Clear all audit logs"""
    
    db.query(AuditLog).delete()
    db.commit()
    
    return {"success": True}

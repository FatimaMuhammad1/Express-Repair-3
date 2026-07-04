from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, date, timedelta
from typing import Optional

from app.database import get_db
from app.models import Warranty, WarrantyHistory, Repair, User
from app.dependencies import get_current_user

router = APIRouter(prefix="/api/warranty", tags=["Warranty"])


def parse_date(value: str | None) -> date | None:
    if not value:
        return None
    return datetime.fromisoformat(value.replace("Z", "+00:00")).date()


@router.get("/repairs/{repair_id}")
async def get_warranty(
    repair_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get warranty for a repair"""
    
    warranty = db.query(Warranty).filter(Warranty.repair_id == repair_id).first()
    
    if not warranty:
        return {"success": True, "warranty": None}
    
    return {
        "success": True,
        "warranty": {
            "id": str(warranty.id),
            "repair_id": str(warranty.repair_id),
            "duration": warranty.duration,
            "start_date": warranty.start_date.isoformat(),
            "expiration_date": warranty.expiration_date.isoformat(),
            "notes": warranty.notes,
        }
    }


@router.post("/repairs/{repair_id}")
async def create_warranty(
    repair_id: str,
    warranty_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create or update warranty for a repair"""
    
    repair = db.query(Repair).filter(Repair.id == repair_id).first()
    if not repair:
        raise HTTPException(status_code=404, detail="Repair not found")
    
    # Check if warranty already exists
    existing = db.query(Warranty).filter(Warranty.repair_id == repair_id).first()
    
    if existing:
        # Update existing warranty
        existing.duration = warranty_data.get("duration", existing.duration)
        existing.start_date = parse_date(warranty_data.get("start_date")) or existing.start_date
        existing.expiration_date = parse_date(warranty_data.get("expiration_date")) or existing.expiration_date
        existing.notes = warranty_data.get("notes", existing.notes)
        db.commit()
        
        # Add to history
        history = WarrantyHistory(
            warranty_id=existing.id,
            action="Updated warranty",
            user_id=current_user.id,
        )
        db.add(history)
        db.commit()
        
        return {"success": True, "warranty_id": str(existing.id)}
    
    # Create new warranty
    start_date = parse_date(warranty_data.get("start_date")) or date.today()
    duration = warranty_data.get("duration", 90)
    expiration_date = start_date + timedelta(days=duration)
    
    warranty = Warranty(
        repair_id=repair_id,
        duration=duration,
        start_date=start_date,
        expiration_date=expiration_date,
        notes=warranty_data.get("notes"),
    )
    db.add(warranty)
    db.commit()
    db.refresh(warranty)
    
    # Add to history
    history = WarrantyHistory(
        warranty_id=warranty.id,
        action="Created warranty",
        user_id=current_user.id,
    )
    db.add(history)
    db.commit()
    
    return {"success": True, "warranty_id": str(warranty.id)}


@router.post("/repairs/{repair_id}/extend")
async def extend_warranty(
    repair_id: str,
    extend_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Extend warranty for a repair"""
    
    warranty = db.query(Warranty).filter(Warranty.repair_id == repair_id).first()
    if not warranty:
        raise HTTPException(status_code=404, detail="Warranty not found")
    
    additional_days = extend_data.get("additional_days", 0)
    new_expiration = parse_date(extend_data.get("new_expiration_date")) or warranty.expiration_date + timedelta(days=additional_days)
    
    warranty.expiration_date = new_expiration
    db.commit()
    
    # Add to history
    history = WarrantyHistory(
        warranty_id=warranty.id,
        action=f"Extended warranty by {additional_days} days",
        user_id=current_user.id,
    )
    db.add(history)
    db.commit()
    
    return {"success": True}


@router.get("/repairs/{repair_id}/history")
async def get_warranty_history(
    repair_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get warranty history for a repair"""
    
    warranty = db.query(Warranty).filter(Warranty.repair_id == repair_id).first()
    if not warranty:
        return {"success": True, "history": []}
    
    history = db.query(WarrantyHistory).filter(
        WarrantyHistory.warranty_id == warranty.id
    ).order_by(WarrantyHistory.created_at.desc()).all()
    
    return {
        "success": True,
        "history": [
            {
                "id": str(h.id),
                "action": h.action,
                "user_id": str(h.user_id) if h.user_id else None,
                "created_at": h.created_at.isoformat(),
            }
            for h in history
        ]
    }

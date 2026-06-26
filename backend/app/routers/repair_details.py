from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from typing import Optional

from app.database import get_db
from app.models import Repair, RepairTimeline, TechnicianNote, InternalComment, User
from app.dependencies import get_current_user

router = APIRouter(prefix="/repairs", tags=["Repair Details"])


@router.get("/{repair_id}/timeline")
async def get_repair_timeline(
    repair_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get repair timeline/history"""
    
    repair = db.query(Repair).filter(Repair.id == repair_id).first()
    if not repair:
        raise HTTPException(status_code=404, detail="Repair not found")
    
    timeline = db.query(RepairTimeline).filter(
        RepairTimeline.repair_id == repair_id
    ).order_by(RepairTimeline.created_at.desc()).all()
    
    return {
        "success": True,
        "timeline": [
            {
                "id": str(t.id),
                "type": t.type,
                "title": t.title,
                "description": t.description,
                "user_id": str(t.user_id) if t.user_id else None,
                "created_at": t.created_at.isoformat(),
            }
            for t in timeline
        ]
    }


@router.post("/{repair_id}/timeline")
async def add_timeline_entry(
    repair_id: str,
    timeline_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Add entry to repair timeline"""
    
    repair = db.query(Repair).filter(Repair.id == repair_id).first()
    if not repair:
        raise HTTPException(status_code=404, detail="Repair not found")
    
    entry = RepairTimeline(
        repair_id=repair_id,
        type=timeline_data.get("type", "note"),
        title=timeline_data.get("title", ""),
        description=timeline_data.get("description"),
        user_id=current_user.id,
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    
    return {"success": True, "entry": {"id": str(entry.id)}}


@router.get("/{repair_id}/notes")
async def get_technician_notes(
    repair_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get technician notes for a repair"""
    
    repair = db.query(Repair).filter(Repair.id == repair_id).first()
    if not repair:
        raise HTTPException(status_code=404, detail="Repair not found")
    
    notes = db.query(TechnicianNote).filter(
        TechnicianNote.repair_id == repair_id
    ).order_by(TechnicianNote.created_at.desc()).all()
    
    return {
        "success": True,
        "notes": [
            {
                "id": str(n.id),
                "note": n.note,
                "technician_id": str(n.technician_id) if n.technician_id else None,
                "created_at": n.created_at.isoformat(),
            }
            for n in notes
        ]
    }


@router.post("/{repair_id}/notes")
async def add_technician_note(
    repair_id: str,
    note_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Add technician note to a repair"""
    
    repair = db.query(Repair).filter(Repair.id == repair_id).first()
    if not repair:
        raise HTTPException(status_code=404, detail="Repair not found")
    
    note = TechnicianNote(
        repair_id=repair_id,
        technician_id=current_user.id,
        note=note_data.get("note"),
    )
    db.add(note)
    db.commit()
    db.refresh(note)
    
    return {"success": True, "note": {"id": str(note.id)}}


@router.get("/{repair_id}/comments")
async def get_internal_comments(
    repair_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get internal comments for a repair"""
    
    repair = db.query(Repair).filter(Repair.id == repair_id).first()
    if not repair:
        raise HTTPException(status_code=404, detail="Repair not found")
    
    comments = db.query(InternalComment).filter(
        InternalComment.repair_id == repair_id
    ).order_by(InternalComment.created_at.desc()).all()
    
    return {
        "success": True,
        "comments": [
            {
                "id": str(c.id),
                "comment": c.comment,
                "user_id": str(c.user_id) if c.user_id else None,
                "created_at": c.created_at.isoformat(),
            }
            for c in comments
        ]
    }


@router.post("/{repair_id}/comments")
async def add_internal_comment(
    repair_id: str,
    comment_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Add internal comment to a repair"""
    
    repair = db.query(Repair).filter(Repair.id == repair_id).first()
    if not repair:
        raise HTTPException(status_code=404, detail="Repair not found")
    
    comment = InternalComment(
        repair_id=repair_id,
        user_id=current_user.id,
        comment=comment_data.get("comment"),
    )
    db.add(comment)
    db.commit()
    db.refresh(comment)
    
    return {"success": True, "comment": {"id": str(comment.id)}}

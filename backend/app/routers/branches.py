from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from typing import Optional

from app.database import get_db
from app.models import Branch, User
from app.dependencies import get_current_user, require_roles

router = APIRouter(prefix="/api/branches", tags=["Branches"])


@router.get("/")
async def get_branches(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all branches"""
    
    branches = db.query(Branch).filter(Branch.is_active == True).all()
    
    return {
        "success": True,
        "branches": [
            {
                "id": str(b.id),
                "name": b.name,
                "address": b.address,
                "phone": b.phone,
                "email": b.email,
                "is_active": b.is_active,
            }
            for b in branches
        ]
    }


@router.post("/")
async def create_branch(
    branch_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "SUPER_ADMIN"))
):
    """Create a new branch"""
    
    branch = Branch(
        name=branch_data.get("name"),
        address=branch_data.get("address"),
        phone=branch_data.get("phone"),
        email=branch_data.get("email"),
        is_active=branch_data.get("is_active", True),
    )
    db.add(branch)
    db.commit()
    db.refresh(branch)
    
    return {"success": True, "branch_id": str(branch.id)}


@router.put("/{branch_id}")
async def update_branch(
    branch_id: str,
    branch_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "SUPER_ADMIN"))
):
    """Update a branch"""
    
    branch = db.query(Branch).filter(Branch.id == branch_id).first()
    if not branch:
        return {"success": False, "message": "Branch not found"}
    
    branch.name = branch_data.get("name", branch.name)
    branch.address = branch_data.get("address", branch.address)
    branch.phone = branch_data.get("phone", branch.phone)
    branch.email = branch_data.get("email", branch.email)
    branch.is_active = branch_data.get("is_active", branch.is_active)
    branch.updated_at = datetime.utcnow()
    
    db.commit()
    
    return {"success": True}

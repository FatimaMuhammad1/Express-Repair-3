from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID

from app.database import get_db
from app.models import User
from app.dependencies import require_roles
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/api/users", tags=["Users"])

class UserStatusUpdate(BaseModel):
    is_active: bool

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str
    phone: Optional[str] = None

@router.get("/staff")
def get_staff(db: Session = Depends(get_db), _: User = Depends(require_roles("SUPER_ADMIN"))):
    staff = db.query(User).filter(User.role.in_(["staff", "SUPER_ADMIN"])).all()
    return {
        "success": True,
        "staff": [
            {
                "id": str(u.id),
                "name": u.name,
                "email": u.email,
                "role": u.role.value if hasattr(u.role, 'value') else str(u.role),
                "phone": u.phone,
                "is_active": getattr(u, "is_active", True)
            } for u in staff
        ]
    }

@router.put("/{user_id}/status")
def update_user_status(user_id: UUID, body: UserStatusUpdate, db: Session = Depends(get_db), _: User = Depends(require_roles("SUPER_ADMIN"))):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(404, "User not found")
    user.is_active = body.is_active
    db.commit()
    return {"success": True, "message": "User status updated"}

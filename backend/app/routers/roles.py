from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from typing import List

from app.database import get_db
from app.models import Role, Permission, User
from app.dependencies import require_roles
from pydantic import BaseModel

router = APIRouter(prefix="/api/roles", tags=["Roles & Permissions"])


class RoleCreate(BaseModel):
    name: str
    description: str = None


class RoleUpdate(BaseModel):
    name: str = None
    description: str = None
    is_active: bool = None


class PermissionCreate(BaseModel):
    resource: str
    action: str


@router.get("")
def get_roles(db: Session = Depends(get_db), _: User = Depends(require_roles("admin", "SUPER_ADMIN"))):
    roles = db.query(Role).all()
    result = []
    for role in roles:
        permissions = db.query(Permission).filter(Permission.role_id == role.id).all()
        user_count = db.query(User).filter(User.role == role.name).count()
        result.append({
            "id": str(role.id),
            "name": role.name,
            "description": role.description,
            "is_active": role.is_active,
            "permissions": [{"resource": p.resource, "action": p.action} for p in permissions],
            "userCount": user_count
        })
    return {"success": True, "roles": result}


@router.post("")
def create_role(role_data: RoleCreate, db: Session = Depends(get_db), _: User = Depends(require_roles("admin", "SUPER_ADMIN"))):
    existing = db.query(Role).filter(Role.name == role_data.name).first()
    if existing:
        raise HTTPException(400, "Role already exists")
    
    role = Role(name=role_data.name, description=role_data.description)
    db.add(role)
    db.commit()
    db.refresh(role)
    
    return {"success": True, "role": {"id": str(role.id), "name": role.name, "description": role.description}}


@router.put("/{role_id}")
def update_role(role_id: UUID, role_data: RoleUpdate, db: Session = Depends(get_db), _: User = Depends(require_roles("admin", "SUPER_ADMIN"))):
    role = db.query(Role).filter(Role.id == role_id).first()
    if not role:
        raise HTTPException(404, "Role not found")
    
    if role_data.name is not None:
        role.name = role_data.name
    if role_data.description is not None:
        role.description = role_data.description
    if role_data.is_active is not None:
        role.is_active = role_data.is_active
    
    db.commit()
    return {"success": True, "message": "Role updated"}


@router.delete("/{role_id}")
def delete_role(role_id: UUID, db: Session = Depends(get_db), _: User = Depends(require_roles("admin", "SUPER_ADMIN"))):
    role = db.query(Role).filter(Role.id == role_id).first()
    if not role:
        raise HTTPException(404, "Role not found")
    
    if role.name in ["SUPER_ADMIN", "admin", "staff", "technician"]:
        raise HTTPException(400, "Cannot delete default roles")
    
    db.delete(role)
    db.commit()
    return {"success": True, "message": "Role deleted"}


@router.get("/{role_id}/permissions")
def get_role_permissions(role_id: UUID, db: Session = Depends(get_db), _: User = Depends(require_roles("admin", "SUPER_ADMIN"))):
    permissions = db.query(Permission).filter(Permission.role_id == role_id).all()
    return {
        "success": True,
        "permissions": [{"id": str(p.id), "resource": p.resource, "action": p.action} for p in permissions]
    }


@router.post("/{role_id}/permissions")
def add_permission(role_id: UUID, perm_data: PermissionCreate, db: Session = Depends(get_db), _: User = Depends(require_roles("admin", "SUPER_ADMIN"))):
    role = db.query(Role).filter(Role.id == role_id).first()
    if not role:
        raise HTTPException(404, "Role not found")
    
    existing = db.query(Permission).filter(
        Permission.role_id == role_id,
        Permission.resource == perm_data.resource,
        Permission.action == perm_data.action
    ).first()
    
    if existing:
        raise HTTPException(400, "Permission already exists")
    
    permission = Permission(role_id=role_id, resource=perm_data.resource, action=perm_data.action)
    db.add(permission)
    db.commit()
    
    return {"success": True, "message": "Permission added"}


@router.delete("/{role_id}/permissions/{permission_id}")
def remove_permission(role_id: UUID, permission_id: UUID, db: Session = Depends(get_db), _: User = Depends(require_roles("admin", "SUPER_ADMIN"))):
    permission = db.query(Permission).filter(
        Permission.id == permission_id,
        Permission.role_id == role_id
    ).first()
    
    if not permission:
        raise HTTPException(404, "Permission not found")
    
    db.delete(permission)
    db.commit()
    return {"success": True, "message": "Permission removed"}

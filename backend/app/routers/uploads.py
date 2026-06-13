from fastapi import APIRouter, UploadFile, File, HTTPException
import shutil
import os
from datetime import datetime
import uuid
from pathlib import Path

router = APIRouter(prefix="/api/uploads", tags=["Uploads"])

UPLOAD_DIR = "static/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Allowed file extensions
ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "gif", "webp"}
# Max file size: 10MB
MAX_FILE_SIZE = 10 * 1024 * 1024

@router.post("/")
async def upload_file(file: UploadFile = File(...)):
    # Check if file was provided
    if not file or not file.filename:
        raise HTTPException(status_code=400, detail="No file provided.")
    
    # Check file extension
    file_extension = file.filename.split(".")[-1].lower()
    if file_extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid file type. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    
    # Check content type
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File provided is not an image.")
    
    # Check file size
    file.file.seek(0, os.SEEK_END)
    file_size = file.file.tell()
    file.file.seek(0)
    
    if file_size > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400, 
            detail=f"File too large. Maximum size is {MAX_FILE_SIZE / (1024*1024)}MB"
        )
    
    if file_size == 0:
        raise HTTPException(status_code=400, detail="File is empty.")
    
    # Generate unique filename
    unique_filename = f"{uuid.uuid4().hex}_{datetime.now().strftime('%Y%m%d%H%M%S')}.{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    try:
        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Verify file was saved and has content
        if not os.path.exists(file_path):
            raise HTTPException(status_code=500, detail="Failed to save file.")
        
        saved_size = os.path.getsize(file_path)
        if saved_size == 0:
            os.remove(file_path)
            raise HTTPException(status_code=500, detail="Saved file is empty.")
        
        return {
            "success": True, 
            "file_url": f"/{file_path}",
            "filename": unique_filename,
            "size": saved_size,
            "content_type": file.content_type
        }
        
    except Exception as e:
        # Clean up if save failed
        if os.path.exists(file_path):
            try:
                os.remove(file_path)
            except:
                pass
        raise HTTPException(status_code=500, detail=f"Failed to upload file: {str(e)}")

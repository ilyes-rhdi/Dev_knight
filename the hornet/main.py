from fastapi import FastAPI, UploadFile, HTTPException, File, Depends
from fastapi.responses import JSONResponse, FileResponse
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from bson import ObjectId
from typing import Optional
import os



# Create virtual environment with the command 'python -m venv (filename)'
# Then activate it using the command 'filename/Scripts/activate'
# Don't forget to install fastapi and uvicorn 
# To start server type: uvicorn main:app --reload or --host + address

client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client.silk_upload_db
collection = db.files


app = FastAPI()

UPLOAD_FOLDER = 'silk-uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

class Metadata(BaseModel):
    filename: str
    size: int
    description: Optional[str] = None
    mime_type: str


# The upload + save endpoint
@app.post('/upload_file/')
async def upload_file(file: UploadFile = File(...), metadata: Metadata = Depends()):
    try:
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        with open(file_path, 'wb') as buffer:
            buffer.write(await file.read())

        if metadata:
            await collection.insert_one({
                "filename": metadata.filename,
                "size": metadata.size,
                "description": metadata.description,
                "mime_type": metadata.mime_type,
                "file_path": file_path  
            })

        return JSONResponse(content={
            'message': 'Your file has been uploaded successfully by soheib',
            'filename': file.filename,
            'content_type': file.content_type
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload file by soheib: {str(e)}")
        '''
'''    
# Delete file endpoint
@app.delete("/files/{file_id}")
async def delete_file(file_id: str):
    delete_result = await collection.delete_one({"_id": ObjectId(file_id)})
    if delete_result.deleted_count == 1:
        return {"message": "File deleted successfully by soheib"}
    raise HTTPException(status_code=404, detail="File not found")

# Retrieve file metadata endpoint
@app.get("/files/{file_id}")
async def get_file(file_id: str):
    metadata = await collection.find_one({"_id": ObjectId(file_id)})
    if metadata:
        return JSONResponse(content={
            "filename": metadata['filename'],
            "size": metadata['size'],
            "description": metadata.get('description'),
            "mime_type": metadata['mime_type'],
            "file_path": metadata['file_path']
        })
    raise HTTPException(status_code=404, detail="File not found")
    
# Download file endpoint
@app.get("/download/{file_id}", response_class=FileResponse)
async def download_file(file_id: str):
    metadata = await collection.find_one({"_id": ObjectId(file_id)})
    if metadata:
        file_path = metadata['file_path']
        return FileResponse(path=file_path, filename=metadata['filename'])
    raise HTTPException(status_code=404, detail="File not found")



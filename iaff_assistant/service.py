from fastapi import Body, FastAPI, Request, status, UploadFile, File
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from typing import List
import realtime_pipeline, TranslationAgent, SpeechRecognitionAgent

async def get_answer(conversation):
    return await realtime_pipeline.query(jsonable_encoder(conversation))

async def get_translated(content):
    return await TranslationAgent.translate(content.content, content.target_language)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=jsonable_encoder({"error_details": exc.errors(), "example_request": {
            "conversation": [
                {"role": "system", "content": "You an a helpful assistant."},
                {"role": "assistant", "content": "How can I help today?"},
                {"role": "user", "content": "What is a PESEL number?"}
            ],
            "language": "English"
        }}),
    )

class Message(BaseModel):
    role: str
    content: str

class Conversation(BaseModel):
    conversation: List[Message]
    language: str

class Content(BaseModel):
    content: str
    target_language: str

@app.post("/assistant_service/get_response")
async def get_response(conversation: Conversation = Body(...)):   
    return await get_answer(conversation)

@app.post("/assistant_service/translate")
async def translate(content: Content = Body(...)):   
    return await get_translated(content)

@app.post("/assistant_service/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    content = await file.read()
    transcription = await SpeechRecognitionAgent.transcribe(content)
    return transcription

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8085) 
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from app.dependencies import get_service
from app.service import Service
import logging

# put this in a different file
class TextInput(BaseModel):
    text: str

@asynccontextmanager
async def lifespan(app: FastAPI):

    yield

    # add any cleanup afterwards

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.ERROR)

# general case exception handler, improve as we go on 
@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    logging.error(f"Unexpected error: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"error": "Internal Server Error", "details": str(exc)},
    )

# post a sentence to the database which gets stored and analysed 
@app.post("/sentences")
def input_sentence(input_text: TextInput, service: Service=Depends(get_service)):
    service.input_sentence(input_text.text)
    return JSONResponse(
        content={"message": input_text.text}
    )

# show all the sentences in the database 
@app.get("/sentences")
def view_sentences(service: Service=Depends(get_service)):
    return service.get_sentences()

# show all the vocabulary that's been saved
@app.get("/vocabulary")
def view_vocabulary(service: Service=Depends(get_service)):
    return service.get_vocabulary()
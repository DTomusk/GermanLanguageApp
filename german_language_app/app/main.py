from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends
from pydantic import BaseModel
from app.dependencies import get_service
from app.service import Service
from app.database import Base, engine

# put this in a different file
class TextInput(BaseModel):
    text: str

@asynccontextmanager
async def lifespan(app: FastAPI):

    yield

    # add any cleanup afterwards

app = FastAPI(lifespan=lifespan)

@app.post("/sentences")
def input_sentence(input_text: TextInput, service: Service=Depends(get_service)):
    service.input_sentence(input_text.text)

# show all the sentences in the database 
@app.get("/sentences")
def view_sentences(service: Service=Depends(get_service)):
    return service.get_sentences()

# show all the vocabulary that's been saved
@app.get("/vocabulary")
def view_vocabulary(service: Service=Depends(get_service)):
    return service.get_vocabulary()
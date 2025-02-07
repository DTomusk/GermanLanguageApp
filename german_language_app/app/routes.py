from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from app.models import SentenceInput
from app.service import Service
from app.dependencies import get_service

router = APIRouter()

# post a sentence to the database which gets stored and analysed 
@router.post("/sentences")
def input_sentence(input_text: SentenceInput, service: Service=Depends(get_service)):
    doc = service.process_sentence(input_text.text)
    return JSONResponse(
        content={"message": doc}
    )

# show all the sentences in the database 
@router.get("/sentences")
def view_sentences(service: Service=Depends(get_service)):
    return service.get_sentences()

# show all the vocabulary that's been saved
@router.get("/vocabulary")
def view_vocabulary(service: Service=Depends(get_service)):
    return service.get_vocabulary()
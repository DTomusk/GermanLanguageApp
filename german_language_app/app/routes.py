from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from app.models import SentenceInput, WordInput
import app.service as service
from app.dependencies import get_db
from app.data_access import get_sentences, get_vocabulary, get_flashcards, get_flashcard_by_id, get_flashcard_sentences
from sqlalchemy.orm import Session

router = APIRouter()

# post a sentence to the database which gets stored and analysed 
@router.post("/sentences")
def input_sentence(input_text: SentenceInput, db: Session=Depends(get_db)):
    doc = service.process_sentence(db, input_text.text)
    return JSONResponse(
        content={"message": doc},
        status_code=200
    )

# show all the sentences in the database 
@router.get("/sentences")
def view_sentences(db: Session=Depends(get_db)):
    return get_sentences(db)

# show all the vocabulary that's been saved
@router.get("/vocabulary")
def view_vocabulary(db: Session=Depends(get_db)):
    return get_vocabulary(db)

@router.get("/flashcards")
def view_flashcards(db: Session=Depends(get_db)):
    return get_flashcards(db)

@router.post("/flashcards")
def create_flashcard(input_text: WordInput, db: Session=Depends(get_db)):
    return service.add_flashcard(db, input_text.text)

@router.get("/flashcards/{card_id}")
def view_flashcard(card_id: int, db: Session=Depends(get_db)):
    return get_flashcard_by_id(db, card_id)

@router.get("/flashcards/{card_id}/sentences")
def view_flashcard_sentences(card_id: int, db: Session=Depends(get_db)):
    return get_flashcard_sentences(db, card_id)

@router.post("/flashcards/{card_id}")
def add_sentence_to_flashcard(card_id: int, input_text: SentenceInput, db: Session=Depends(get_db)):
    try:
        success = service.add_sentence_to_flashcard(db, card_id, input_text.text)
        return JSONResponse(
            content={"message": success},
            status_code=200
        )
    except Exception as e:
        return JSONResponse(
            content={"message": str(e)},
            status_code=400
        )
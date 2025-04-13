from dataclasses import asdict
from fastapi import APIRouter
from fastapi.responses import JSONResponse

from app.flashcards.reader import Reader
from app.flashcards.service import Service
from app.flashcards.writer import Writer
from app.models.inputs import SentenceInput
from app.nlp_utils import get_nlp


flashcard_router = APIRouter(prefix="/flashcards")
service = Service(Reader(), Writer())

@flashcard_router.get("/", include_in_schema=True)
def get_flashcards():
    flashcards = service.get_all_flashcards()
    flashcard_dict = [asdict(card) for card in flashcards]
    return JSONResponse(
        content={"data": flashcard_dict},
        status_code=200
    )

@flashcard_router.post("/{lemma_id}", include_in_schema=True)
def add_flashcard(lemma_id: int):
    result = service.add_flashcard(lemma_id)
    if result.isSuccess:
        return JSONResponse(
            content={"message": result.message},
            status_code=200
        )
    return JSONResponse(
        content={"message": result.message},
        status_code=400
   )

@flashcard_router.get("/{card_id}/sentences", include_in_schema=True)  
def get_flashcard_sentences(card_id: int):
    sentences = service.get_flashcard_sentences(card_id)
    if sentences:
        return JSONResponse(
            content={"data": sentences},
            status_code=200
        )
    return JSONResponse(
        content={"message": "No sentences found for this flashcard"},
        status_code=404
    )

@flashcard_router.post("/{card_id}/sentence", include_in_schema=True)
def add_sentence_to_flashcard(card_id: int, sentence: SentenceInput):
    nlp = get_nlp()
    result = service.add_sentence_to_flashcard(card_id, sentence, nlp)
    if result.isSuccess:
        return JSONResponse(
            content={"data": [asdict(word) for word in result.words], "message": result.message},
            status_code=200
        )
    return JSONResponse(
        content={"message": result.message},
        status_code=400
    )

# TODO: eventually we might want user preferences for how long practice sessions are
@flashcard_router.get("/session/{number_of_cards}", include_in_schema=True)
def get_practice_session(number_of_cards: int):
    flashcards = service.get_practice_session(number_of_cards)
    flashcard_dict = [asdict(card) for card in flashcards]
    return JSONResponse(
        content={"data": flashcard_dict},
        status_code=200
    )
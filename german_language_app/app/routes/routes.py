from fastapi import APIRouter
from fastapi.responses import JSONResponse
from app.services.service import Service
from app.db_access.reader import Reader
from app.db_access.writer import Writer
from dataclasses import asdict

router = APIRouter(prefix="/api")
service = Service(Reader(), Writer())

# search for a word in the database
# needs to return lemmas along with db ids
@router.get("/search/{search_string}", include_in_schema=True)
def search_words(search_string: str):
    lemmas = service.search_word(search_string, 5)
    lemma_dict = [asdict(lemma) for lemma in lemmas]
    return JSONResponse(
        content={"data": lemma_dict},
        status_code=200
    )

@router.post("/add_flashcard/{lemma_id}", include_in_schema=True)
def add_flashcard(lemma_id: int):
    service.add_flashcard(lemma_id)
    return JSONResponse(
        content={"message": "Flashcard added"},
        status_code=200
   )
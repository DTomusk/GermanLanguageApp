from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from app.services.service import Service
from app.db_access.reader import Reader
from app.db_access.writer import Writer

router = APIRouter(prefix="/api")
service = Service(Reader(), Writer())

# search for a word in the database
@router.get("/search/{search_string}", include_in_schema=True)
def search_words(search_string: str):
    print("searching for: ", search_string)
    lemmas = service.search_word(search_string, 10)
    return JSONResponse(
        content={"data": lemmas},
        status_code=200
    )

# investigate depends_on and get_db
@router.post("/add_flashcard/{lemma_id}", include_in_schema=True)
def add_flashcard(lemma_id: int):
    service.add_flashcard(lemma_id)
    return JSONResponse(
        content={"message": "Flashcard added"},
        status_code=200
   )
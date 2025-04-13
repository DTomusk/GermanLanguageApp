from fastapi import APIRouter
from fastapi.responses import JSONResponse
from app.services.service import Service
from app.db_access.reader import Reader
from app.db_access.writer import Writer
from dataclasses import asdict
import app.nlp_utils

lemma_router = APIRouter(prefix="/lemmas")
service = Service(Reader(), Writer())

# search for a word in the database
# needs to return lemmas along with db ids
@lemma_router.get("/find_closest/{search_string}", include_in_schema=True)
def search_words(search_string: str):
    lemmas = service.search_word(search_string, 5)
    lemma_dict = [asdict(lemma) for lemma in lemmas]
    return JSONResponse(
        content={"data": lemma_dict},
        status_code=200
    )

@lemma_router.get("/search_and_add/{search_string}/", include_in_schema=True)
def search_and_add(search_string: str):
    # take a string and lemmatise 
    # if the lemma is not in the database, add it
    # if the pos is X or PROPN, then return some kind of error 
    nlp = app.nlp_utils.get_nlp()
    result = service.search_and_add(search_string, nlp)
    if result.isSuccess:
        return JSONResponse(
            content={"data": asdict(result.lemma), "message": result.message},
            status_code=200
        )
    return JSONResponse(
        content={"message": result.message},
        status_code=400
    )
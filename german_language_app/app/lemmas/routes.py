from fastapi import APIRouter
from fastapi.responses import JSONResponse
from dataclasses import asdict
from app.lemmas.reader import Reader
from app.lemmas.service import Service
from app.lemmas.writer import Writer
import app.nlp_utils

lemma_router = APIRouter(prefix="/lemmas")
service = Service(Reader(), Writer())

# search for a word in the database
# needs to return lemmas along with db ids
@lemma_router.get("/find_closest/{search_string}", include_in_schema=True)
def search_words(search_string: str):
    """
    Search for the lemmas in the database that are closest to the given string.

    Args:
        search_string (str): The string to search for.

    Returns:
        JSONResponse: A JSON response containing the closest lemmas and their database IDs.
    """
    lemmas = service.search_word(search_string, 5)
    lemma_dict = [asdict(lemma) for lemma in lemmas]
    return JSONResponse(
        content={"data": lemma_dict},
        status_code=200
    )

@lemma_router.get("/search_and_add/{search_string}/", include_in_schema=True)
def search_and_add(search_string: str):
    """
    Search for the lemma of a word and if not found, add it to the database.

    Args:
        search_string (str): The string to lemmatise, search for and, if missing, add

    Returns:
        JSONResponse: A JSON response containing the lemma and a message indicating success or failure.
    """
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
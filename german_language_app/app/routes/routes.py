from fastapi import APIRouter
from app.services.service import Service
from app.db_access.reader import Reader
from app.db_access.writer import Writer
from app.lemmas.routes import lemma_router
from app.routes.flashcards import flashcard_router as flashcard_router

router = APIRouter(prefix="/api")
router.include_router(lemma_router, tags=["Lemmas"])
router.include_router(flashcard_router, tags=["Flashcards"])

service = Service(Reader(), Writer())
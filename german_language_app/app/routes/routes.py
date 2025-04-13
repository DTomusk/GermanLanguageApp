from fastapi import APIRouter
from app.lemmas.routes import lemma_router
from app.flashcards.routes import flashcard_router

router = APIRouter(prefix="/api")
router.include_router(lemma_router, tags=["Lemmas"])
router.include_router(flashcard_router, tags=["Flashcards"])
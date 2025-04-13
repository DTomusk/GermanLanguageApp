from abc import ABC, abstractmethod
from sqlalchemy import insert
from app.database import engine
from app.flashcards.tables import flashcard_table, sentence_table

class IWriter(ABC):
    @abstractmethod
    def add_flashcard(self, lemma_id):
        pass

    @abstractmethod
    def add_sentence_to_flashcard(self, card_id: int, sentence: str):
        pass

class Writer(IWriter):
    def add_flashcard(self, lemma_id):
        stmt = insert(flashcard_table).values(lemma_id=lemma_id)
        with engine.begin() as conn:
            conn.execute(stmt)

    def add_sentence_to_flashcard(self, card_id: int, sentence: str):
        stmt = insert(sentence_table).values(flashcard_id=card_id, text=sentence)
        with engine.begin() as conn:
            conn.execute(stmt)
from sqlalchemy import join, select
from typing import List
from app.models.models import Flashcard, Lemma
from app.db_access.interfaces.ireader import IReader
from app.db_access.db_models import flashcard_table, lemma_table, sentence_table
from app.db_access.database import engine

class Reader(IReader):
    def get_all_flashcards(self) -> List[Flashcard]:
        stmt = select(flashcard_table.c.id, flashcard_table.c.lemma_id, lemma_table.c.lemma).select_from(
                join(flashcard_table, lemma_table, flashcard_table.c.lemma_id == lemma_table.c.id)
            )
        with engine.begin() as conn:
            result = conn.execute(stmt)
            return [Flashcard(id=row.id, lemma_id=row.lemma_id, lemma=row.lemma) for row in result.fetchall()]

    def get_flashcard(self, lemma_id: int):
        with engine.begin() as conn:
            stmt = select(flashcard_table).where(flashcard_table.c.lemma_id == lemma_id).limit(1)
            result = conn.execute(stmt)
            return result.fetchone()
        
    def get_lemma_for_flashcard(self, card_id: int) -> Lemma:
        print("Getting lemma for flashcard with ID: ", card_id)
        with engine.begin() as conn:
            stmt = select(lemma_table).join(flashcard_table).where(flashcard_table.c.id == card_id)
            result = conn.execute(stmt)
            row = result.fetchone()
            print("Row: ", row)
            if row:
                return Lemma(id=row.id, lemma=row.lemma)
            return None

    def get_flashcard_sentences(self, card_id: int) -> List[str]:
        with engine.begin() as conn:
            stmt = select(sentence_table).where(sentence_table.c.flashcard_id == card_id)
            result = conn.execute(stmt)
            return [row.text for row in result.fetchall()]

    def get_flashcards(self, count: int) -> List[Flashcard]:
        with engine.begin() as conn:
            stmt = select(flashcard_table.c.id, flashcard_table.c.lemma_id, lemma_table.c.lemma).select_from(
                join(flashcard_table, lemma_table, flashcard_table.c.lemma_id == lemma_table.c.id)
            ).limit(count)
            result = conn.execute(stmt)
            return [Flashcard(id=row.id, lemma_id=row.lemma_id, lemma=row.lemma) for row in result.fetchall()]
from sqlalchemy import select
from typing import List
from app.models.models import Lemma
from app.db_access.interfaces.ireader import IReader
from app.db_access.db_models import flashcard_table, lemma_table
from app.db_access.database import engine

class Reader(IReader):
    def get_all_lemmas(self) -> List[Lemma]:
        stmt = select(lemma_table)
        with engine.begin() as conn:
            result = conn.execute(stmt)
            return [Lemma(id=row.id, lemma=row.lemma) for row in result.fetchall()]

    def get_flashcard(self, lemma_id):
        with engine.begin() as conn:
            stmt = select(flashcard_table).where(flashcard_table.c.lemma_id == lemma_id).limit(1)
            result = conn.execute(stmt)
            return result.fetchone()
from sqlalchemy import select
from app.db_access.interfaces.ireader import IReader
from app.models.models import flashcard_table, lemma_table
from app.database import engine

class Reader(IReader):
    def get_all_lemmas(self):
        stmt = select(lemma_table.c.lemma)
        with engine.begin() as conn:
            result = conn.execute(stmt)
            return [row[0] for row in result.fetchall()]

    def get_flashcard(self, lemma_id):
        with engine.begin() as conn:
            stmt = select(flashcard_table).where(flashcard_table.c.lemma_id == lemma_id).limit(1)
            result = conn.execute(stmt)
            return result.fetchone()
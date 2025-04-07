from sqlalchemy import insert
from app.db_access.interfaces.iwriter import IWriter
from app.db_access.db_models import flashcard_table
from app.db_access.database import engine

class Writer(IWriter):
    def add_flashcard(self, lemma_id):
        stmt = insert(flashcard_table).values(lemma_id=lemma_id)
        with engine.begin() as conn:
            conn.execute(stmt)
from sqlalchemy import func, insert, select
from app.db_access.interfaces.iwriter import IWriter
from app.db_access.db_models import flashcard_table, lemma_table, sentence_table
from app.db_access.database import engine
from app.models.models import Lemma

class Writer(IWriter):
    def add_flashcard(self, lemma_id):
        stmt = insert(flashcard_table).values(lemma_id=lemma_id)
        with engine.begin() as conn:
            conn.execute(stmt)

    def add_lemma(self, lemma) -> Lemma:
        stmt = insert(lemma_table).values(lemma=lemma)
        print("Executing: ", stmt)
        with engine.begin() as conn:
            conn.execute(stmt)
            query = select(lemma_table.c.id, lemma_table.c.lemma).where(lemma_table.c.id == func.last_insert_rowid())
            result = conn.execute(query)
            row = result.fetchone()
            print("Row: ", row)
            if row:
                return Lemma(id=row.id, lemma=row.lemma)
            return None

    def add_sentence_to_flashcard(self, card_id: int, sentence: str):
        stmt = insert(sentence_table).values(flashcard_id=card_id, text=sentence)
        with engine.begin() as conn:
            conn.execute(stmt)
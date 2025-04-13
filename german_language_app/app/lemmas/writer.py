from abc import ABC, abstractmethod
from sqlalchemy import func, insert, select
from app.models.models import Lemma
from app.database import engine
from app.lemmas.tables import lemma_table

class IWriter(ABC):
    @abstractmethod
    def add_lemma(self, lemma) -> Lemma:
        pass

class Writer():
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
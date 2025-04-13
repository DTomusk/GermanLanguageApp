from abc import ABC, abstractmethod
from typing import List
from sqlalchemy import select
from app.db_access.database import engine

from app.models.models import Lemma
from app.lemmas.tables import lemma_table

class IReader(ABC):
    @abstractmethod
    def get_all_lemmas(self) -> List[Lemma]:
        pass

    @abstractmethod
    def get_lemma(self, lemma: str) -> Lemma:
        pass

class Reader(IReader):
    def get_all_lemmas(self) -> List[Lemma]:
        stmt = select(lemma_table)
        with engine.begin() as conn:
            result = conn.execute(stmt)
            return [Lemma(id=row.id, lemma=row.lemma) for row in result.fetchall()]
        
    def get_lemma(self, lemma: str) -> Lemma:
        with engine.begin() as conn:
            stmt = select(lemma_table).where(lemma_table.c.lemma == lemma).limit(1)
            result = conn.execute(stmt)
            row = result.fetchone()
            if row:
                return Lemma(id=row.id, lemma=row.lemma)
            return None
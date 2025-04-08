from abc import ABC, abstractmethod
from typing import List
from app.models.models import Lemma

class IReader(ABC):
    @abstractmethod
    def get_all_lemmas(self) -> List[Lemma]:
        pass

    @abstractmethod
    def get_flashcard(self, lemma_id):
        pass

    @abstractmethod
    def get_lemma(self, lemma) -> Lemma:
        pass
from abc import ABC, abstractmethod
from app.models.models import Lemma

class IWriter(ABC):
    @abstractmethod
    def add_flashcard(self, lemma_id):
        pass

    @abstractmethod
    def add_lemma(self, lemma) -> Lemma:
        pass
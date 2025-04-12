from abc import ABC, abstractmethod
from typing import List
from app.models.models import Flashcard, Lemma

class IReader(ABC):
    @abstractmethod
    def get_all_lemmas(self) -> List[Lemma]:
        pass

    @abstractmethod
    def get_all_flashcards(self) -> List[Flashcard]:
        pass

    @abstractmethod
    def get_flashcard(self, lemma_id: int):
        pass

    @abstractmethod
    def get_lemma(self, lemma: str) -> Lemma:
        pass

    @abstractmethod
    def get_lemma_for_flashcard(self, card_id: int) -> Lemma:
        pass

    @abstractmethod
    def get_flashcard_sentences(self, card_id: int) -> List[str]:
        pass
from abc import ABC, abstractmethod

class IWriter(ABC):
    @abstractmethod
    def add_flashcard(self, lemma_id):
        pass
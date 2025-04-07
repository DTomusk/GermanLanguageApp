from abc import ABC, abstractmethod

class IReader(ABC):
    @abstractmethod
    def get_all_lemmas(self):
        pass

    @abstractmethod
    def get_flashcard(self, lemma_id):
        pass
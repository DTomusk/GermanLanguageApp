from abc import ABC, abstractmethod
from app.models.responses import SearchAndAddResponse, AddFlashcardResponse

class IService(ABC):
    @abstractmethod
    def add_flashcard(self, word):
        pass

    #@abstractmethod
    #def get_practise_session(self, db, number):
        #pass

    #@abstractmethod
    #def add_sentence_to_flashcard(self, db, card_id, sentence):
        #pass

    @abstractmethod
    def search_word(self, search_string) -> AddFlashcardResponse:
        pass

    @abstractmethod
    def search_and_add(self, search_string, nlp) -> SearchAndAddResponse:
        pass
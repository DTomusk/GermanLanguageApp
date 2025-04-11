from abc import ABC, abstractmethod
from app.models.responses import AddSentenceToFlashcardResponse, SearchAndAddResponse, AddFlashcardResponse
from app.models.inputs import SentenceInput

class IService(ABC):
    @abstractmethod
    def add_flashcard(self, word):
        pass

    #@abstractmethod
    #def get_practise_session(self, db, number):
        #pass

    @abstractmethod
    def add_sentence_to_flashcard(self, card_id: int, sentence: SentenceInput, nlp) -> AddSentenceToFlashcardResponse:
        pass

    @abstractmethod
    def search_word(self, search_string) -> AddFlashcardResponse:
        pass

    @abstractmethod
    def search_and_add(self, search_string, nlp) -> SearchAndAddResponse:
        pass

    # TODO: get rid/replace, probably want something filtered, paginated and sorted
    @abstractmethod
    def get_all_flashcards(self):
        pass
from abc import ABC, abstractmethod
from typing import List

from app.flashcards.reader import IReader
from app.flashcards.writer import IWriter
from app.models.inputs import SentenceInput
from app.models.responses import AddFlashcardResponse, AddSentenceToFlashcardResponse, WordResponse
from stanza.models.common.doc import Document, Sentence

class IService(ABC):
    @abstractmethod
    def add_flashcard(self, lemma_id) -> AddFlashcardResponse:
        pass
    
    @abstractmethod            
    def add_sentence_to_flashcard(self, card_id: int, sentence: SentenceInput, nlp) -> AddSentenceToFlashcardResponse:
        pass

    @abstractmethod
    def get_all_flashcards(self):
        pass
    
    @abstractmethod
    def convert_sentence_to_words(self, sentence: Sentence) -> List[WordResponse]:
        pass

    @abstractmethod
    def get_flashcard_sentences(self, card_id: int):
        pass
    
    @abstractmethod
    def get_practice_session(self, count: int):
        pass

class Service(IService):
    def __init__(self, reader: IReader, writer: IWriter):
        self.reader = reader
        self.writer = writer

    def add_flashcard(self, lemma_id) -> AddFlashcardResponse:
        existing_flashcard = self.reader.get_flashcard(lemma_id)
        if existing_flashcard is None:
            self.writer.add_flashcard(lemma_id)
            return AddFlashcardResponse(True, "Flashcard added successfully")
        return AddFlashcardResponse(True, "Flashcard already exists")
            
    def add_sentence_to_flashcard(self, card_id: int, sentence: SentenceInput, nlp) -> AddSentenceToFlashcardResponse:
        lemma = self.reader.get_lemma_for_flashcard(card_id)
        if lemma is None:
            return AddSentenceToFlashcardResponse(False, doc=None, message="Flashcard not found")
        doc: Document = nlp(sentence.text)
        
        if len(doc.sentences) > 1:
            return AddSentenceToFlashcardResponse(False, doc=None, message="Only one sentence is allowed")

        doc_sentence = doc.sentences[0]

        word_data = self.convert_sentence_to_words(doc_sentence)
        print(f"Word data: {word_data}")

        if not any(word.lemma == lemma.lemma for word in word_data):
            return AddSentenceToFlashcardResponse(False, [], message="Lemma not found in sentence")

        self.writer.add_sentence_to_flashcard(card_id, doc_sentence.text)
        return AddSentenceToFlashcardResponse(True, word_data, message="Sentence added to flashcard")
        # check lemma is present in sentence 
        # if not, return failure object with a message saying the lemma was not used
        # otherwise, add sentence to flashcard
        # return success object with nlp doc 

    def get_all_flashcards(self):
        return self.reader.get_all_flashcards()
    
    # TODO: this could be handled by a different service, e.g. some kind of analysis
    def convert_sentence_to_words(self, sentence: Sentence) -> List[WordResponse]:
        print(f"Converting sentence to words: {sentence.text}")
        words_data = []
        for word in sentence.words:
            word_info = WordResponse(word.text, word.lemma, word.upos, word.feats, word.deprel, word.head)
            words_data.append(word_info)
        return words_data

    def get_flashcard_sentences(self, card_id: int):
        sentences = self.reader.get_flashcard_sentences(card_id)
        if sentences:
            return sentences
        return None
    
    # TODO: add stuff like spaced repetition SM2
    def get_practice_session(self, count: int):
        flashcards = self.reader.get_flashcards(count)
        if flashcards:
            return flashcards
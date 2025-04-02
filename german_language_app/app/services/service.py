from app.services.interfaces.iservice import IService
from app.db_access.interfaces.ireader import IReader
from app.db_access.interfaces.iwriter import IWriter

class Service(IService):
    def __init__(self, reader: IReader, writer: IWriter):
        self.reader = reader
        self.writer = writer

    def add_flashcard(self, lemma_id):
        existing_flashcard = self.reader.get_flashcard(lemma_id)
        if existing_flashcard is None:
            self.writer.add_flashcard(lemma_id)

    #def get_flashcard(self, db, number):
        #pass

    #def add_sentence_to_flashcard(self, db, card_id, sentence):
        #pass

    #def search_word(self, db, search_string):
        #pass
from app.services.interfaces.iservice import IService
from app.db_access.interfaces.ireader import IReader
from app.db_access.interfaces.iwriter import IWriter
from rapidfuzz import process

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

    # TODO: consider caching or ways to decrease amount of data retrieved
    # (this is ok for now as the db has about 3000 entries)
    def search_word(self, search_string, limit):
        lemmas = self.reader.get_all_lemmas()
        results = process.extract(search_string, lemmas, limit=limit, score_cutoff=75)
        return [row[0] for row in results]

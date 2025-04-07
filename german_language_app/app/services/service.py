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

    # TODO: consider caching or ways to decrease amount of data retrieved
    # (this is ok for now as the db has about 3000 entries)
    def search_word(self, search_string, limit):
        lemmas = self.reader.get_all_lemmas()
        lemma_dict = {lemma.lemma: lemma for lemma in lemmas}
        lemma_strings = list(lemma_dict.keys())
        results = process.extract(search_string, lemma_strings, limit=limit, score_cutoff=75)
        matched_lemmas = [lemma_dict[match[0]] for match in results if match[0] in lemma_dict]
        print(f"Search results: {matched_lemmas}")
        return matched_lemmas

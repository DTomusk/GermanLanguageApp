from abc import ABC, abstractmethod
from app.lemmas.reader import IReader
from app.lemmas.writer import IWriter
from app.models.responses import SearchAndAddResponse
from rapidfuzz import process

class IService(ABC):
    @abstractmethod
    def search_and_add(self, search_string, nlp) -> SearchAndAddResponse:
        pass

class Service(IService):
    def __init__(self, reader: IReader, writer: IWriter):
        self.reader = reader
        self.writer = writer

    def search_and_add(self, search_string, nlp) -> SearchAndAddResponse:
        print(f"Searching and adding: {search_string}")
        doc = nlp(search_string)
        print(f"Doc: {doc}")
        for sentence in doc.sentences:
            for word in sentence.words:
                print(f"Word: {word.text}, UPOS: {word.upos}")
                if word.upos not in ["PROPN", "X"]:
                    lemma = word.lemma
                    print(f"Adding lemma: {lemma}")
                    existing_lemma = self.reader.get_lemma(lemma)
                    if existing_lemma is None:
                        print(f"Lemma not found, adding to database: {lemma}")
                        new_lemma = self.writer.add_lemma(lemma)
                        return SearchAndAddResponse(True, new_lemma, "New lemma added to database")
                    else:
                        print(f"Lemma found in database: {existing_lemma}")
                        return SearchAndAddResponse(True, existing_lemma, "Lemma already exists in database")
                return SearchAndAddResponse(False, None, "Lemma could not be identified")
        return SearchAndAddResponse(False, None, "Unknown error occurred adding lemma")
    
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
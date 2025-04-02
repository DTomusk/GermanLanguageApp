from app.db_access.interfaces.ireader import IReader
from app.database import engine

class Reader(IReader):
    def get_all_lemmas(self):
        pass

    def get_flashcard(self, lemma_id):
        with engine.connect() as conn:
            result = conn.execute(f"SELECT * FROM flashcards WHERE lemma_id = {lemma_id}")
            return result.fetchone()
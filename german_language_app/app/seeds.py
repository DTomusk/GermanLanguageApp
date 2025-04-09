import re

from sqlalchemy import insert, select
from app.db_access.database import engine
from app.db_access.db_models import lemma_table

# add lemmas to the database that aren't propn or x 
def seed_database(file_path, nlp):
    pass
    with engine.begin() as connection:

        stmt = select(lemma_table).limit(1)

        result = connection.execute(stmt)

        has_lemmas = result.fetchone()

        print(has_lemmas)

        # to do - consider condition for seeding
        if has_lemmas is not None: 
            print("Database already seeded")
            return

        print("Seeding database")
        with open(file=file_path, encoding="utf-8") as file:
            word_list = ""
            for i, line in enumerate(file):
                words = get_words_from_line(line)
                if len(words) == 1:
                    if len(words[0]) > 2:
                        word_list += words[0] + " . "

        print(word_list)
        doc = nlp(word_list)
        for sentence in doc.sentences:
            for word in sentence.words:
                if word.upos not in ["PROPN", "X", "PUNCT"]:
                    word.text = word.text.replace(".", "")
                    print(word.text, word.lemma, word.upos)
                    add_lemma_to_db(connection, word.lemma)

def add_lemma_to_db(connection, lemma):
    result = connection.execute(select(lemma_table).where(lemma_table.c.lemma == lemma))
    existing_lemma = result.fetchone()
    if existing_lemma is None:
        connection.execute(insert(lemma_table).values(lemma=lemma))


def get_words_from_line(line):
    return re.findall(r'\b[a-zA-Z]+\b', line)
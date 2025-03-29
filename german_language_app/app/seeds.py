import re
from app.database import SessionLocal
from app.models import Lemma
from pathlib import Path

# add lemmas to the database that aren't propn or x 
def seed_database(file_path, nlp):
    db = SessionLocal()

    has_lemmas = db.query(Lemma).first()

    if has_lemmas is not None: 
        print("Database already seeded")
        return

    print("Seeding database")
    with open(file=file_path, encoding="utf-8") as file:
        word_list = ""
        for i, line in enumerate(file): 
            if i >= 100:
                break
            words = get_words_from_line(line)
            if len(words) == 1:
                if len(words[0]) > 2:
                    word_list += words[0] + ". "

    print(word_list)
    doc = nlp(word_list)
    for sentence in doc.sentences:
        for word in sentence.words:
            if word.upos not in ["PROPN", "X", "PUNCT"]:
                print(word.text, word.lemma, word.upos)
                #add_lemma_to_db(db, word.text, word.lemma, word.upos)

def get_words_from_line(line):
    return re.findall(r'\b[a-zA-Z]+\b', line)
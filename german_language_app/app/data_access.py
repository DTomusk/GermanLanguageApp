from sqlalchemy.orm import Session
from models import Sentence, Vocabulary

# Add a sentence to the db 
def add_sentence(db: Session, text: str):
    sentence = Sentence(text=text)
    db.add(sentence)
    db.commit()

# Get all the sentences added to the db so far
def get_sentences(db: Session):
    return db.query(Sentence).all()

def add_vocabulary(db: Session, lemma: str, pos: str):
    vocabulary_entry = Vocabulary(lemma=lemma, pos=pos)
    db.add(vocabulary_entry)
    db.commit()

def increment_vocabulary(db: Session, lemma: str, pos: str):
    vocab_entry = db.query(Vocabulary).filter(Vocabulary.lemma == lemma, Vocabulary.pos == pos).first()
    vocab_entry.frequency += 1
    db.commit()

def get_vocabulary(db: Session):
    return db.query(Vocabulary).all()

# need to handle case where there is no entry 
def get_vocabulary_entry(db: Session, lemma: str, pos: str):
    return db.query(Vocabulary).filter(Vocabulary.lemma == lemma, Vocabulary.pos == pos).first()


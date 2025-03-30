from sqlalchemy import text
from sqlalchemy.orm import Session
from app.models import Lemma, Sentence, Vocabulary, Flashcard

# Add a sentence to the db 
def add_sentence(db: Session, text: str):
    sentence = Sentence(text=text)
    db.add(sentence)
    db.commit()
    return sentence

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

def get_flashcards(db: Session):
    return db.query(Flashcard).all()

def get_flashcard_by_word(db: Session, word: str):
    return db.query(Flashcard).filter(Flashcard.word == word).first()

def get_flashcard_by_id(db: Session, card_id: int):
    return db.query(Flashcard).filter(Flashcard.id == card_id).first()

def add_flashcard(db: Session, word: str):
    flashcard = Flashcard(word=word)
    db.add(flashcard)
    db.commit()

def add_sentence_to_flashcard(db: Session, card: Flashcard, sentence: Sentence):
    card.sentences.append(sentence)
    db.commit()

def get_flashcard_sentences(db: Session, card_id: int):
    return db.query(Flashcard).filter(Flashcard.id == card_id).first().sentences

# TODO: use word 
# we might need to grab all the words and then search them in memory 
# improve gradually 
def get_lemmas(db: Session):
    result = db.query(Lemma.lemma).all()
    lemmas = [row[0] for row in result]
    print(lemmas)
    return lemmas
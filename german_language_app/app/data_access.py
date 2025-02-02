from sqlalchemy.orm import Session
from models import Sentence

# Add a sentence to the db 
def add_sentence(db: Session, text: str):
    sentence = Sentence(text=text)
    db.add(sentence)
    db.commit()

# Get all the sentences added to the db so far
def get_sentences(db: Session):
    return db.query(Sentence).all()
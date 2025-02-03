import spacy
from data_access import add_sentence, get_sentences, add_vocabulary, increment_vocabulary, get_vocabulary, get_vocabulary_entry
from database import SessionLocal
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import engine, Base, get_db

# we need a service class for business logic 
# service file will call data access

Base.metadata.create_all(bind=engine)

app = FastAPI()
nlp = spacy.load("de_core_news_md")

class TextInput(BaseModel):
    text: str

# Need to clean up and spell-check user input 
# need to put in service class 
def lemmatize_german_text(text):    
    # Process text
    doc = nlp(text)
    
    # Extract original words and their lemmas
    lemmas = {token.text: (token.lemma_, token.pos_) for token in doc if token.is_alpha}  # Ignore punctuation
    
    return lemmas

@app.post("/sentences")
def input_sentence(input_text: TextInput, db: Session = Depends(get_db)):
    add_sentence(db, input_text.text)

    lemmas = lemmatize_german_text(input_text.text)

    for _, lemma in lemmas.items():
        # fix the structure of lemma here to be more readable
        text, pos = lemma
        vocab_entry = get_vocabulary_entry(db, lemma=text, pos=pos)
        if vocab_entry is None:
            add_vocabulary(db, lemma=text, pos=pos)
        else:
            increment_vocabulary(db, lemma=text, pos=pos)

# show all the sentences in the database 
@app.get("/sentences")
def view_sentences(db: Session = Depends(get_db)):
    sentences = get_sentences(db)
    return sentences

# show all the vocabulary that's been saved
@app.get("/vocabulary")
def view_vocabulary(db: Session = Depends(get_db)):
    vocabulary = get_vocabulary(db)
    return vocabulary
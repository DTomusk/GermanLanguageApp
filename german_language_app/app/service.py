from sqlalchemy.orm import Session
from models import Sentence, Vocabulary
from setup import nlp

# Service shouldn't call db directly, data_access should 
class Service:
    def __init__(self, db: Session):
        self.db = db

    # Need to clean up and spell-check user input 
    # need to put in service class 
    def lemmatize_german_text(self, text: str):    
        # Process text
        doc = nlp(text)
        
        # Extract original words and their lemmas
        lemmas = {token.text: (token.lemma_, token.pos_) for token in doc if token.is_alpha}  # Ignore punctuation
        
        return lemmas

    def input_sentence(self, text: str):
        sentence = Sentence(text=text)
        self.db.add(sentence)
        self.db.commit()

        lemmas = self.lemmatize_german_text(text)

        for _, entry in lemmas.items():
            # fix the structure of lemma here to be more readable
            lemma, pos = entry
            vocab_entry = self.db.query(Vocabulary).filter(Vocabulary.lemma == lemma, Vocabulary.pos == pos).first()
            if vocab_entry is None:
                vocabulary_entry = Vocabulary(lemma=lemma, pos=pos)
                self.db.add(vocabulary_entry)
                self.db.commit()
            else:
                vocab_entry = self.db.query(Vocabulary).filter(Vocabulary.lemma == lemma, Vocabulary.pos == pos).first()
                vocab_entry.frequency += 1
                self.db.commit()

    def get_sentences(self):
        return self.db.query(Sentence).all()

    def get_vocabulary(self):
        return self.db.query(Vocabulary).all()
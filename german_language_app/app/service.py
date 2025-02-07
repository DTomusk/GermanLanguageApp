from sqlalchemy.orm import Session
from app.nlp_utils import nlp
from app.data_access import add_sentence, get_sentences, get_vocabulary_entry, get_vocabulary, add_vocabulary, increment_vocabulary

# Service shouldn't call db directly, data_access should 
class Service:
    def __init__(self, db: Session):
        self.db = db

    def process_sentence(self, text: str) -> str:
        # These first two steps will likely be done client-side  
        # Use spell checking to determine if there are any errors and suggest corrections
        # Process sentence using nlp 
        # Determine the type of sentence (statement, command, question etc.)

        # Determine the vocabulary 
        # Check grammatical correctness 
        # Determine complexity 
        add_sentence(self.db, text=text)

        lemmas = self.lemmatize_german_text(text)

        self.update_vocabulary(lemmas) 

        return text

    # Need to clean up and spell-check user input 
    # need to put in service class 
    def lemmatize_german_text(self, text: str):    
        # Process text
        doc = nlp(text)
        
        # Extract original words and their lemmas
        lemmas = {token.text: (token.lemma_, token.pos_) for token in doc if token.is_alpha}  # Ignore punctuation
        
        return lemmas
    
    def update_vocabulary(self, lemmas: dict[str, tuple[str, str]]):
        for _, entry in lemmas.items():
            # fix the structure of lemma here to be more readable
            lemma, pos = entry
            vocab_entry = get_vocabulary_entry(db=self.db, lemma=lemma, pos=pos)
            if vocab_entry is None:
                add_vocabulary(db=self.db, lemma=lemma, pos=pos)
            else:
                increment_vocabulary(db=self.db, lemma=lemma, pos=pos) 

    # depending on what we want, we may not need these 
    def get_sentences(self):
        return get_sentences(db=self.db)

    def get_vocabulary(self):
        return get_vocabulary(db=self.db)
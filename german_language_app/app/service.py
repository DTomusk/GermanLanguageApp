import json
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

        doc = nlp(text)

        for sentence in doc.sentences:
            for word in sentence.words:
                self.update_vocabulary(word.lemma, word.pos)

        return self.convert_doc_to_json(doc)
    
    def convert_doc_to_json(self, doc):
        return json.dumps([
            {
                "text": sentence.text,
                "words": [
                    {
                        "text": word.text,
                        "lemma": word.lemma,
                        "pos": word.pos
                    }
                    for word in sentence.words
                ]
            }
            for sentence in doc.sentences
        ])
    
    def update_vocabulary(self, lemma, pos):
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
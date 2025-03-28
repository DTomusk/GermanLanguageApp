import json
from app.nlp_utils import nlp
import app.data_access as data_access

def process_sentence(db, text: str) -> str:
    # These first two steps will likely be done client-side  
    # Use spell checking to determine if there are any errors and suggest corrections
    # Process sentence using nlp 
    # Determine the type of sentence (statement, command, question etc.)

    # Determine the vocabulary 
    # Check grammatical correctness 
    # Determine complexity 
    data_access.add_sentence(db, text=text)

    doc = nlp(text)

    for sentence in doc.sentences:
        for word in sentence.words:
            update_vocabulary(db, word.lemma, word.pos)

    return convert_doc_to_json(doc)

def convert_doc_to_json(doc):
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

def update_vocabulary(db, lemma, pos):
    vocab_entry = data_access.get_vocabulary_entry(db=db, lemma=lemma, pos=pos)
    if vocab_entry is None:
        data_access.add_vocabulary(db=db, lemma=lemma, pos=pos)
    else:
        data_access.increment_vocabulary(db=db, lemma=lemma, pos=pos) 

def add_flashcard(db, word):
    existing_card = data_access.get_flashcard_by_word(db=db, word=word)
    if existing_card is None:
        data_access.add_flashcard(db=db, word=word)
        return "Flashcard successfully added"
    else:
        return "Flashcard already exists"
    
def add_sentence_to_flashcard(db, card_id: int, sentence: str):
    card = data_access.get_flashcard_by_id(db=db, card_id=card_id)
    if card is None:
        raise Exception("Flashcard not found")
    else:
        # check whether sentence contains the card's word 
        # if it does, add the sentence to the card 
        # i.e. add sentence to db and then card id and sentence id to association table
        doc = nlp(sentence)
        doc_sentence = doc.sentences[0]
        for word in doc_sentence.words:
            if word.text == card.word:
                sentence = data_access.add_sentence(db=db, text=sentence)
                data_access.add_sentence_to_flashcard(db=db, card=card, sentence=sentence)
                return "Sentence added to flashcard"
        raise Exception("Sentence does not contain the word on the flashcard")
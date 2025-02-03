import spacy
from data_access import add_sentence, get_sentences, add_vocabulary, increment_vocabulary, get_vocabulary, get_vocabulary_entry
from database import SessionLocal

# menu file will become api controller
# then we need a service class for business logic 
# service file will call data access

# Need to clean up and spell-check user input 
def lemmatize_german_text(text):
    # Load German NLP model
    nlp = spacy.load("de_core_news_md")
    
    # Process text
    doc = nlp(text)
    
    # Extract original words and their lemmas
    lemmas = {token.text: (token.lemma_, token.pos_) for token in doc if token.is_alpha}  # Ignore punctuation
    
    return lemmas

def input_sentence(db):
    # User input
    text = input("Enter a German sentence: ")

    add_sentence(db, text)

    lemmas = lemmatize_german_text(text)

    # Display results
    print("\nLemmatized Words:")

    for word, lemma in lemmas.items():
        # fix the structure of lemma here to be more readable
        text, pos = lemma
        vocab_entry = get_vocabulary_entry(db, lemma=text, pos=pos)
        if vocab_entry is None:
            add_vocabulary(db, lemma=text, pos=pos)
        else:
            increment_vocabulary(db, lemma=text, pos=pos)
        print(f"{word} → {lemma}")

# show all the sentences in the database 
def view_sentences(db):
    sentences = get_sentences(db)
    if sentences.count == 0:
        print("No sentences found in database")
        return
    for sentence in sentences:
        print(sentence)

# show all the vocabulary that's been saved
def view_vocabulary(db):
    vocabulary = get_vocabulary(db)
    if vocabulary.count == 0:
        print("No vocabulary found in database")
        return
    for entry in vocabulary:
        print(entry)

def menu():
    # when we pull this out into an api, make sure to close connections for each endpoint
    db = SessionLocal()
    while True:
        print("\nGerman Language Learning App")
        print("1. Input a sentence")
        print("2. View Sentences")
        print("3. View Vocabulary")
        print("4. Exit")
        
        choice = input("Please choose an option (1-4): ")
        
        if choice == "1":
            input_sentence(db)
        elif choice == "2":
            view_sentences(db)
        elif choice == "3":
            view_vocabulary(db)
        elif choice == "4":
            print("Exiting the application. Goodbye!")
            break
        else:
            print("Invalid choice. Please try again.")

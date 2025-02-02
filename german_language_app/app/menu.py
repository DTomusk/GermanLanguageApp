import spacy
from data_access import add_sentence, get_sentences
from database import SessionLocal

# Need to clean up and spell-check user input 
def lemmatize_german_text(text):
    # Load German NLP model
    nlp = spacy.load("de_core_news_sm")
    
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
        print(f"{word} → {lemma}")

# show all the sentences in the database 
def view_sentences(db):
    sentences = get_sentences(db)
    for sentence in sentences:
        print(f"\n{sentence.text}")

# show all the vocabulary that's been saved
def view_vocabulary():
    print("not implemented")

def menu():
    db = SessionLocal()
    while True:
        print("\nGerman Language Learning App")
        print("1. Input a sentence")
        print("2. View Sentences")
        print("3. View Vocabulary")
        print("4. Exit")
        
        choice = input("Please choose an option (1, 2, 3): ")
        
        if choice == "1":
            input_sentence(db)
        elif choice == "2":
            view_sentences(db)
        elif choice == "3":
            view_vocabulary()
        elif choice == "4":
            print("Exiting the application. Goodbye!")
            break
        else:
            print("Invalid choice. Please try again.")

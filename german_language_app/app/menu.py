import spacy

# Need to clean up and spell-check user input 
def lemmatize_german_text(text):
    # Load German NLP model
    nlp = spacy.load("de_core_news_sm")
    
    # Process text
    doc = nlp(text)
    
    # Extract original words and their lemmas
    lemmas = {token.text: (token.lemma_, token.pos_) for token in doc if token.is_alpha}  # Ignore punctuation
    
    return lemmas

def input_sentence():
    # User input
    text = input("Enter a German sentence: ")
    lemmas = lemmatize_german_text(text)

    # Display results
    print("\nLemmatized Words:")

    for word, lemma in lemmas.items():
        print(f"{word} → {lemma}")

def view_vocabulary():
    print("not implemented")

def menu():
    while True:
        print("\nGerman Language Learning App")
        print("1. Input a sentence")
        print("2. View Vocabulary")
        print("3. Exit")
        
        choice = input("Please choose an option (1, 2, 3): ")
        
        if choice == "1":
            input_sentence()
        elif choice == "2":
            view_vocabulary()
        elif choice == "3":
            print("Exiting the application. Goodbye!")
            break
        else:
            print("Invalid choice. Please try again.")

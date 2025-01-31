import spacy

def lemmatize_german_text(text):
    # Load German NLP model
    nlp = spacy.load("de_core_news_sm")
    
    # Process text
    doc = nlp(text)
    
    # Extract original words and their lemmas
    lemmas = {token.text: (token.lemma_, token.pos_) for token in doc if token.is_alpha}  # Ignore punctuation
    
    return lemmas

# User input
text = input("Enter a German sentence: ")
lemmas = lemmatize_german_text(text)

# Display results
print("\nLemmatized Words:")
for word, lemma in lemmas.items():
    print(f"{word} → {lemma}")

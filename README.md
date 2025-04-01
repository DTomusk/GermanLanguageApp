# GermanLanguageApp
This project is a web app that uses NLP to process and evaluate text entered by the user in German. 
The goal of this app is to be a flashcard app for which you are given a word and have to write a sentence using that word. 
The app will then run an NLP pipeline against the provided text to evaluate validity, correctness and complexity. 
It also saves lemmas and their frequency of use as the user's vocabulary. 
We can use vocabulary data to analyse and evaluate a person's proficiency in German. 
The goal is to then have recommendations for words to learn, structures to practise etc. 

There is scope to add other languages, as this only depends on the language model that is loaded and any language specific rules in the NLP pipeline. 

Technologies used in this app: 
- Python with FastApi, SQLAlchemy, SQLite, Alembic run with uvicorn
- Stanza for NLP
- React with Styled Components

The frontend is designed based on the principles of Atomic Design.

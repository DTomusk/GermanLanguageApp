
import spacy
from database import Base, engine

Base.metadata.create_all(bind=engine)
nlp = spacy.load("de_core_news_md")

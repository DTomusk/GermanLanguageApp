from typing import Annotated, List
from pydantic import BaseModel, StringConstraints
from sqlalchemy import Column, ForeignKey, Integer, String, Table, UniqueConstraint
from sqlalchemy.orm import relationship, mapped_column, Mapped, DeclarativeBase
from app.database import Base

class Base(DeclarativeBase):
    pass

class SentenceInput(BaseModel):
    text: Annotated[str, StringConstraints(
        strip_whitespace=True, 
        min_length=1,
        pattern=r'^[A-Za-z0-9\/,\- äöüÄÖÜß]+[.!?]?$'
        )]
    
# words can only contain letters, must be at least one letter long and can't contain any whitespace
class WordInput(BaseModel):
    text: Annotated[str, StringConstraints(
        strip_whitespace=True, 
        min_length=1,
        pattern=r'^[A-Za-zäöüÄÖÜß]+$'
        )]

# Table to store all text entered
class Sentence(Base):
    __tablename__ = "sentences"

    id: Mapped[int] = mapped_column(primary_key=True)
    # reconsider index if text gets large 
    text = Column(String, index=True)

    def __repr__(self):
        return f"<Sentence:{self.text}>"

    def __init__(self, text: str):
        self.text = text

# Table to store data of vocabulary for analysis
class Vocabulary(Base):
    __tablename__ = "Vocabulary"

    id: Mapped[int] = mapped_column(primary_key=True)
    lemma = Column(String, nullable=False, index=True)
    # could be an enum
    pos = Column(String, nullable=False)
    frequency = Column(Integer, nullable=False)

    # the same lemma can be different pos 
    __table_args__ = (UniqueConstraint("lemma", "pos", name="uq_lemma_pos"),)

    def __repr__(self):
        return f"<VocabularyEntry(lemma='{self.lemma}', pos='{self.pos}', frequency='{self.frequency}')>"

    def __init__(self, lemma: str, pos: str):
        self.lemma = lemma
        self.pos = pos
        self.frequency = 1

# Table to store flashcards 
class Flashcard(Base):
    __tablename__ = "flashcards"

    id: Mapped[int] = mapped_column(primary_key=True)
    word = Column(String, nullable=False, index=True)
    sentences: Mapped[List[Sentence]] = relationship(
        secondary="flashcard_sentences", back_populates="flashcards"
    )

    # I don't know if we need an id and a word if word is unique 
    __table_args__ = (UniqueConstraint("word", name="uq_word"),)

    sentences = relationship("Sentence", secondary="flashcard_sentences")

    def __repr__(self):
        return f"<Flashcard(word='{self.word}')>"

    def __init__(self, word: str):
        self.word = word

flashchard_sentence_table = Table(
    "flashcard_sentences",
    Base.metadata,
    Column("sentence_id", Integer, ForeignKey("sentences.id")),
    Column("flashcard_id", Integer, ForeignKey("flashcards.id"))
)

class Lemma(Base):
    __tablename__ = "Lemmas"

    id: Mapped[int] = mapped_column(primary_key=True)
    lemma = Column(String, nullable=False, index=True)

    def __repr__(self):
        return f"<Lemma(lemma='{self.lemma}')>"

    def __init__(self, lemma: str):
        self.lemma = lemma
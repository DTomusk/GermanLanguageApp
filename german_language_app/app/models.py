from sqlalchemy import Column, Integer, String, UniqueConstraint
from database import Base

# Table to store all text entered
class Sentence(Base):
    __tablename__ = "sentences"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    # reconsider index if text gets large 
    text = Column(String, index=True)

    def __repr__(self):
        return f"<Sentence:{self.text}>"

    def __init__(self, text: str):
        self.text = text

# Table to store data of vocabulary for analysis
class Vocabulary(Base):
    __tablename__ = "Vocabulary"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
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
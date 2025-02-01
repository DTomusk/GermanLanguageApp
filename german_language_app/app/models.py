from sqlalchemy import Column, Integer, String
from database import Base

class Sentence(Base):
    __tablename__ = "sentences"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, index=True)
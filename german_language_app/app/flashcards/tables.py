from sqlalchemy import Column, ForeignKey, Integer, String, Table
from app.database import metadata_obj

flashcard_table = Table(
    "flashcard",
    metadata_obj,
    Column("id", Integer, primary_key=True),
    Column("lemma_id", Integer, ForeignKey("lemma.id")),
)

# Set 500 characters as a start, may have to reconsider
sentence_table = Table(
    "sentence",
    metadata_obj,
    Column("id", Integer, primary_key=True),
    Column("text", String(500)),
    Column("flashcard_id", Integer, ForeignKey("flashcard.id"), index=True),
)

word_table = Table(
    "word",
    metadata_obj,
    Column("id", Integer, primary_key=True),
    Column("text", String(100), index=True),
    Column("lemma_id", Integer, ForeignKey("lemma.id")),
    Column("pos", String(10), index=True),
    Column("feats", String(100))
)
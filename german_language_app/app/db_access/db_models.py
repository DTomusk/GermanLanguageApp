from sqlalchemy import Column, ForeignKey, Integer, String, Table, MetaData

# these are database tables, do they belong in models?
metadata_obj = MetaData()

# Hopefully lemmas won't ever be longer than 100 characters
# but with German you never know
lemma_table = Table(
    "lemma",
    metadata_obj,
    Column("id", Integer, primary_key=True),
    Column("lemma", String(100), index=True)
)

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
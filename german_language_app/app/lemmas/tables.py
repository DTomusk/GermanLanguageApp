from sqlalchemy import Column, Integer, String, Table
from app.database import metadata_obj

lemma_table = Table(
    "lemma",
    metadata_obj,
    Column("id", Integer, primary_key=True),
    Column("lemma", String(100), index=True)
)
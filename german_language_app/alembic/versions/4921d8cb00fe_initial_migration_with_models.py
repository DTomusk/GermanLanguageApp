"""Initial migration with models

Revision ID: 4921d8cb00fe
Revises: 
Create Date: 2025-02-04 16:23:06.735371

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4921d8cb00fe'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Vocabulary',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('lemma', sa.String(), nullable=False),
    sa.Column('pos', sa.String(), nullable=False),
    sa.Column('frequency', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('lemma', 'pos', name='uq_lemma_pos')
    )
    op.create_index(op.f('ix_Vocabulary_id'), 'Vocabulary', ['id'], unique=False)
    op.create_index(op.f('ix_Vocabulary_lemma'), 'Vocabulary', ['lemma'], unique=False)
    op.create_table('sentences',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('text', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_sentences_id'), 'sentences', ['id'], unique=False)
    op.create_index(op.f('ix_sentences_text'), 'sentences', ['text'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_sentences_text'), table_name='sentences')
    op.drop_index(op.f('ix_sentences_id'), table_name='sentences')
    op.drop_table('sentences')
    op.drop_index(op.f('ix_Vocabulary_lemma'), table_name='Vocabulary')
    op.drop_index(op.f('ix_Vocabulary_id'), table_name='Vocabulary')
    op.drop_table('Vocabulary')
    # ### end Alembic commands ###

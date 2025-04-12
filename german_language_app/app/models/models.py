from dataclasses import dataclass

@dataclass
class Lemma:
    id: int
    lemma: str

@dataclass
class Flashcard:
    id: int
    lemma_id: int
    lemma: str
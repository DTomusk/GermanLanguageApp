from dataclasses import dataclass
from typing import List
from app.models.models import Lemma

# TODO: all responses seem to have isSuccess and message, create a base response
class SearchAndAddResponse:
    def __init__(self, isSuccess: bool, lemma: Lemma=None, message: str=None):
        self.isSuccess = isSuccess
        self.lemma = lemma
        self.message = message

class AddFlashcardResponse:
    def __init__(self, isSuccess: bool, message: str=None):
        self.isSuccess = isSuccess
        self.message = message

@dataclass
class WordResponse:
    text: str
    lemma: str
    pos: str
    feats: str
    dependencyRelation: str
    head: int

    def __init__(self, text: str, lemma: str, pos: str, feats: str, dependencyRelation: str, head: int):
        self.text = text
        self.lemma = lemma
        self.pos = pos
        self.feats = feats
        self.dependencyRelation = dependencyRelation
        self.head = head

# We want to return whether it was a success
# a message corresponding to exactly what happened
# and an nlp doc of the input sentence
class AddSentenceToFlashcardResponse:
    def __init__(self, isSuccess: bool, words: List[WordResponse], message: str=None):
        self.isSuccess = isSuccess
        self.message = message
        self.words = words
from app.models.models import Lemma

class SearchAndAddResponse:
    def __init__(self, isSuccess: bool, lemma: Lemma=None, message: str=None):
        self.isSuccess = isSuccess
        self.lemma = lemma
        self.message = message
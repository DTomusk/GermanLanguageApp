import pytest 
from pydantic import ValidationError
from app.models.models import SentenceInput

def test_valid_sentence_input():
    valid_sentences = [
        "a",            # single letter no punctuation
        "a.",           # single letter with punctuation
        "    a?      ", # single letter with punctuation and whitespace
        "hello!",       # single word with punctuation
        "größer"        # German characters
    ]

    for sentence in valid_sentences:
        sentence_input = SentenceInput(text=sentence).text
        assert sentence_input == sentence.strip()

def test_invalid_sentence_input():
    invalid_sentences = [
        "!",    # no letters before punctuation
        "", 	# empty string
        "    ", # only whitespace
        "#",    # special character
    ]

    for sentence in invalid_sentences:
        with pytest.raises(ValidationError):
            SentenceInput(text=sentence)
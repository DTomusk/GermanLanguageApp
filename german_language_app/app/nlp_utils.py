import stanza 

_nlp = None

def get_nlp():
    global _nlp
    if _nlp is None:
        _nlp = stanza.Pipeline('de', processors='tokenize,pos,lemma')
    return _nlp
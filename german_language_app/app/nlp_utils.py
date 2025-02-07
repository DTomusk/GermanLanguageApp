import stanza 

stanza.download('de', processors='tokenize,pos,lemma')
nlp = stanza.Pipeline('de', processors='tokenize,pos,lemma', download_method=None)
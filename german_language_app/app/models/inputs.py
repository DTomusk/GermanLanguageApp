from typing import Annotated
from pydantic import BaseModel, StringConstraints

class SentenceInput(BaseModel):
    text: Annotated[str, StringConstraints(
        strip_whitespace=True, 
        min_length=1,
        pattern=r'^[A-Za-z0-9\/,\- äöüÄÖÜß]+[.!?]?$'
        )]
    
# words can only contain letters, must be at least one letter long and can't contain any whitespace
class WordInput(BaseModel):
    text: Annotated[str, StringConstraints(
        strip_whitespace=True, 
        min_length=1,
        pattern=r'^[A-Za-zäöüÄÖÜß]+$'
        )]

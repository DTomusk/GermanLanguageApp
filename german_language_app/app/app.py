from fastapi import FastAPI, Depends
from pydantic import BaseModel
from dependencies import get_service
from service import Service

# put this in a different file
class TextInput(BaseModel):
    text: str

app = FastAPI()

@app.post("/sentences")
def input_sentence(input_text: TextInput, service: Service=Depends(get_service)):
    service.input_sentence(input_text.text)

# show all the sentences in the database 
@app.get("/sentences")
def view_sentences(service: Service=Depends(get_service)):
    return service.get_sentences()

# show all the vocabulary that's been saved
@app.get("/vocabulary")
def view_vocabulary(service: Service=Depends(get_service)):
    return service.get_vocabulary()
import { useEffect, useState } from "react";
import Button from "../atoms/Button";
import FormField from "../molecules/FormField";
import Card from "../organisms/Card";
import API from "../../api/api";
import { Flashcard } from "../../models/Flashcard";
import ContentTemplate from "../templates/ContentTemplate";
import FormFieldLarge from "../molecules/FormFieldLarge";

function PractisePage() {
    const [sentence, setSentence] = useState<string>("");
    const [error, setError] = useState("");
    const [flashcards, setFlashcards] = useState<Flashcard[] | null>(null);
    const [currentFlashcard, setCurrentFlashcard] = useState<Flashcard | null>(null);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [index, setIndex] = useState(0);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setError("");
        setSentence(e.target.value);
        setSubmitted(false);
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        setError("");
        setLoading(true);
        setSubmitted(true);
        e.preventDefault();

        // TODO: add sentence validation (e.g. contains the word)
        try {
            await API.post(`/flashcards/${currentFlashcard?.id}`,
            { text: sentence },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            // TODO: only do this on success
            // Otherwise provide feedback to user
            setSentence("");
            setIndex(index + 1);
            setCurrentFlashcard(flashcards![index + 1]);
        } catch (error) {}

        setLoading(false);
    }

    // TODO: below assumes we have flashcards, add error handling
    // Grabs the first flashcard every time 
    // Could add: nothing to practise, or something like that
    // TODO: add loading so we don't show "undefined"
    useEffect(() => {
        API.get("/flashcards")
        .then(response => {
            setFlashcards(response.data);
            setIndex(0);
            setCurrentFlashcard(response.data[index]);
        })
    }, []);

    return (
    <ContentTemplate>
        <Card cardTitle={`Write a sentence using: ${currentFlashcard?.word}`} 
            body={<FormFieldLarge label="Sentence:" value={sentence} onChange={handleInputChange} error={error}></FormFieldLarge>}
            footer={<Button label="Submit" onClick={handleSubmit} disabled={loading || submitted}></Button>}>
        </Card>
    </ContentTemplate>
  );
}

export default PractisePage;
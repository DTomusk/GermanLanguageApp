import { useEffect, useState } from "react";
import Button from "../atoms/Button";
import FormField from "../molecules/FormField";
import Card from "../organisms/Card";
import axios from "axios";
import API from "../../api/api";

function PractisePage() {
    const [sentence, setSentence] = useState<string>("");
    const [error, setError] = useState("");
    const [flashcard, setFlashcard] = useState("German");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            await axios.post("")
        } catch (error) {}
    }

    // TODO: below assumes we have flashcards, add error handling
    // Grabs the first flashcard every time 
    // Could add: nothing to practise, or something like that
    useEffect(() => {
        API.get("/flashcards")
        .then(response => {
            setFlashcard(response.data[0].word);
        })
    }, []);

    return (
    <div>
        <h1>Practise</h1>
        <Card cardTitle={`Write a sentence using: ${flashcard}`} 
            body={<FormField label="Sentence:" value={sentence} onChange={handleInputChange} error={error}></FormField>}
            footer={<Button label="Submit" onClick={handleSubmit} disabled={loading || submitted}></Button>}>
        </Card>
    </div>
  );
}

export default PractisePage;
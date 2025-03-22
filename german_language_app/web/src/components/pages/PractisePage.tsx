import { useEffect, useState } from "react";
import Button from "../atoms/Button";
import FormField from "../molecules/FormField";
import Card from "../organisms/Card";
import axios from "axios";
import API from "../../api/api";
import { Flashcard } from "../../models/Flashcard";
import Banner from "../organisms/Banner";

function PractisePage() {
    const [sentence, setSentence] = useState<string>("");
    const [error, setError] = useState("");
    const [flashcard, setFlashcard] = useState<Flashcard | null>(null);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("");
        setSentence(e.target.value);
        setSubmitted(false);
        setSuccessMessage("");
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        setError("");
        setLoading(true);
        setSubmitted(true);
        e.preventDefault();

        // TODO: add sentence validation (e.g. contains the word)
        try {
            const res = await API.post(`/flashcards/${flashcard?.id}`,
            { text: sentence },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setSuccessMessage(res.data.message);
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
            setFlashcard(response.data[0]);
        })
    }, []);

    const handleSuccessClose = () => {
        setSuccessMessage("");
    }

    return (
    <div>
        <h1>Practise</h1>
        {successMessage !== "" && <Banner type="success" message={successMessage} onClose={handleSuccessClose}></Banner>}
        <Card cardTitle={`Write a sentence using: ${flashcard?.word}`} 
            body={<FormField label="Sentence:" value={sentence} onChange={handleInputChange} error={error}></FormField>}
            footer={<Button label="Submit" onClick={handleSubmit} disabled={loading || submitted}></Button>}>
        </Card>
    </div>
  );
}

export default PractisePage;
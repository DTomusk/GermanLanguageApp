import { styled } from "styled-components"
import Button from "../atoms/Button"
import Card from "../organisms/Card"
import { ChangeEvent, useState } from "react";
import FormField from "../molecules/FormField";
import axios from "axios";
import Banner from "../organisms/Banner";
import { Link } from "react-router-dom";

// This should be in a template file 
const ContentWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 20em;
    margin: 0 auto;
    gap: 1em;`;

function LandingPage() {
    const [word, setWord] = useState<string>("");
    const [error, setError] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError("");
        setWord(e.target.value);
        setSubmitted(false);
        setShowSuccess(false);
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        setError("");
        setLoading(true);
        setSubmitted(true);
        e.preventDefault();

        if (word.trim() === "") {
            setError("Input cannot be empty");
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post("http://127.0.0.1:8000/flashcards", 
            { text: word },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setResponse(res.data.message);
            setShowSuccess(true);
        } catch (error) {
            console.error("Error posting word for flashcard:", error);
            setError("Error: couldn't create flashcard");
        }

        setLoading(false);
    };

    const handleSuccessClose = () => {
        setShowSuccess(false);
    }

    const handleErrorClose = () => {
        setError("");
    }

    return (
        <ContentWrapper>
            {showSuccess && <Banner type="success" message="Flashcard created successfully!" onClose={handleSuccessClose}></Banner>}
            {error && <Banner type="error" message={error} onClose={handleErrorClose}></Banner>}
            <Card cardTitle="Create a new Flashcard" 
                body={<FormField label="Word:" value={word} onChange={handleInputChange} error={error}></FormField>}
                footer={<Button label="Create Flashcard" onClick={handleSubmit} disabled={loading || submitted}></Button>}>
            </Card>
            <Link to="/practise">
                <Button label="Practise" onClick={()=>{}}></Button>
            </Link>
        </ContentWrapper>
    )
}

export default LandingPage
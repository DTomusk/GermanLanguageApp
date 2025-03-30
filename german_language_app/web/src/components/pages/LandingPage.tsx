import Button from "../atoms/Button"
import Card from "../organisms/Card"
import { ChangeEvent, useState } from "react";
import FormField from "../molecules/FormField";
import Banner from "../organisms/Banner";
import API from "../../api/api";
import ContentTemplate from "../templates/ContentTemplate";
import PageLink from "../molecules/PageLink";

function LandingPage() {
    const [word, setWord] = useState<string>("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [searchWords, setSearchWords] = useState([]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        var currentWord = e.target.value;
        setError("");
        setWord(currentWord);
        searchWord(currentWord);
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
            await API.post("/flashcards", 
            { text: word },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            });
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

    const searchWord = async (word: string) => {
        try {
            await(API.get(`/search/${word}`))
            .then((response) => {
                setSearchWords(response.data.data);
            })
        } catch (error) {}
    }

    return (
        <ContentTemplate>
            {showSuccess && <Banner type="success" message="Flashcard created successfully!" onClose={handleSuccessClose}></Banner>}
            {error && <Banner type="error" message={error} onClose={handleErrorClose}></Banner>}
            <Card cardTitle="Create a new Flashcard" 
                body={<FormField label="Search for a word to add to your flaschards for practise:" value={word} onChange={handleInputChange} error={error}></FormField>}
                footer={<Button label="Create Flashcard" onClick={handleSubmit} disabled={loading || submitted}></Button>}>
            </Card>
            <PageLink path="/practise" label="Practise"></PageLink>
            <ul>
                {searchWords.map((word) => {
                    return <li key={word}>{word}</li>
                }
                )}
            </ul>
        </ContentTemplate>
    )
}

export default LandingPage
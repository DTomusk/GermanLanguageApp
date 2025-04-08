import { useEffect, useState } from "react";
import Button from "../atoms/Button";
import Card from "../organisms/Card";
import API from "../../api/api";
import { Flashcard } from "../../models/Flashcard";
import ContentTemplate from "../templates/ContentTemplate";
import FormFieldLarge from "../molecules/FormFieldLarge";
import PageLink from "../molecules/PageLink";
import BackButton from "../atoms/BackButton";
import Row from "../molecules/Row";

function PractisePage() {
    const [sessionStarted, setSessionStarted] = useState(false);
    const [sessionEnded, setSessionEnded] = useState(false);
    const numberOfCards = 2;

    const [sentence, setSentence] = useState<string>("");
    const [error, setError] = useState("");
    const [flashcards, setFlashcards] = useState<Flashcard[] | null>(null);
    const [currentFlashcard, setCurrentFlashcard] = useState<Flashcard | null>(null);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [sentenceValid, setSentenceValid] = useState(false);
    const [index, setIndex] = useState(0);

    const startSession = () => {
        setSessionStarted(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const updatedSentence = e.target.value;
        setError("");
        setSentence(updatedSentence);
        validateSentence(updatedSentence);
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

            if (index === numberOfCards - 1) {
                setSessionEnded(true);
                return;
            }

            setCurrentFlashcard(flashcards![index + 1]);
        } catch (error) {}

        setLoading(false);
    }

    const validateSentence = (updatedSentence: string) => {
        if (updatedSentence.trim() === "") {
            setSentenceValid(false);
            return;
        }
        if (updatedSentence.includes(currentFlashcard?.word || "")) {
            setSentenceValid(true);
            return;
        }
        setSentenceValid(false);
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
        {!sessionStarted && 
        <Card above={<BackButton backLink="/" label="Home"></BackButton>}
            cardTitle="Welcome to the practise page"
            body={<p>You will be given {numberOfCards} words, for each word write a sentence using that word. You will be awarded for sentence complexity and new vocabulary</p>}
            footer={<Button label="Start Session" onClick={startSession}></Button>}>
        </Card>}
        {sessionStarted && !sessionEnded && 
        <Card above={
            <Row>
                <BackButton backLink="/" label="Home"></BackButton>
                <div>{index + 1} / {numberOfCards}</div>
            </Row>}
            cardTitle={`Write a sentence using: ${currentFlashcard?.word}`} 
            body={<>
                <FormFieldLarge label="Sentence:" value={sentence} onChange={handleInputChange} error={error}></FormFieldLarge>
                <p>The sentence must contain the given word </p>
            </>}
            footer={<Button label="Submit" onClick={handleSubmit} disabled={loading || submitted || !sentenceValid}></Button>}>
        </Card>}
        {sessionEnded && 
        <Card cardTitle="Summary"
            body={<p>Well done for completing the session!</p>}
            footer={<PageLink path="/" label="Back Home"></PageLink>}>
        </Card>}
    </ContentTemplate>
  );
}

export default PractisePage;
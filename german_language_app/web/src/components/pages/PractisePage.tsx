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
import { isAxiosError } from "axios";
import { useBanner } from "../../hooks/UseBanner";
import BannerManager from "../organisms/BannerManager";
import { addSentenceToFlashcard } from "../../api/FlashcardService";

function PractisePage() {
    const [sessionStarted, setSessionStarted] = useState(false);
    const [sessionEnded, setSessionEnded] = useState(false);
    const numberOfCards = 2;

    const [sentence, setSentence] = useState<string>("");
    const [error, setError] = useState("");
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
    const [currentFlashcard, setCurrentFlashcard] = useState<Flashcard | null>(null);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [sentenceValidityErrors, setSentenceValidityErrors] = useState<{valid: boolean, errors: string[]}>({valid: false, errors: []});
    const [index, setIndex] = useState(0);
    const [wordData, setWordData] = useState<{text: string, lemma: string, pos: string, feats: string, dependencyRelation: string, head: number}[]>([])

    const {
            successMessage, 
            errorMessage,
            showSuccessBanner,
            showErrorBanner,
            hideSuccessBanner,
            hideErrorBanner
        } = useBanner();

    const startSession = () => {
        setSessionStarted(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const updatedSentence = e.target.value;
        setError("");
        setSentence(updatedSentence);
        validateSentence(updatedSentence);
        hideErrorBanner();
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        setError("");
        setLoading(true);
        setSubmitted(true);
        e.preventDefault();

        try {
            const response = await addSentenceToFlashcard(currentFlashcard?.id as number, sentence);
            setSentence("");
            showSuccessBanner(response.data.message);
            setWordData(response.data.data);
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response) {
                    showErrorBanner(error.response.data.message);
                }
            }
        }

        setLoading(false);
    }

    const validateSentence = (updatedSentence: string) => {
        setSentenceValidityErrors({valid: true, errors: []});
        const errors = [] as string[];
        if (updatedSentence.trim() === "") {
            errors.push("Please enter a sentence");
        }
        const sentences = updatedSentence.split(".");
        if (sentences.length > 1 && sentences[1].trim() !== "") {
            errors.push("Must only have one sentence");
        }
        if (errors.length > 0) {
            setSentenceValidityErrors({valid: false, errors: errors});
        }
    }

    // TODO: below assumes we have flashcards, add error handling
    // Grabs the first flashcard every time 
    // Could add: nothing to practise, or something like that
    // TODO: add loading so we don't show "undefined"
    useEffect(() => {
        const fetchFlashcards = async () => {
            try {
                const response = await API.get(`/flashcard/session/${numberOfCards}`);
        
                setFlashcards(response.data.data);
                setIndex(0);
                setCurrentFlashcard(response.data.data[index]);
            } catch (error) {
                console.error("Error fetching flashcards:", error);
            } 
        };

        fetchFlashcards();
    }, []);

    const handleSuccessClose = () => {
        hideSuccessBanner();
    }

    const handleErrorClose = () => {
        hideErrorBanner();
        setSubmitted(false);
        setSentenceValidityErrors({valid: false, errors: []});
    }

    const goToNextFlashcard = () => {
        if (index === numberOfCards - 1) {
            setSessionEnded(true);
            return;
        }

        const nextIndex = index + 1;
        setIndex(nextIndex);
        setCurrentFlashcard(flashcards[nextIndex]);
        setWordData([]);
        setSubmitted(false);
        setSentence("");
        setSentenceValidityErrors({valid: false, errors: []});
        hideSuccessBanner();
    }

    return (
    <ContentTemplate>
        {!sessionStarted && 
        <Card above={<BackButton backLink="/" label="Home"></BackButton>}
            cardTitle="Welcome to the practise page"
            body={<p>You will be given {numberOfCards} words, for each word write a sentence using that word. You will be awarded for sentence complexity and new vocabulary</p>}
            footer={<Button label="Start Session" onClick={startSession}></Button>}>
        </Card>}
        {sessionStarted && !sessionEnded && 
        <>
        <BannerManager
            successMessage={successMessage}
            errorMessage={errorMessage}
            onSuccessClose={handleSuccessClose}
            onErrorClose={handleErrorClose}    
        />
        <Card above={
            <Row>
                <BackButton backLink="/" label="Home"></BackButton>
                <div>{index + 1} / {numberOfCards}</div>
            </Row>}
            cardTitle={`Write a sentence using: ${currentFlashcard?.lemma}`} 
            body={<>
                <FormFieldLarge label="Sentence:" value={sentence} onChange={handleInputChange} error={error}></FormFieldLarge>
                <p>The sentence must contain the given word </p>
                {sentenceValidityErrors.errors.length > 0 &&
                <ul>
                    {sentenceValidityErrors.errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>}
                {wordData.length > 0 &&
                <ul>
                    {wordData.map((word, index) => (
                        <li key={index}>
                            <p>{word.text} ({word.lemma})</p>
                            <p>POS: {word.pos}</p>
                            <p>Feats: {word.feats}</p>
                            <p>Dependency Relation: {word.dependencyRelation}</p>
                            <p>Head: {word.head}</p>
                        </li>
                ))}
                </ul>}
                <button onClick={goToNextFlashcard} disabled={successMessage == ""}>Next</button>
            </>}
            footer={<Button label="Submit" onClick={handleSubmit} disabled={loading || submitted || !sentenceValidityErrors.valid}></Button>}>
        </Card>
        </>}
        {sessionEnded && 
        <Card cardTitle="Summary"
            body={<p>Well done for completing the session!</p>}
            footer={<PageLink path="/" label="Back Home"></PageLink>}>
        </Card>}
    </ContentTemplate>
  );
}

export default PractisePage;
import Button from "../atoms/Button"
import Card from "../organisms/Card"
import { ChangeEvent, useState } from "react";
import Banner from "../organisms/Banner";
import API from "../../api/api";
import ContentTemplate from "../templates/ContentTemplate";
import PageLink from "../molecules/PageLink";
import SearchBox from "../organisms/SearchBox";

// todo: we need to submit a lemma id 
// search words should be lemmas 
// if the user searches for a word for which there isn't a lemma
// the lemma needs to be added to the database and the id returned
function LandingPage() {
    const [word, setWord] = useState<string>("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [searchWords, setSearchWords] = useState<string[]>([]);
    const [selectedWord, setSelectedWord] = useState<string>("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        var currentWord = e.target.value;
        setError("");
        setWord(currentWord);
        setSubmitted(false);
        setShowSuccess(false);
        if (currentWord.length === 0) {
            setSearchWords([]);
            return;
        }
        searchWord(currentWord);
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
            await API.post("/add_flashcard", 
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

    const handleSelect = (selectedWord: string) => {
        setWord(selectedWord);
        setSelectedWord(selectedWord);
        setSearchWords([]);
        setSubmitted(false);
        setShowSuccess(false);
    }

    return (
        <ContentTemplate>
            {showSuccess && <Banner type="success" message="Flashcard created successfully!" onClose={handleSuccessClose}></Banner>}
            {error && <Banner type="error" message={error} onClose={handleErrorClose}></Banner>}
            <Card cardTitle="Create a new Flashcard" 
                body={
                    <SearchBox
                        searchSuggestions={searchWords}
                        handleSelect={handleSelect}
                        searchText={word}
                        handleInputChange={handleInputChange}>
                    </SearchBox>}
                footer={<Button label="Create Flashcard" onClick={handleSubmit} disabled={loading || submitted}></Button>}>
            </Card>
            <PageLink path="/practise" label="Practise"></PageLink>
            <ul>
                
            </ul>
        </ContentTemplate>
    )
}

export default LandingPage
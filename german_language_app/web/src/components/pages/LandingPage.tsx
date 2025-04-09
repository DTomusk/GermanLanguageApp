import Button from "../atoms/Button"
import Card from "../organisms/Card"
import { ChangeEvent, useState } from "react";
import Banner from "../organisms/Banner";
import API from "../../api/api";
import ContentTemplate from "../templates/ContentTemplate";
import PageLink from "../molecules/PageLink";
import SearchBox from "../organisms/SearchBox";
import { Lemma } from "../../models/Lemma";
import LoadingIcon from "../atoms/LoadingIcon";
import InputError from "../atoms/InputError";

// todo: we need to submit a lemma id 
// search words should be lemmas 
// if the user searches for a word for which there isn't a lemma
// the lemma needs to be added to the database and the id returned
function LandingPage() {
    const [word, setWord] = useState<string>("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [searchWords, setSearchWords] = useState<Lemma[]>([]);
    const [selectedLemma, setSelectedLemma] = useState<Lemma | null>(null);
    const [searchDisabled, setSearchDisabled] = useState(false);
    const [invalidMessage, setInvalidMessage] = useState("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        var currentWord = e.target.value;
        
        setError("");
        setWord(currentWord);
        setSubmitted(false);
        setSuccessMessage("");
        setSelectedLemma(null);
        if (currentWord.length === 0) {
            setSearchWords([]);
            return;
        }
        const isValid = validateWord(currentWord);
        if (isValid) {
            searchWord(currentWord);
            setWord(currentWord);
        }
    }

    const validateWord = (word: string) => {
        const checkWord = word.trim();
        if (checkWord.split(" ").length > 1) {
            setInvalidMessage("Please enter a single word");
            return false;
        }
        setInvalidMessage("");
        return true;
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
            var response = await API.post(`/add_flashcard/${selectedLemma?.id}`, 
            {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setSuccessMessage(response.data.message);
        } catch (error) {
            console.error("Error posting word for flashcard:", error);
            setError("Error: couldn't create flashcard");
        }

        setLoading(false);
    };

    const handleSuccessClose = () => {
        setSuccessMessage("");
    }

    const handleErrorClose = () => {
        setError("");
    }

    const searchWord = async (word: string) => {
        try {
            var response = await(API.get(`/search/${word}`));

            setSearchWords(response.data.data);
            
        } catch (error) {

        }
    }

    const handleSelect = (id: number) => {
        const lemma = searchWords.find(lemma => lemma.id === id);
        if (!lemma) {
            setError("Word not found");
            return;
        }
        setSelectedLemma(lemma);
        setInvalidMessage("");
        setWord(lemma.lemma);
        setSearchWords([]);
        setSubmitted(false);
        setSuccessMessage("");
    }

    const handleSearch = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setSearchDisabled(true);

        try {
            await(API.get(`/search_and_add/${word}`))
            .then((response) => {
                setSelectedLemma(response.data.data);
                setWord(response.data.data.lemma);
            })
        } catch (error) {}
        finally {
            setSearchDisabled(false);
        }
    }

    return (
        <ContentTemplate>
            {successMessage && <Banner type="success" message={successMessage} onClose={handleSuccessClose}></Banner>}
            {error && <Banner type="error" message={error} onClose={handleErrorClose}></Banner>}
            <Card cardTitle="Create a new Flashcard" 
                body={
                    <>
                    <SearchBox
                        searchSuggestions={searchWords.map(lemma => ({ id: lemma.id, text: lemma.lemma }))}
                        handleSelect={handleSelect}
                        searchText={word}
                        handleInputChange={handleInputChange}
                        handleSearch={handleSearch}
                        disabled={searchDisabled}>
                    </SearchBox>
                    {invalidMessage && <InputError text={invalidMessage}/>}

                    {searchDisabled && <LoadingIcon/>}
                    {!searchDisabled && <>
                    <p>Create a flashcard for:</p>
                    <h1>{selectedLemma?.lemma}</h1></>}
                    </>}
                footer={<Button label="Create Flashcard" onClick={handleSubmit} disabled={selectedLemma === null || loading || submitted}></Button>}>
            </Card>
            <PageLink path="/practise" label="Practise"></PageLink>
            <ul>
                
            </ul>
        </ContentTemplate>
    )
}

export default LandingPage
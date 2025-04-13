import Button from "../atoms/Button"
import Card from "../organisms/Card"
import { ChangeEvent, useState } from "react";
import API from "../../api/api";
import ContentTemplate from "../templates/ContentTemplate";
import PageLink from "../molecules/PageLink";
import SearchBox from "../organisms/SearchBox";
import { Lemma } from "../../models/Lemma";
import LoadingIcon from "../atoms/LoadingIcon";
import InputError from "../atoms/InputError";
import BannerManager from "../organisms/BannerManager";
import { useBanner } from "../../hooks/UseBanner";

function LandingPage() {
    const [word, setWord] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [searchWords, setSearchWords] = useState<Lemma[]>([]);
    const [selectedLemma, setSelectedLemma] = useState<Lemma | null>(null);
    const [searchDisabled, setSearchDisabled] = useState(false);
    const [invalidMessage, setInvalidMessage] = useState("");

    const {
        successMessage, 
        errorMessage,
        showSuccessBanner,
        showErrorBanner,
        hideSuccessBanner,
        hideErrorBanner
    } = useBanner();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        var currentWord = e.target.value;
        
        hideErrorBanner();
        hideSuccessBanner();

        setWord(currentWord);
        setSubmitted(false);
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
        hideErrorBanner();
        setLoading(true);
        setSubmitted(true);
        e.preventDefault();

        if (word.trim() === "") {
            showErrorBanner("Input cannot be empty");
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
            showSuccessBanner(response.data.message);
        } catch (error) {
            console.error("Error posting word for flashcard:", error);
            showErrorBanner("Error: couldn't create flashcard");
        }

        setLoading(false);
    };

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
            showErrorBanner("Word not found");
            return;
        }
        setSelectedLemma(lemma);
        setInvalidMessage("");
        setWord(lemma.lemma);
        setSearchWords([]);
        setSubmitted(false);
        hideSuccessBanner();
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
            <BannerManager 
                successMessage={successMessage}
                errorMessage={errorMessage}
                onSuccessClose={hideSuccessBanner}
                onErrorClose={hideErrorBanner}
                />
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
import { styled } from "styled-components"
import Button from "../atoms/Button"
import Card from "../organisms/Card"
import { ChangeEvent, useState } from "react";
import FormField from "../molecules/FormField";
import axios from "axios";

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
    const [response, setResponse] = useState("");
    

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setWord(e.target.value);
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (word.trim() === "") {
            setResponse("Input cannot be empty");
            return;
        }

        try {
            const res = await axios.post("http://127.0.0.1:8000/sentences", 
            { text: word },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setResponse(res.data.message);
        } catch (error) {
            console.error("Error posting sentence:", error);
            setResponse("Error sending sentence");
        }
    };

    return (
        <ContentWrapper>
            <Card cardTitle="Create a new Flashcard" 
                body={<FormField label="Word:" value={word} onChange={handleInputChange}></FormField>}
                footer={<Button label="Create Flashcard" onClick={handleSubmit}></Button>}>
            </Card>
            <Button label="Click me!" onClick={()=>{}}></Button>
        </ContentWrapper>
    )
}

export default LandingPage
import { useState } from "react";
import axios from "axios";

function SentenceInput() {
    const [text, setText] = useState("");
    const [response, setResponse] = useState("");
    const [isValid, setIsValid] = useState(true);

    const regexPattern = /^[a-zA-Z0-9\/.,;:\-!?'" ]*$/;

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (text.trim() === "") {
            setResponse("Input cannot be empty");
            return;
        }

        try {
            const res = await axios.post("http://127.0.0.1:8000/sentences", 
            { text: text },
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

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setText(value);
        setIsValid(regexPattern.test(value));
        setResponse("");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={text}
                    onChange={handleChange}
                    placeholder="Type your sentence"
                />
                {!isValid && <p className="text-red-500 mt-2">Invalid input format</p>}
                <button 
                    type="submit"
                    disabled={!isValid}>
                    Submit
                </button>
            </form>
            <p>{response}</p>
        </div>
    );
}

export default SentenceInput
import { useState } from "react";
import axios from "axios";

function SentenceInput() {
    const [text, setText] = useState("");
    const [response, setResponse] = useState("");

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

    const handleChange = async (e) => {
        setText(e.target.value);
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
                <button type="submit">
                    Submit
                </button>
            </form>
            <p>{response}</p>
        </div>
    );
}

export default SentenceInput
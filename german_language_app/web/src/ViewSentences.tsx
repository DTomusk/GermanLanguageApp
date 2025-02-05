import { useState } from "react";
import axios from "axios";

// the view sentences component is essentially identical to view vocabulary
function ViewSentences() {
    const [data, setData] = useState<{id: number, text: string}[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchData = async () => {
        setIsLoading(true);
        setError("");

        try {
            // extract api url out somewhere so there's one source of truth 
            const response = await axios.get("http://127.0.0.1:8000/sentences");
            setData(response.data);
        } catch(err) {
            setError("Failed to retrieve sentences");
        }

        setIsLoading(false);
    }

    return (
        <div>
            <button
                onClick={fetchData}
                disabled={isLoading}>
                {isLoading ? "Loading..." : "Get Sentences"}
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            {data && (
                <table>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Sentence</td>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((row) => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.text}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            )}    
        </div>
    )
}

export default ViewSentences
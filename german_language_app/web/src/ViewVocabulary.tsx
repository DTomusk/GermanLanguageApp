import { useState } from "react";
import axios from "axios";

function ViewVocabulary() {
    // define this elsewhere 
    const [data, setData] = useState<{frequency: number, pos: string, lemma: string, id: number}[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchData = async () => {
        setIsLoading(true);
        setError("");

        try {
            const response = await axios.get("http://127.0.0.1:8000/vocabulary");
            setData(response.data);
        } catch(err) {
            setError("Failed to retrieve vocabulary");
        }

        setIsLoading(false);
    }

    return (
        <div>
            <button
                onClick={fetchData}
                disabled={isLoading}>
                {isLoading ? "Loading..." : "Get Vocabulary"}
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            {data && (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <td>Lemma</td>
                                <td>Part of Speech</td>
                                <td>Number of Uses</td>
                            </tr>
                        </thead>
                        <tbody>
                        {data.map((row) => (
                            <tr key={row.id}>
                                <td>{row.lemma}</td>
                                <td>{row.pos}</td>
                                <td>{row.frequency}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}    
        </div>
    )
}

export default ViewVocabulary
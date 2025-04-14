import API from "./api";

/// Function to add a flashcard for the given lemma
/// @param lemmaId - The ID of the lemma to add a flashcard for
export const addFlashcard = async (lemmaId: number) => {
    return await API.post(`/flashcards/${lemmaId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const addSentenceToFlashcard = async (flashcardId: number, sentence: string) => {
    return await API.post(`/add_sentence_to_flashcard/${flashcardId}`,
        { text: sentence },
        {
            headers: {
                "Content-Type": "application/json"
            }
    });
};
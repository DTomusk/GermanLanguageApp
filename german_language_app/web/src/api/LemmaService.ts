import API from "./api";

/// Function to find the closest lemma to the given word
/// @param word - The word to search for
/// @returns The closest lemmas to the given word
export const findClosest = async (word: string) => {
    return await API.get(`/lemmas/find_closest/${word}`);
};

/// Function to search for the lemma of the given word and add it to the database if not present
/// @param word - The word to search for
export const searchAndAddWord = async (word: string) => {
    return await API.get(`/lemma/search_and_add/${word}`);
};
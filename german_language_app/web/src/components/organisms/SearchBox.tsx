import { FC } from "react";
import SearchInput from "../molecules/SearchInput";
import SearchSuggestionContainer from "../atoms/SearchSuggestionContainer";
import SearchSuggestion from "../atoms/SearchSuggestion";
import { styled } from "styled-components";

const StyledSearchBox = styled.div`
    position: relative;`;

interface SearchBoxProps {
    searchSuggestions: {id: number, text: string}[];
    handleSelect: (id: number) => void;
    searchText: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox: FC<SearchBoxProps> = ({searchSuggestions, handleSelect, searchText, handleInputChange}) => {
    return (
        <StyledSearchBox>
            <SearchInput label="Search for a word to add to your flaschards for practise:" searchText={searchText} onChange={handleInputChange}>
            </SearchInput>
            {searchSuggestions.length > 0 && <SearchSuggestionContainer>
                {searchSuggestions.map((suggestion) => {
                return <SearchSuggestion text={suggestion.text} onClick={()=>handleSelect(suggestion.id)}></SearchSuggestion>
                })}
            </SearchSuggestionContainer>}
        </StyledSearchBox>
    )
}

export default SearchBox;
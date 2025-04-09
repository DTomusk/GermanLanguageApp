import { FC, useState } from "react";
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
    handleSearch: (e: { preventDefault: () => void; }) => void;
    disabled?: boolean;
}

const SearchBox: FC<SearchBoxProps> = ({searchSuggestions, handleSelect, searchText, handleInputChange, handleSearch, disabled}) => {
    const [isInputFocused, setInputFocused] = useState(false);
    return (
        <StyledSearchBox>
            <SearchInput label="Search for a word to add to your flaschards for practise:" 
                searchText={searchText} 
                onChange={handleInputChange} 
                onFocus={() => setInputFocused(true)} 
                onBlur={() => setInputFocused(false)} 
                handleSearch={handleSearch}
                disabled={disabled}>
            </SearchInput>
            {isInputFocused && searchSuggestions.length > 0 && <SearchSuggestionContainer>
                {searchSuggestions.map((suggestion) => {
                return <SearchSuggestion text={suggestion.text} onMouseDown={(e)=>{
                    e.preventDefault();
                    handleSelect(suggestion.id)}}
                    />
                })}
            </SearchSuggestionContainer>}
        </StyledSearchBox>
    )
}

export default SearchBox;
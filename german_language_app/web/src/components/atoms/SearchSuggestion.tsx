import { FC } from "react";
import { styled } from "styled-components";

const StyledSearchSuggestion = styled.div`
    &:hover {
        background-color: grey;
        cursor: pointer;
    }
    margin: 0;
    padding: 5px;
`;

interface SearchSuggestionProps {
    text: string;
    onMouseDown: (e: { preventDefault: () => void; }) => void;
}

const SearchSuggestion: FC<SearchSuggestionProps> = ({ text,  onMouseDown}) => {
    return (
        <StyledSearchSuggestion onMouseDown={onMouseDown}>
            {text}
        </StyledSearchSuggestion>
    )
}

export default SearchSuggestion;
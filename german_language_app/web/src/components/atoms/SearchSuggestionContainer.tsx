import { FC } from "react";
import { styled } from "styled-components";

const StyledSearchSuggestionContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    z-index: 1;
    position: absolute;
    width: 100%;
    background-color: white;
    left: 0;
    right: 0;`

interface SearchSuggestionContainerProps {
    children: React.ReactNode;
}

const SearchSuggestionContainer: FC<SearchSuggestionContainerProps> = ({children}) => {
    return (<StyledSearchSuggestionContainer>
        {children}
    </StyledSearchSuggestionContainer>)
}

export default SearchSuggestionContainer;
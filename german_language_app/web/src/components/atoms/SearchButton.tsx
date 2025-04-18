import { SearchIcon } from "lucide-react";
import { FC } from "react";
import { styled } from "styled-components";

const StyledSearchButton = styled.button`
    border: none;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0 0.5rem 0.5rem 0;
    background-color:${({ theme }) => theme.colors.primary };
    &:hover {
        background-color: ${({ theme }) => theme.colors.primaryLight };
    }
    &:disabled {
        background-color: ${({ theme }) => theme.colors.grey };
`;

const StyledSearchIcon = styled(SearchIcon)`
    color: #fff;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    `;

interface SearchButtonProps {
    onClick: (e: { preventDefault: () => void; }) => void;
    disabled?: boolean;
}

const SearchButton: FC<SearchButtonProps> = ({onClick, disabled}) => {
    return (
        <StyledSearchButton onClick={onClick} disabled={disabled}>
            <StyledSearchIcon />
        </StyledSearchButton>
    )
}

export default SearchButton;
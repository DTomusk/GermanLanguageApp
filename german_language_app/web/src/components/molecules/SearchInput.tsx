import { FC } from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import { styled } from "styled-components";
import SearchButton from "../atoms/SearchButton";

const StyledSearchBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

interface SearchBoxProps {
    label: string;
    searchText: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    handleSearch: (e: { preventDefault: () => void; }) => void;
    disabled?: boolean;
}

const SearchBar = styled.div`
    display: flex;
    width: 100%;
    align-items: stretch;`

const SearchInput: FC<SearchBoxProps> = ({ label, searchText, onChange, onFocus, onBlur, handleSearch, disabled }) => {
    return (
        <StyledSearchBox>
            <Label>{label}</Label>
            <SearchBar>
                <Input value={searchText} onChange={onChange} placeholder="Search..." onFocus={onFocus} onBlur={onBlur} disabled={disabled}/>
                <SearchButton onClick={handleSearch} disabled={disabled}/>
            </SearchBar>
        </StyledSearchBox>
    );
}

export default SearchInput;
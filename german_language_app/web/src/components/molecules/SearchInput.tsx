import { FC } from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import { styled } from "styled-components";

const StyledSearchBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

interface SearchBoxProps {
    label: string;
    searchText: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: FC<SearchBoxProps> = ({ label, searchText, onChange }) => {
    return (
        <StyledSearchBox>
            <Label>{label}</Label>
            <Input value={searchText} onChange={onChange} placeholder="Search..." />
        </StyledSearchBox>
    );
}

export default SearchInput;
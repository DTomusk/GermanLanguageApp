import React from "react";
import styled from "styled-components";

const StyledTextInput = styled.input`
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

interface TextInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    onFocus?: () => void;
    onBlur?: () => void;
}

const Input: React.FC<TextInputProps> = ({ value, onChange, placeholder, onFocus, onBlur}) => {
    return <StyledTextInput value={value} onChange={onChange} placeholder={placeholder} onFocus={onFocus} onBlur={onBlur}/>;
}

export default Input;
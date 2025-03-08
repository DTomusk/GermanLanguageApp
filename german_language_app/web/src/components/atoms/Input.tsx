import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

const Input: React.FC<InputProps> = ({ value, onChange, placeholder}) => {
    return <StyledInput value={value} onChange={onChange} placeholder={placeholder} />;
}

export default Input;
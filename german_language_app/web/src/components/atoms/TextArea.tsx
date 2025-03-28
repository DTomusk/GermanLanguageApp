import React from "react";
import styled from "styled-components";

const StyledTextAreaInput = styled.textarea`
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
`;

interface TextInputAreaProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    rows: number;
}

const Input: React.FC<TextInputAreaProps> = ({ value, onChange, placeholder, rows}) => {
    return <StyledTextAreaInput 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder}
        rows={rows} />;
}

export default Input;
import React from "react";
import styled from "styled-components";
import { useState } from "react";

const StyledInput = styled.input`
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

const Input: React.FC<InputProps> = (props) => {
    return <StyledInput {...props} />;
}

export default Input;
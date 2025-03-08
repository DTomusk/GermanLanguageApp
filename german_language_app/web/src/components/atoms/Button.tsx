import React from "react";
import styled from "styled-components";

interface ButtonProps {
    label: string; 
    onClick: (e: { preventDefault: () => void; }) => void;
    disabled?: boolean;
}

const StyledButton = styled.button`
    padding: 0.5rem 1rem;
    background-color:${({ theme }) => theme.colors.primary };
    color: white;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: ${({ theme }) => theme.colors.primaryLight };`;

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false }) => {
    return <StyledButton onClick={onClick} disabled={disabled}>{label}</StyledButton>
};

export default Button;
import React from "react";
import styled from "styled-components";

interface ButtonProps {
    label: string; 
    onClick: (e: { preventDefault: () => void; }) => void;
    disabled?: boolean;
}

const StyledButton = styled.button`
    padding: 1rem;
    background-color:${({ theme }) => theme.colors.primary };
    color: white;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    width: 100%;
    height: 4rem;
    font-weight: bold;
    font-size: 1rem;
    &:hover {
        background-color: ${({ theme }) => theme.colors.primaryLight };
    }
    &:disabled {
        background-color: ${({ theme }) => theme.colors.grey };
        cursor: not-allowed;
    }
        `;

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false }) => {
    return <StyledButton onClick={onClick} disabled={disabled}>{label}</StyledButton>
};

export default Button;
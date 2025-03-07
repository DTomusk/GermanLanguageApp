import React from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
    font-size: 1rem;
    margin-bottom: 0.5rem;
`;

interface LabelProps {
    children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({children}) => {
    return <StyledLabel>{children}</StyledLabel>;
};

export default Label;
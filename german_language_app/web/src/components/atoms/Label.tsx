import { FC, ReactNode } from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
    font-size: 1rem;
    margin-bottom: 0.5rem;
`;

interface LabelProps {
    children: ReactNode;
}

const Label: FC<LabelProps> = ({children}) => {
    return <StyledLabel>{children}</StyledLabel>;
};

export default Label;
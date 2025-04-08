import { FC } from "react";
import { styled } from "styled-components";

const StyledInputError = styled.div`
    color: red;
    font-size: 0.8rem;
    margin-top: 0.5rem;
    text-decoration: underline;`;

interface InputErrorProps {
    text: string;
}

const InputError: FC<InputErrorProps> = ({text}) => {
    return <StyledInputError>{text}</StyledInputError>;
}


export default InputError;
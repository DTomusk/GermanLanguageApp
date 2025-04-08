import { FC } from "react";
import { styled } from "styled-components";

interface HeaderProps {
    text: string;
}

const StyledHeader = styled.h1`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    background-color:${({ theme }) => theme.colors.primary };
    color: white;
    padding: 0.5em;
`;

const Header: FC<HeaderProps> = ({text}) => {
    return <StyledHeader>
        {text}
    </StyledHeader>
}

export default Header;
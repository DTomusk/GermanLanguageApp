import { FC } from "react";
import { styled } from "styled-components";

interface HeaderProps {
    text: string;
}

const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    background-color:${({ theme }) => theme.colors.primary };
    color: white;
`;

const Header: FC<HeaderProps> = ({text}) => {
    return <StyledHeader>
        <h1>{text}</h1>
    </StyledHeader>
}

export default Header;
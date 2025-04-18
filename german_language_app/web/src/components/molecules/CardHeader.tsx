import { styled } from "styled-components";

interface CardHeaderProps {
    title: string;
}

const StyledHeader = styled.h2`
    font-weight: bold;
    padding: 25px;
    background-color:${({ theme }) => theme.colors.primary };
    color: white;
    text-align: center;`;

const CardHeader: React.FC<CardHeaderProps> = ({title}) => {
    return (<>
        <StyledHeader>{title}</StyledHeader>
    </>)
}

export default CardHeader;
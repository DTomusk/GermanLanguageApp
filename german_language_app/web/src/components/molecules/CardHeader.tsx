import { styled } from "styled-components";

const StyledHeader = styled.div`
    font-size: 20px;
    font-weight: bold;
    padding: 15px;
    background-color:${({ theme }) => theme.colors.primary };
    color: white;
    text-align: center;`;

function CardHeader() {
    return (<>
        <StyledHeader>I'm the header</StyledHeader>
    </>)
}

export default CardHeader;
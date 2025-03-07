import { styled } from "styled-components";

const StyledFooter = styled.div`
    padding: 10px;
    border-top: 1px solid rgb(177, 177, 177);`;

function CardFooter() {
    return (<StyledFooter>
        <div>I'm the footer</div>
    </StyledFooter>)
}

export default CardFooter;
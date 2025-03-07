import { styled } from "styled-components";

const StyledBody = styled.div`
    margin: 10px;`;

function CardBody() {
    return (<StyledBody>
        <div>I'm the body</div>
    </StyledBody>)
}

export default CardBody;
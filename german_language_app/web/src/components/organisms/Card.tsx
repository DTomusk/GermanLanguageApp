import { styled } from "styled-components";
import CardBody from "../molecules/CardBody"
import CardFooter from "../molecules/CardFooter"
import CardHeader from "../molecules/CardHeader"

const StyledCard = styled.div`
    width: 100%;
    Border: 1px solid rgba(0,0,0,0.2);
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-radius: 5px;
    overflow: hidden;`;

function Card () {
    return (<StyledCard>
        <CardHeader></CardHeader>
        <CardBody></CardBody>
        <CardFooter></CardFooter>
    </StyledCard>)
}

export default Card
import { styled } from "styled-components";
import CardBody from "../molecules/CardBody"
import CardFooter from "../molecules/CardFooter"
import CardHeader from "../molecules/CardHeader"
import React from "react";

interface CardProps {
    cardTitle: string;
    body: React.ReactNode;
    footer: React.ReactNode;
    above?: React.ReactNode;
}

const StyledCard = styled.div`
    width: 100%;
    Border: 1px solid rgba(0,0,0,0.2);
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-radius: 5px;
    overflow: hidden;`;

const StyledDiv = styled.div`
    width: 100%;`;

const Card: React.FC<CardProps> = ({cardTitle, body, footer, above}) => {
    return (<StyledDiv>
    {above}
    <StyledCard>
        <CardHeader title={cardTitle}></CardHeader>
        <CardBody>
            {body}
        </CardBody>
        <CardFooter>
            {footer}
        </CardFooter>
    </StyledCard>
    </StyledDiv>)
}

export default Card
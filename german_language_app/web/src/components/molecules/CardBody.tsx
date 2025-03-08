import { styled } from "styled-components";

interface CardBodyProps {
    children: React.ReactNode;
}

const StyledBody = styled.div`
    margin: 10px;`;

const CardBody: React.FC<CardBodyProps> = ({children}) => {
    return (<StyledBody>
        {children}
    </StyledBody>)
}

export default CardBody;
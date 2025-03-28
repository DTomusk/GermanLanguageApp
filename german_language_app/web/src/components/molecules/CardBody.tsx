import { styled } from "styled-components";

interface CardBodyProps {
    children: React.ReactNode;
}

const StyledBody = styled.div`
    padding: 20px 20px 0px 20px;`;

const CardBody: React.FC<CardBodyProps> = ({children}) => {
    return (<StyledBody>
        {children}
    </StyledBody>)
}

export default CardBody;
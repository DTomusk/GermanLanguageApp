import { styled } from "styled-components";

interface CardFooterProps {
    children: React.ReactNode;
}

const StyledFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;`;

const CardFooter: React.FC<CardFooterProps> = ({children}) => {
    return (<StyledFooter>
        {children}
    </StyledFooter>)
}

export default CardFooter;
import { styled } from "styled-components";

interface RowProps {
    children: React.ReactNode;
}

const StyledRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-bottom: 10px;
`;

const Row: React.FC<RowProps> = ({children}) => {
    return <StyledRow>{children}</StyledRow>;
}

export default Row;
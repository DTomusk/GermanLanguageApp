import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const StyledBackButton = styled(ChevronLeft)`
`;

const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    &:hover {text-decoration: underline};
    color: black;
    `;

interface BackButtonProps {
    backLink: string;
    label: string;
}

const BackButton: React.FC<BackButtonProps> = ({ backLink, label }) => {
    return (
        <StyledLink to={backLink}>
            <StyledBackButton />
            <div>{label}</div>
        </StyledLink>
    );
}

export default BackButton;
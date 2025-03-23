import { FC } from "react";
import { Link } from "react-router-dom";
import Button from "../atoms/Button";
import { styled } from "styled-components";

const StyledPageLink = styled.div`
    width: 100%;`;

interface PageLinkProps {
    path: string;
    label: string;
}

const PageLink: FC<PageLinkProps> = ({path, label}) => {
    return <StyledPageLink>
        <Link to={path}>
            <Button label={label} onClick={()=>{}}></Button>
        </Link>
    </StyledPageLink>
}

export default PageLink;
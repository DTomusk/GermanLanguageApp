import { FC } from "react";
import { Link } from "react-router-dom";
import Button from "../atoms/Button";
import { styled } from "styled-components";

const StyledPageLink = styled.div`
    width: 100%;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);`;

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
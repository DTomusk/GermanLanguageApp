import { Loader } from "lucide-react"
import { FC } from "react";
import styled from "styled-components"

const StyledLoader = styled(Loader)`
    animation: spin 1s linear infinite;
    width: 2rem;`;

const LoadingIcon: FC = () => {
    return(
    <div>
        <StyledLoader/>
    </div>
    )
}

export default LoadingIcon
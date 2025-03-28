import { X } from "lucide-react";
import { styled } from "styled-components";

const StyledCloseButton = styled(X)`
    cursor: pointer;
    margin: 0.5rem;`;

interface CloseButtonProps {
    onClick: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
    return <StyledCloseButton onClick={onClick}/>;
}

export default CloseButton;
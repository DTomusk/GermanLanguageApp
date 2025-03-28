import { AlertTriangle, Check, Info } from "lucide-react";
import { FC } from "react";
import { styled } from "styled-components";

const StyledIcon = styled.div`
    margin: 0.5rem;`;

const iconMap = {
    success: Check,
    info: Info,
    error: AlertTriangle
};

interface IconProps {
    type: "success" | "info" | "error";
}

const Icon: FC<IconProps> = ({type}) => {
    const IconComponent = iconMap[type];
    return <StyledIcon>
        <IconComponent />
    </StyledIcon>;
};

export default Icon;
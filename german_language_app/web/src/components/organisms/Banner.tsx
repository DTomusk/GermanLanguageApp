import { FC } from "react";
import { styled } from "styled-components";
import Icon from "../atoms/Icon";
import CloseButton from "../atoms/CloseButton";
import { theme } from "../../theme";

const StyledBanner = styled.div<{ 
        color: string, 
        bgcolor: string, 
        bordercolor: string     
    }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    overflow: hidden;
    border-radius: 5px;
    background-color: ${props => props.bgcolor};
    border: 1px solid ${props => props.bordercolor}; 
    color: ${props => props.color};
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
`;

interface BannerProps {
    type: "success" | "info" | "error";
    message: string;
    onClose: () => void;
}

const Banner: FC<BannerProps> = ({type, message, onClose}) => {
    return <StyledBanner color={theme[type].text} bgcolor={theme[type].background} bordercolor={theme[type].borderColor}>
        <Icon type={type} />
        {message}
        <CloseButton onClick={onClose} />
        </StyledBanner>;
}

export default Banner;
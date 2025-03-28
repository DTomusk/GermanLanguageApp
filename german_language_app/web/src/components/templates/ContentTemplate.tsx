import { FC } from "react";
import { styled } from "styled-components";
import Header from "../organisms/Header";

const SiteWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;`;

const ContentWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 20em;
    margin: 0 auto;
    gap: 1.5em;
    flex-grow: 1;`;

interface ContentTemplateProps {
    children: React.ReactNode;
}

const ContentTemplate: FC<ContentTemplateProps> = (props) => {
    return <SiteWrapper>
            <Header text="German Flashcard App" />
            <ContentWrapper>
                {props.children}
            </ContentWrapper>
        </SiteWrapper>;
}

export default ContentTemplate;
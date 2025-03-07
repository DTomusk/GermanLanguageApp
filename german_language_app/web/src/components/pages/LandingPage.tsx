import { styled } from "styled-components"
import Button from "../atoms/Button"
import Card from "../organisms/Card"

const ContentWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 20em;
    margin: 0 auto;
    gap: 1em;`;

function LandingPage() {
    return (
        <ContentWrapper>
            <Card>
            </Card>
            <Button label="Click me!" onClick={()=>[]}></Button>
        </ContentWrapper>
    )
}

export default LandingPage
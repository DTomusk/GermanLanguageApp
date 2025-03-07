import './App.css'
import SentenceInput from './SentenceInput'
import ViewVocabulary from './ViewVocabulary'
import ViewSentences from './ViewSentences'
import CreateFlashcard from './CreateFlashcard'
import FormField from './components/molecules/FormField'
import LandingPage from './components/pages/LandingPage'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <h1>David's awesome cool super app!</h1> */}
      {/* Here we might put a header, which could also go in a template file */}
      <LandingPage></LandingPage>
      {/* <FormField label="Name"></FormField>
      <CreateFlashcard></CreateFlashcard>
      <SentenceInput></SentenceInput>
      <ViewSentences></ViewSentences>
      <ViewVocabulary></ViewVocabulary> */}
    </ThemeProvider>
  )
}

export default App

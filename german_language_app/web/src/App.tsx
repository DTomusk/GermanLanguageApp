import './App.css'
import LandingPage from './components/pages/LandingPage'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PractisePage from './components/pages/PractisePage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <h1>David's awesome cool super app!</h1> */}
      {/* Here we might put a header, which could also go in a template file */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/practise" element={<PractisePage/>}></Route>
        </Routes>
      </BrowserRouter>
      {/* <FormField label="Name"></FormField>
      <CreateFlashcard></CreateFlashcard>
      <SentenceInput></SentenceInput>
      <ViewSentences></ViewSentences>
      <ViewVocabulary></ViewVocabulary> */}
    </ThemeProvider>
  )
}

export default App

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import Container from './components/layout/Container'
import Home from './components/pages/Home'

function App() {
  return (
    <Router>
      
        <Container customClass="min-height">
          <Routes>
            <Route exact path='/' element={<Home />} />
          </Routes>
        </Container>

   </Router>
  );
}

export default App;

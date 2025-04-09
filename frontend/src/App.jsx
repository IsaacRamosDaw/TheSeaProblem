import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/landing/LandingPage";

function App() {
  return (
    
    <Router>
      <Routes>
      {/* Cree un componente que ya tiene las llamadas de servicios  */}
      {/* Ve a components/landing/LandingPage.jsx  */}
        <Route path="*" element={<LandingPage />}/>
        <Route path="/" element={<LandingPage />}/>
      </Routes>
    </Router>
    
  )
}

export default App

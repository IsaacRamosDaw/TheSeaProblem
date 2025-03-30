import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/landing/LandingPage";

import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<LandingPage />}/>
        <Route path="/" element={<LandingPage />}/>
      </Routes>
    </Router>
  )
}

export default App

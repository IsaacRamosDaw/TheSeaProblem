import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/landing/LandingPage";
import { AuthProvider } from "./context/AuthContext";
import { CompanyList, AddCompany, CompanyDetail } from "./components/companies";

function App() {
  return (
    // <AuthProvider>
    //   <Router>
    //     <Routes>
    //       <Route path="/" element={<LandingPage />}/>
    //       <Route path="/companies" element={<CompanyList />}/>
    //       <Route path="/companies/add" element={<AddCompany />}/>
    //       <Route path="/companies/:id" element={<CompanyDetail />}/>
    //       <Route path="/companies/:id/edit" element={<AddCompany />}/>
    //       <Route path="*" element={<LandingPage />}/>
    //     </Routes>
    //   </Router>
    // </AuthProvider>
    
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

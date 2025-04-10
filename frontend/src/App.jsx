import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/landing/LandingPage";
import { AuthProvider } from "./context/AuthContext";
import { CompanyList, AddCompany, CompanyDetail } from "./components/companies";
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_DOMAIN}
      clientId={import.meta.env.VITE_CLIENT_ID}
      authorizationParams={{
        redirect_uri: import.meta.env.VITE_LOGIN_REDIRECT_URI,
        audience: import.meta.env.VITE_AUDIENCE
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/companies" element={<CompanyList />}/>
          <Route path="/companies/add" element={<AddCompany />}/>
          <Route path="/companies/:id" element={<CompanyDetail />}/>
          <Route path="/companies/:id/edit" element={<AddCompany />}/>
          <Route path="*" element={<LandingPage />}/>
        </Routes>
      </Router>
    </Auth0Provider>
  );
}

export default App;

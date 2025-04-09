import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./_Global.scss";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_DOMAIN}
      clientId={import.meta.env.VITE_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUDIENCE,
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>,
);

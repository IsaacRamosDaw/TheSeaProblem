import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./_Global.scss";
import App from "./App";
import { initAuth } from "../auth";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

initAuth().then(() => {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});

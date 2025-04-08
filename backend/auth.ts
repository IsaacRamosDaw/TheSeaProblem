import { auth, type ConfigParams } from "express-openid-connect";
import { type Express } from "express";

const { AUTH_SECRET, BASE_URL, AUTH_CLIENT_ID, ISSUER_BASE_URL } = process.env;

// Auth0 configuration
const config: ConfigParams = {
  authRequired: false, // Set to true if all routes require authentication
  auth0Logout: true, // Enables Auth0 logout
  secret: AUTH_SECRET!,
  baseURL: BASE_URL!, // Backend base URL (http://localhost:8080)
  clientID: AUTH_CLIENT_ID!,
  issuerBaseURL: ISSUER_BASE_URL!,
  routes: {
    callback: "/callback", // Callback route
  },
};

export default (app: Express) => {
  // Callback route - Redirect to the frontend after login
  app.get("/callback", (req, res) => {
    console.log("Callback route hit");
    res.redirect("http://localhost:5173"); // Redirect to the frontend
  });

  // Attach the OpenID Connect middleware
  app.use(auth(config));

  // Example protected route
  app.get("/protected", (req, res) => {
    res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
  });
};

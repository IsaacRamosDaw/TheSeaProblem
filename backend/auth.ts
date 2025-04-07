import { auth } from "express-openid-connect";
import { type Express, Router } from "express";

const { AUTH_CLIENT_ID, AUTH_SECRET, AUTH_BASE_URL, BASE_URL } = process.env;

// default values for the config for testing
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: AUTH_SECRET || "a long, randomly string",
  baseURL: BASE_URL || "http://localhost:8080",
  clientID: AUTH_CLIENT_ID || "a-client-id",
  issuerBaseURL: AUTH_BASE_URL || "https://your-tenant.auth0.com",
};

export default (app: Express) => {
  const router = Router();

  // req.isAuthenticated is provided from the auth router
  router.get("/", (req, res) => {
    res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
  });

  // auth router attaches /login, /logout, and /callback routes to the baseURL
  app.use(auth(config));
};

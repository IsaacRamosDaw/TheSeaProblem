// Authorization middleware. When used, the Access Token must
import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";

dotenv.config();

// exist and be verified against the Auth0 JSON Web Key Set.
export const checkJwt = auth({
  audience: process.env.VITE_AUDIENCE,
  issuerBaseURL: `https://${process.env.VITE_DOMAIN}`,
});

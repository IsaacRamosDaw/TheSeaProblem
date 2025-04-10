// Authorization middleware. When used, the Access Token must
import { auth } from "express-oauth2-jwt-bearer";

// exist and be verified against the Auth0 JSON Web Key Set.
export const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
});

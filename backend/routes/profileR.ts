import OpenId from "express-openid-connect";
import type { Express } from "express";

// example route for getting user profile
// this is a protected route, only accessible to authenticated users

export default (app: Express) => {
  app.get("/profile", OpenId.requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });
};

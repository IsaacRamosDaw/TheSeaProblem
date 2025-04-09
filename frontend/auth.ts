// auth.js
import { Auth0Client } from "@auth0/auth0-spa-js";

let auth0: Auth0Client | null = null;

export const initAuth = async () => {
  auth0 = new Auth0Client({
    domain: import.meta.env.VITE_DOMAIN,
    clientId: import.meta.env.VITE_CLIENT_ID,
  });

  return auth0;
};

export const login = async () =>
  await auth0?.loginWithRedirect({
    authorizationParams: {
      redirect_uri: import.meta.env.VITE_LOGIN_REDIRECT_URI,
    },
  });

export const getUser = async () => await auth0?.getUser();

export const getAuthToken = async () => {
  const token = await auth0?.getTokenSilently({
    authorizationParams: { audience: import.meta.env.VITE_AUDIENCE },
  });
  return token;
};

export const logout = async () =>
  auth0?.logout({
    logoutParams: {
      returnTo: import.meta.env.VITE_LOGOUT_REDIRECT_URI,
    },
  });

export const isAuthenticated = async () => {
  return auth0?.isAuthenticated();
};

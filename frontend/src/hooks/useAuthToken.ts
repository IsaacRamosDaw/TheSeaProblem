import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export const useAuthToken = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const t = await getAccessTokenSilently();
      setToken(t);
    };
    if (user) {
      getToken();
    }
  }, [getAccessTokenSilently, user]);

  return token;
};

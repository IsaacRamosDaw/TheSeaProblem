import { getUser } from "../../auth";
import { useEffect, useState } from "react";
import { type User } from "@auth0/auth0-spa-js";

export const useUser = () => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      setUser(await getUser());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return {
    user,
  };
};

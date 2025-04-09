import { getUser } from "../../auth";
import { useState } from "react";
import { type User } from "@auth0/auth0-spa-js";

export const useUser = () => {
  const [user, setUser] = useState<User | undefined>(undefined);

  setInterval(async () => {
    setUser(await getUser());
  }, 500);

  return {
    user,
  };
};

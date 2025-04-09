import { useAuthToken } from "./useAuthToken";

export const useHeaders = (): Headers => {
  const token = useAuthToken();

  if (!token) {
    return new Headers({
      Accept: "application/json",
    });
  }

  return new Headers({
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  });
};

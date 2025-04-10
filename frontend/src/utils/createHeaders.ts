import { getAuthToken } from "../../auth";

export const createHeaders = async () =>
  new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${await getAuthToken()}`,
  });

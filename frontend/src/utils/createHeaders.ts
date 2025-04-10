import { getAuthToken } from "../../auth";

export const createHeaders = async () =>
  new Headers({
    Accept: "application/json",
    Authorization: `Bearer ${await getAuthToken()}`,
  });

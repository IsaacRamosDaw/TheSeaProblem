import type { User } from "@/shared/types/db-models";
import { DELETE, GET, POST, PUT } from "../utils/http";
import { UsersSchema } from "@/shared/schemas/user-schema";

const endpoint = "http://localhost:8080/api/users";

//! Aquí me encargo de hacer una llamada a los datos con el controlador findall() de ourUsersC.js+

export const getAllUsers = (): Promise<User[]> => GET(`${endpoint}`);

export const getUserById = (id: string): Promise<User | null> =>
  GET(`${endpoint}/${id}`);

export const createUser = (user: User): Promise<User | null> => {
  const result = UsersSchema.safeParse(user);
  if (!result.success) {
    console.error("Validation failed:", result.error);
    return Promise.reject(null);
  }
  return POST(`${endpoint}`, result.data);
};

export const updateUserById = (
  id: string,
  updatedUser: User,
): Promise<User> | null => {
  const result = UsersSchema.safeParse(updatedUser);
  if (!result.success) {
    console.error("Validation failed:", result.error);
    return null;
  }
  return PUT(`${endpoint}/${id}`, result.data);
};

export const deleteUserById = (id: string): void => {
  DELETE(`${endpoint}/${id}`);
};


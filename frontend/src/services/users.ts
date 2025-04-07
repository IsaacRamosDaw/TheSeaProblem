import type { User } from "@/shared/types/db-models";
import { DELETE, GET, POST, PUT } from "../utils/http";

const endpoint = "http://localhost:8080/api/users";

//! Aquí me encargo de hacer una llamada a los datos con el controlador findall() de ourUsersC.js+

export const getAllUsers = (): Promise<User[]> => GET(`${endpoint}`);

export const gerUserById = (id: string): Promise<User> =>
  GET(`${endpoint}/${id}`);

export const createUser = (User: User): Promise<User> =>
  POST(`${endpoint}`, User);

export const updateUserById = (id: string, updatedUser: User): Promise<User> =>
  PUT(`${endpoint}/${id}`, updatedUser);

export const deleteUserById = (id: string): Promise<void> =>
  DELETE(`${endpoint}/${id}`);

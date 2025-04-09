import { User } from "@/shared/types/db-models";
import { UsersSchema } from "@/shared/schemas/user-schema";
import { useHttp } from "../useHttp";

const endpoint = "http://localhost:8080/api/users";

export const useCompanyService = () => {
  const { GET, POST, PUT, DELETE } = useHttp();

  const getAllUsers = (): Promise<User[]> => GET(`${endpoint}`);

  const getUserById = (id: string): Promise<User> => GET(`${endpoint}/${id}`);

  const createUser = (User: User): Promise<User> | null => {
    const result = UsersSchema.safeParse(User);
    if (!result.success) {
      console.error("Validation failed:", result.error);
      return null;
    }
    return POST(`${endpoint}`, User);
  };

  const updateUserById = (
    id: string,
    updatedUser: User,
  ): Promise<User> | null => {
    const result = UsersSchema.safeParse(updatedUser);
    if (!result.success) {
      console.error("Validation failed:", result.error);
      return null;
    }
    return PUT(`${endpoint}/${id}`, updatedUser);
  };

  const deleteUserById = (id: string): void => {
    DELETE(`${endpoint}/${id}`);
  };

  return {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
  };
};

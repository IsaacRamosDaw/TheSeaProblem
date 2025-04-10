import { z } from "zod";

export const UsersSchema = z.object({
  id: z.number().optional(),
  auth0Id: z.string().min(1, { message: "Auth0 ID is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  lastname: z.string().min(1, { message: "Lastname is required" }),
  email: z.string().min(1, { message: "Email is required" }),
});
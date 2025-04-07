import { z } from "zod";

export const UsersSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: "Name is required" }),
  lastname: z.string().min(1, { message: "Lastname is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  email: z.string().min(1, { message: "Email is required" }),
});
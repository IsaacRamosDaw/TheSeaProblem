import { z } from "zod";

// Define zod schemas for validation
// This allows us to use the same types in both the frontend and backend
export const PollutionEnum = z.enum(["Plastic", "Oil Spill", "Chemical"]);

export const ReportSchema = z.object({
  id: z.number().optional(),
  user: z.string().min(1, { message: "User is required" }),
  shortDescription: z.string().min(1, { message: "Description is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  pollutionType: PollutionEnum,
  date: z.string(),
});

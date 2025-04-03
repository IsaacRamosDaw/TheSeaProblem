import { z } from "zod";

// Define zod schemas for validation
// This allows us to use the same types in both the frontend and backend
export const EmissionsEnum = z.enum(["Plastic", "Oil Spill", "Chemical"]);

export const EmissionsSchema = z.object({
  id: z.number().optional(),
  volume: z.number().min(1, { message: "volume is required" }),
  frequency: z.string().min(1, { message: "frequency is required" }),
  dischargePoint: z.string().min(1, { message: "dischargePoint is required" }),
  reductionTarget: z.string().min(1, { message: "reductionTarget is required" }),
  companyId: z.number().min(1, { message: "companyId is required" }),
  pollutionType: EmissionsEnum,
  date: z.string(),
});
<<<<<<< HEAD
import { z } from "zod";

// Define zod schemas for validation
// This allows us to use the same types in both the frontend and backend
export const EmissionsEnum = z.enum(["Plastic", "Oil Spill", "Chemical"]);
=======

import { z } from "zod";
import { PollutionEnum } from "./report-schema";
>>>>>>> 9e37b44436f93fea2eb527baf9c305113cdb122b

export const EmissionsSchema = z.object({
  id: z.number().optional(),
  volume: z.number().min(1, { message: "volume is required" }),
  frequency: z.string().min(1, { message: "frequency is required" }),
  dischargePoint: z.string().min(1, { message: "dischargePoint is required" }),
  reductionTarget: z.string().min(1, { message: "reductionTarget is required" }),
  companyId: z.number().min(1, { message: "companyId is required" }),
<<<<<<< HEAD
  pollutionType: EmissionsEnum,
=======
  pollutionType: PollutionEnum,
>>>>>>> 9e37b44436f93fea2eb527baf9c305113cdb122b
  date: z.string(),
});

import { z } from "zod";
import { PollutionEnum } from "./report-schema";

export const EmissionsSchema = z.object({
  id: z.number().optional(),
  volume: z.number().min(1, { message: "volume is required" }),
  frequency: z.string().min(1, { message: "frequency is required" }),
  dischargePoint: z.string().min(1, { message: "dischargePoint is required" }),
  reductionTarget: z.string().min(1, { message: "reductionTarget is required" }),
  companyId: z.number().min(1, { message: "companyId is required" }),
  pollutionType: PollutionEnum,
  date: z.string(),
});
import { z } from "zod";
import { PollutionEnum, ReportSchema } from "../schemas/report-schema";
import { UserSchema } from "../schemas/user-schema";

// Infer shared types from Zod schemas
// This allows us to use the same types in both the frontend and backend
export type User = z.infer<typeof UserSchema>;
export type Report = z.infer<typeof ReportSchema>;
export type PollutionType = z.infer<typeof PollutionEnum>;

// Define a type for the attributes of the model
export type Company = {
  id?: number;
  companyName: string;
  taxId: string;
  address: string;
  userId: number;
  industrialSector: string;
  relatedActivitiesDescription: string;
}

export type Emissions = {
  id?: number;
  pollutionType: string;
  volume: number;
  frequency: string;
  dischargePoint: string;
  reductionTarget: string;
  companyId: number;
}

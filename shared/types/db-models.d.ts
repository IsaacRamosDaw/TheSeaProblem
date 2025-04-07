import { z } from "zod";
import { PollutionEnum, ReportSchema } from "../schemas/report-schema";
import { EmissionsEnum, EmissionSchema } from "../schemas/emission-schema";

// Infer shared types from Zod schemas
// This allows us to use the same types in both the frontend and backend
export type Report = z.infer<typeof ReportSchema>;
export type PollutionType = z.infer<typeof PollutionEnum>;
export type EmissionsType = z.infer<typeof EmissionsEnum>;
export type Emissions = z.infer<EmissionsSchema>;

export type User = {
  id?: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
};

// Define a type for the attributes of the model
export type Company = {
  id?: number;
  companyName: string;
  taxId: string;
  address: string;
  userId: number;
  industrialSector: string;
  relatedActivitiesDescription: string;
};

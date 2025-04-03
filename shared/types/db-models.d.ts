import { z } from "zod";
import { PollutionEnum, ReportSchema } from "../schemas/report-schema";

// Infer shared types from Zod schemas
// This allows us to use the same types in both the frontend and backend
export type Report = z.infer<typeof ReportSchema>;
export type PollutionType = z.infer<typeof PollutionEnum>;

export type User = {
  id?: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
}


// Define a type for the attributes of the model
export type Company = {
  id?: number;
  companyName: string;
  taxId: string;
  address: string;
  userId: number;
  industrialSector: string;
  relatedActivitiesDescription: string;
  emissionsId: number; // dudo, porque esto es el fk de la tabla emissions
}

export type Emissions = {
  id?: number;
  name: string;
}

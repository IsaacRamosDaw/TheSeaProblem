import { z } from "zod";
import { PollutionEnum, ReportSchema } from "../schemas/report-schema";

// Infer shared types from Zod schemas
// This allows us to use the same types in both the frontend and backend
export type Report = z.infer<typeof ReportSchema>;
export type PollutionType = z.infer<typeof PollutionEnum>;

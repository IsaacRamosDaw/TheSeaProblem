import { z } from "zod";
import { PollutionEnum, ReportSchema } from "../schemas/report-schema";
import { UsersSchema } from "../schemas/user-schema";
import { CompanySchema } from "../schemas/company-schema";
import { EmissionsSchema } from "../schemas/emission-schema";
import { StatictReporSchema } from "../schemas/StaticReport-Schema";

export type User = z.infer<typeof UsersSchema>;
export type Report = z.infer<typeof ReportSchema>;
export type PollutionType = z.infer<typeof PollutionEnum>;
export type Company = z.infer<typeof CompanySchema>;
export type Emission = z.infer<typeof EmissionsSchema>;
export type StaticReport = z.infer<typeof StatictReportSchema>;

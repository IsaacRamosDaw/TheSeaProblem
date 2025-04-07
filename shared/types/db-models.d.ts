import { z } from "zod";
import { PollutionEnum, ReportSchema } from "../schemas/report-schema";
<<<<<<< HEAD
import { EmissionsEnum, EmissionSchema } from "../schemas/emission-schema";
=======
import { UsersSchema } from "../schemas/user-schema";
import { CompanySchema } from "../schemas/company-schema";
import { EmissionsSchema } from "../schemas/emission-schema";
>>>>>>> 9e37b44436f93fea2eb527baf9c305113cdb122b

export type User = z.infer<typeof UsersSchema>;
export type Report = z.infer<typeof ReportSchema>;
export type PollutionType = z.infer<typeof PollutionEnum>;
<<<<<<< HEAD
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
=======
export type Company = z.infer<typeof CompanySchema>;
export type Emission = z.infer<typeof EmissionsSchema>;
>>>>>>> 9e37b44436f93fea2eb527baf9c305113cdb122b

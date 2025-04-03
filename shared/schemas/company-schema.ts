import { z } from "zod";

export const CompanySchema = z.object({
  id: z.number().optional(),
  companyName: z.string().min(1, { message: "Company is required" }),
  taxId: z.string().min(1, { message: "Tax is required" }),
  address: z.string().min(1, { message: "Adress is required" }),
  userId: z.number().min(1, { message: "User is required" }),
  industrialSector: z.string().min(1, { message: "Industrial sector is required" }),
  relatedActivitiesDescription: z.string().min(1, { message: "Description of activities is required" }),
});
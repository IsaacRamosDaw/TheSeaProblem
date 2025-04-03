import { z } from "zod";

export const CompanySchema = z.object({
  id: z.number().optional(),
  companyName: z.string().min(1, { message: "Company name is required" }),
  taxId: z.string().min(1, { message: "Tax ID is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  userId: z.number(),
  industrialSector: z.string().min(1, { message: "Industrial sector is required" }),
  relatedActivitiesDescription: z.string().min(1, { message: "Related activities description is required" }),
});



import type { Company } from "@/shared/types/db-models";
import { DELETE, GET, POST, PUT } from "../utils/http";
import { CompanySchema } from "@/shared/schemas/company-schema";

const endpoint = "http://localhost:8080/api/companies";

//! Aquí me encargo de hacer una llamada a los datos con el controlador findall() de ourCompanysC.js+

export const getAllCompanies = (): Promise<Company[]> => GET(`${endpoint}`);

export const gerCompanyById = (id: string): Promise<Company> =>
  GET(`${endpoint}/${id}`);

export const createCompany = (Company: Company): Promise<Company> | null => {
  const result = CompanySchema.safeParse(Company);
  if (!result.success) {
    console.error("Validation failed:", result.error);
    return null;
  }
  return POST(`${endpoint}`, Company);
};

export const updateCompanyById = (
  id: string,
  updatedCompany: Company,
): Promise<Company> | null => {
  const result = CompanySchema.safeParse(updatedCompany);
  if (!result.success) {
    console.error("Validation failed:", result.error);
    return null;
  }
  return PUT(`${endpoint}/${id}`, updatedCompany);
};

export const deleteCompanyById = (id: string): Promise<void> =>
  DELETE(`${endpoint}/${id}`);

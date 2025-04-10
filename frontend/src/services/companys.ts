import type { Company } from "@/shared/types/db-models";
import { DELETE, GET, POST, PUT } from "../utils/http";
import { CompanySchema } from "../../../shared/schemas/company-schema";

const endpoint = "http://localhost:8080/api/companies";

export const getAllCompanies = () : Promise<Company[]> =>
  GET(`${endpoint}`);

export const getCompanyById = (id: string): Promise<Company> =>
  GET(`${endpoint}/${id}`);

export const createCompany = (
  company: Company,
): Promise<Company | null> => {
  const result = CompanySchema.safeParse(company);
  if (!result.success) {
    console.error("Validation failed:", result.error);
    return Promise.reject(null);
  }

  return POST(`${endpoint}`, result.data);
};

export const updateCompanyById = async (
  id: string,
  company: Company,
): Promise<Company> => {  

  const result = CompanySchema.safeParse(company);
  if (!result.success) {
    console.error("Validation failed:", result.error);
    throw new Error(`Validation failed: ${result.error.message}`);
  }

  return PUT(`${endpoint}/${id}`,result.data);
};

export const deleteCompanyById = (
  id: string,
): Promise<void> => DELETE(`${endpoint}/${id}`);

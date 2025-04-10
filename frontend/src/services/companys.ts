import type { Company } from "@/shared/types/db-models";
import { DELETE, GET, POST, PUT } from "../utils/http";
import { CompanySchema } from "../../../shared/schemas/company-schema";

const endpoint = "http://localhost:8080/api/companies";

//! Aquí me encargo de hacer una llamada a los datos con el controlador findall() de ourCompanysC.js+

export const getAllCompanies = (headers: Headers): Promise<Company[]> =>
  GET(`${endpoint}`);

export const getCompanyById = (id: string): Promise<Company> =>
  GET(`${endpoint}/${id}`);

export const createCompany = async (companyData: Company): Promise<Company | null> => {
  const headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });

  const result = CompanySchema.safeParse(companyData);
  if (!result.success) {
    console.error("Validation failed:", result.error);
    throw new Error(`Validation failed: ${result.error.message}`);
  }

  // Asegurarnos de que los datos estén en el formato correcto
  const body = {
    companyName: String(companyData.companyName),
    taxId: String(companyData.taxId),
    address: String(companyData.address),
    industrialSector: String(companyData.industrialSector),
    relatedActivitiesDescription: String(companyData.relatedActivitiesDescription),
    userId: Number(companyData.userId)
  };

  return POST(`${endpoint}`, body, headers);
};

export const updateCompanyById = async (
  id: string,
  companyData: Company,
): Promise<Company> => {
  
  const headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });

  const result = CompanySchema.safeParse(companyData);
  if (!result.success) {
    console.error("Validation failed:", result.error);
    throw new Error(`Validation failed: ${result.error.message}`);
  }

  // Asegurarnos de que los datos estén en el formato correcto
  const body = {
    companyName: String(companyData.companyName),
    taxId: String(companyData.taxId),
    address: String(companyData.address),
    industrialSector: String(companyData.industrialSector),
    relatedActivitiesDescription: String(companyData.relatedActivitiesDescription),
    userId: Number(companyData.userId)
  };

  return PUT(`${endpoint}/${id}`, body, headers);
};

export const deleteCompanyById = (
  id: string,
  headers: Headers,
): Promise<void> => DELETE(`${endpoint}/${id}`);

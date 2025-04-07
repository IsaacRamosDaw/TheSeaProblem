import type { Company } from "@/shared/types/db-models";
import { DELETE, GET, POST, PUT } from "../utils/http";

const endpoint = "http://localhost:8080/api/companies";

//! Aquí me encargo de hacer una llamada a los datos con el controlador findall() de ourCompanysC.js+

export const getAllCompanies = (): Promise<Company[]> => GET(`${endpoint}`);

export const gerCompanyById = (id: string): Promise<Company> =>
  GET(`${endpoint}/${id}`);

export const createCompany = (Company: Company): Promise<Company> =>
  POST(`${endpoint}`, Company);

export const updateCompanyById = (
  id: string,
  updatedCompany: Company,
): Promise<Company> => PUT(`${endpoint}/${id}`, updatedCompany);

export const deleteCompanyById = (id: string): Promise<void> =>
  DELETE(`${endpoint}/${id}`);

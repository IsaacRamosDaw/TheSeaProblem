import { Company } from "@/shared/types/db-models";
import { CompanySchema } from "@/shared/schemas/company-schema";
import { useHttp } from "../useHttp";

const endpoint = "http://localhost:8080/api/companies";

export const useCompanyService = () => {
  const { GET, POST, PUT, DELETE } = useHttp();

  const getAllCompanies = (): Promise<Company[]> => GET(`${endpoint}`);

  const getCompanyById = (id: string): Promise<Company> =>
    GET(`${endpoint}/${id}`);

  const createCompany = (Company: Company): Promise<Company> | null => {
    const result = CompanySchema.safeParse(Company);
    if (!result.success) {
      console.error("Validation failed:", result.error);
      return null;
    }
    return POST(`${endpoint}`, Company);
  };

  const updateCompanyById = (
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

  const deleteCompanyById = (id: string): Promise<void> =>
    DELETE(`${endpoint}/${id}`);

  return {
    getAllCompanies,
    getCompanyById,
    createCompany,
    updateCompanyById,
    deleteCompanyById,
  };
};

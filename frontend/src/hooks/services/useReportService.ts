import { ReportSchema } from "../../../../shared/schemas/report-schema";
import type { Report } from "../../../../shared/types/db-models";
import { useHttp } from "../useHttp";

const endpoint = "http://localhost:8080/api/reports";

export const useReportService = () => {
  const { GET, POST, PUT, DELETE } = useHttp();

  const getAllReports = (): Promise<Report[]> => GET(`${endpoint}`);

  const getReportById = (id: string): Promise<Report> =>
    GET(`${endpoint}/${id}`);

  const createReport = (Report: Report): Promise<Report> | null => {
    const result = ReportSchema.safeParse(Report);
    if (!result.success) {
      console.error("Validation failed:", result.error);
      return null;
    }
    return POST(`${endpoint}`, Report);
  };

  const updateReportById = (
    id: string,
    updatedReport: Report,
  ): Promise<Report> | null => {
    const result = ReportSchema.safeParse(updatedReport);
    if (!result.success) {
      console.error("Validation failed:", result.error);
      return null;
    }
    return PUT(`${endpoint}/${id}`, updatedReport);
  };

  const deleteReportById = (id: string): Promise<void> =>
    DELETE(`${endpoint}/${id}`);

  return {
    getAllReports,
    getReportById,
    createReport,
    updateReportById,
    deleteReportById,
  };
};

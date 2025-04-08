import type { Report } from "@/shared/types/db-models";
import { DELETE, GET, POST, PUT } from "../utils/http";
import { ReportSchema } from "@/shared/schemas/report-schema";

const endpoint = "http://localhost:8080/api/reports";

//! Aquí me encargo de hacer una llamada a los datos con el controlador findall() de ourReportsC.js+

export const getAllReports = (): Promise<Report[]> => GET(`${endpoint}`);

export const getReportById = (id: string): Promise<Report> =>
  GET(`${endpoint}/${id}`);

export const createReport = (Report: Report): Promise<Report> | null => {
  const result = ReportSchema.safeParse(Report);
  if (!result.success) {
    console.error("Validation failed:", result.error);
    return null;
  }
  return POST(`${endpoint}`, Report);
};

export const updateReportById = (
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

export const deleteReportById = (id: string): Promise<void> =>
  DELETE(`${endpoint}/${id}`);

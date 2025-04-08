import type { Report } from "@/shared/types/db-models";
import { ReportSchema } from "@/shared/schemas/report-schema";
import { DELETE, GET, POST, PUT } from "../utils/http";

const endpoint = "http://localhost:8080/api/reports";

export const getAllReports = (): Promise<Report[]> => GET(`${endpoint}`);

export const getReportById = (id: string): Promise<Report> => GET(`${endpoint}/${id}`);

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

export const deleteReportById = (id: string): Promise<void> => DELETE(`${endpoint}/${id}`);

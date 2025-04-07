import type { Report } from "@/shared/types/db-models";
import { DELETE, GET, POST, PUT } from "../utils/http";

const endpoint = "http://localhost:8080/api/reports";

//! Aquí me encargo de hacer una llamada a los datos con el controlador findall() de ourReportsC.js+

export const getAllReports = (): Promise<Report[]> => GET(`${endpoint}`);

export const gerReportById = (id: string): Promise<Report> =>
  GET(`${endpoint}/${id}`);

export const createReport = (report: Report): Promise<Report> =>
  POST(`${endpoint}`, report);

export const updateReportById = (
  id: string,
  updatedReport: Report,
): Promise<Report> => PUT(`${endpoint}/${id}`, updatedReport);

export const deleteReportById = (id: string): Promise<void> =>
  DELETE(`${endpoint}/${id}`);

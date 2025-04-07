import type { Emission } from "@/shared/types/db-models";
import { DELETE, GET, POST, PUT } from "../utils/http";

const endpoint = "http://localhost:8080/api/emissions";

//! Aquí me encargo de hacer una llamada a los datos con el controlador findall() de ourEmissionsC.js+

export const getAllEmissions = (): Promise<Emission[]> => GET(`${endpoint}`);

export const gerEmissionById = (id: string): Promise<Emission> =>
  GET(`${endpoint}/${id}`);

export const createEmission = (Emission: Emission): Promise<Emission> =>
  POST(`${endpoint}`, Emission);

export const updateEmissionById = (
  id: string,
  updatedEmission: Emission,
): Promise<Emission> => PUT(`${endpoint}/${id}`, updatedEmission);

export const deleteEmissionById = (id: string): Promise<void> =>
  DELETE(`${endpoint}/${id}`);

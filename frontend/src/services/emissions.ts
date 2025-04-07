import type { Emission } from "@/shared/types/db-models";
import { DELETE, GET, POST, PUT } from "../utils/http";
import { EmissionsSchema } from "@/shared/schemas/emission-schema";

const endpoint = "http://localhost:8080/api/emissions";

//! Aquí me encargo de hacer una llamada a los datos con el controlador findall() de ourEmissionsC.js+

export const getAllEmissions = (): Promise<Emission[]> => GET(`${endpoint}`);

export const getEmissionById = (id: string): Promise<Emission> =>
  GET(`${endpoint}/${id}`);

export const createEmission = (
  Emission: Emission,
): Promise<Emission> | null => {
  const result = EmissionsSchema.safeParse(Emission);
  if (!result.success) {
    console.error("Validation failed:", result.error);
    return null;
  }
  return POST(`${endpoint}`, Emission);
};

export const updateEmissionById = (
  id: string,
  updatedEmission: Emission,
): Promise<Emission> | null => {
  const result = EmissionsSchema.safeParse(updatedEmission);
  if (!result.success) {
    console.error("Validation failed:", result.error);
    return null;
  }
  return PUT(`${endpoint}/${id}`, updatedEmission);
};

export const deleteEmissionById = (id: string): Promise<void> =>
  DELETE(`${endpoint}/${id}`);

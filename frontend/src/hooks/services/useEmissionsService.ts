import { EmissionsSchema } from "@/shared/schemas/emission-schema";
import type { Emission } from "@/shared/types/db-models";
import { useHttp } from "../useHttp";

const endpoint = "http://localhost:8080/api/emissions";

export const useEmissionsService = () => {
  const { GET, POST, PUT, DELETE } = useHttp();

  const getAllEmissions = (): Promise<Emission[]> => GET(`${endpoint}`);

  const getEmissionById = (id: string): Promise<Emission> =>
    GET(`${endpoint}/${id}`);

  const createEmission = (Emission: Emission): Promise<Emission> | null => {
    const result = EmissionsSchema.safeParse(Emission);
    if (!result.success) {
      console.error("Validation failed:", result.error);
      return null;
    }
    return POST(`${endpoint}`, Emission);
  };

  const updateEmissionById = (
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

  const deleteEmissionById = (id: string): Promise<void> =>
    DELETE(`${endpoint}/${id}`);

  return {
    getAllEmissions,
    getEmissionById,
    createEmission,
    updateEmissionById,
    deleteEmissionById,
  };
};

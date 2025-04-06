import type { Company } from "@/shared/types/db-models";

const endpoint = "http://localhost:8080/api/companies";

// Obtener todas las compañías
export const getCompanies = () => {
  return fetch(endpoint, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener las compañías");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error al obtener las compañías:", error);
      throw error;
    });
};

// Obtener una compañía por ID
export const getCompanyById = (id: number) => {
  return fetch(`${endpoint}/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener la compañía");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error al obtener la compañía:", error);
      throw error;
    });
};

// Crear una nueva compañía
export const createCompany = (company: Omit<Company, "id">) => {
  return fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(company),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al crear la compañía");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error al crear la compañía:", error);
      throw error;
    });
};

// Actualizar una compañía existente
export const updateCompany = (id: number, company: Partial<Company>) => {
  return fetch(`${endpoint}/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(company),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al actualizar la compañía");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error al actualizar la compañía:", error);
      throw error;
    });
};

// Eliminar una compañía
export const deleteCompany = (id: number) => {
  return fetch(`${endpoint}/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al eliminar la compañía");
      }
      return true;
    })
    .catch((error) => {
      console.error("Error al eliminar la compañía:", error);
      throw error;
    });
}; 
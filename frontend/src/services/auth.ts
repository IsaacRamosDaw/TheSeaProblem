const endpoint = "http://localhost:8080/api/auth/login";

//! Aquí me encargo de hacer una llamada a los datos con el controlador findall() de ourCompanysC.js+

export const login = async () => {
  try {
    window.location.href = "http://localhost:8080/login";
  } catch (error) {
    console.error("Login failed:", error);
  }
};

export const logout = async () => {
  try {
    window.location.href = "http://localhost:8080/logout";
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

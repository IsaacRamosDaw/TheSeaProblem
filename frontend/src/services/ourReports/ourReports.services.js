const endpoint = "http://localhost:8080/ourReports/";

//! Aquí me encargo de hacer una llamada a los datos con el controlador findall() de ourReportsC.js 

export function get () {
  const data = fetch(endpoint, {
    method: 'GET',
    headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
    }),
  }).then(response => {
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    return response.json();
  }).catch(error => {
    console.error("CHACHO HUBO UN ERRO MUCHACHO");
    return error;
  })

  return data;
}

const endpoint = "http://localhost:8080/ourReports/";

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

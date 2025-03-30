import { useEffect, useState } from "react";
import { get } from "../../services/ourReports/ourReports.services";
export function LandingPage() {
  const [ourReports, setOurReports] = useState([]);

  useEffect(() => {
    (
      async function fetchData() {
        const data = await get();
        console.log(data);
        setOurReports(data);
      }
    )();
  }, []);

  return (
    <div>
      <h1>A</h1>
      {ourReports.map(report => (
        <h2 key={report.id}>{report.name}</h2>
      ))}
    </div>
  );
}
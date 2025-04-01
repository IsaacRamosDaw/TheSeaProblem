import { useEffect, useState } from "react";
import { getOurReports } from "@/frontend/src/services/ourReports/ourReports";
import { OurReportAttributes } from "@/backend/models/ourReportsM";


//! Ten al lado el services/ourReports.services.js
export function LandingPage() {
  const [ourReports, setOurReports] = useState<OurReportAttributes[]>([]);

  useEffect(() => {
    //! Esto es una función autoinvocada, se ejecuta al momento de leerse
    (
      async function fetchData() {
        const data = await getOurReports();
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
import { useEffect, useState } from "react";
import type { Report } from "@/shared/types/db-models";
import { getOurReports } from "../../services/ourReports";

//! Ten al lado el services/ourReports.services.js
export function LandingPage() {
  const [ourReports, setOurReports] = useState<Report[]>([]);
  const [text, setText] = useState<string>();

  useEffect(() => {
    //! Esto es una función autoinvocada, se ejecuta al momento de leerse
    (async function fetchData() {
      const data = await getOurReports();
      setOurReports(data);
    })();
  }, []);

  return (
    <div>
      <h1>A</h1>
      {ourReports.map((report) => (
        <h2 key={report.id}>{report.description}</h2>
      ))}
    </div>
  );
}

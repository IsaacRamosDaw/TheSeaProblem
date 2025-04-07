import { useEffect, useState } from "react";
import type { Report } from "@/shared/types/db-models";
import "./landingPage.scss";
//! Ten al lado el services/ourReports.services.js
export function LandingPage() {
  const [ourReports, setOurReports] = useState<Report[]>([]);
  const [text, setText] = useState<string>();

  // useEffect(() => {
  //   (async function fetchData() {
  //     const data = await getOurReports();
  //     setOurReports(data);
  //   })();
  // }, []);

  return (
    <div>
      <h1>A</h1>
    </div>
  );
}

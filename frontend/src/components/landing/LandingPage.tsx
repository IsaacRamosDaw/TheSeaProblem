import { useEffect, useState } from "react";
import type { Report } from "@/shared/types/db-models";
import { getOurReports } from "../../services/ourReports";
import './landingPage.scss'
import WaterIcons from "../waterIcons/WaterIcons";
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
    <div className="landing-container">
      <h1>Water Pollution Monitor</h1>
      <WaterIcons />
    </div>
  );
}

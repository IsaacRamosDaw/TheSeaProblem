import { useEffect, useState } from "react";
import type { Report } from "@/shared/types/db-models";
import { Header } from "../general/header/Header";
import { Footer } from "../general/footer/Footer";
import { StaticReports } from "./staticReports/StaticReports";
import EmissionsChart from "../emissionsChart/EmissionsChart";
import styles from "./landingPage.module.scss";

import { login, logout } from "../../services/auth";
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
    <div className={styles.landingPage}>
      <Header />
      <StaticReports />
      <Footer />
      {/* I put it here to be able to see that the graph was displayed correctly. */}
      <h1>Bienvenido al Dashboard de The Sea Problem</h1>
      <EmissionsChart />
      <button onClick={login}>login</button>
      <button onClick={logout}>logout</button>
    </div>
  );
}

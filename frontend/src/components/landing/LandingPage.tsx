import { useEffect, useState } from "react";
import type { Report } from "@/shared/types/db-models";
import { getOurReports } from "../../services/ourReports";
import { Header } from "../general/header/Header";
import './landingPage.scss'
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
    <>
      <Header />
      <h1>A</h1>
    </>
  );
}

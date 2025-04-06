import { useEffect, useState } from "react";
import type { Report } from "@/shared/types/db-models";
import { getOurReports } from "../../services/ourReports";
import { Header } from "../general/header/Header";
import { Footer } from "../general/footer/Footer";
import { StaticReports } from "./staticReports/StaticReports";

import './landingPage.scss'

export function LandingPage() {
  // const [ourReports, setOurReports] = useState<Report[]>([]);
  // const [text, setText] = useState<string>();

  // useEffect(() => {
  //   (async function fetchData() {
  //     const data = await getOurReports();
  //     setOurReports(data);
  //   })();
  // }, []);

  return (
    <>
      <Header />
      <StaticReports/>
      <Footer />
    </>
  );
}

import { useEffect, useState } from "react";
import type { Report } from "@/shared/types/db-models";
import { CompanyList } from "../companies/index";
import { Header } from "../general/header/Header";
import { Footer } from "../general/footer/Footer";
import { StaticReports } from "./staticReports/StaticReports";
import EmissionsChart from "../emissionsChart/EmissionsChart";
import styles from "./landingPage.module.scss";
import { RelatedTopics } from "./relatedTopics/RelatedTopics";

export function LandingPage() {
  return (
    <div className={styles.landingPage}>
      <Header />
      <StaticReports/>
      {/* I put it here to be able to see that the graph was displayed correctly. */}
      <h1>Bienvenido al Dashboard de The Sea Problem</h1>
      <RelatedTopics/>
      <EmissionsChart />
      <Footer />
    </div>
  );
}

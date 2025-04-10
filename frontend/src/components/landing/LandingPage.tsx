import { useEffect, useState } from "react";
import type { Report } from "@/shared/types/db-models";
import { CompanyList } from "../companies/index";
import { Header } from "../general/header/Header";
import { StaticReports } from "./staticReports/StaticReports";
import EmissionsChart from "../emissionsChart/EmissionsChart";
import styles from "./landingPage.module.scss";
import { RelatedTopics } from "./relatedTopics/RelatedTopics";
import { UserReportsContainer } from "./usersReportsContainer/UserReportsContainer";
import { login, logout } from "../../../auth";
import { useUser } from "../../hooks/useUser";
import { EmissionsImport } from "../EmissionsImport";
import { Footer } from "../general/footer/Footer";

//! Ten al lado el services/ourReports.services.js
export function LandingPage() {
  const { user } = useUser();
  return (
    <div className={styles.landingPage}>
      <Header />
      {/* I put it here to be able to see that the graph was displayed correctly. */}
      {user ? (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ) : (
        <div>
          <h2>You are not logged in</h2>
          <p>Please log in to see your profile</p>
        </div>
      )}
      {/* <button onClick={login}>Log In</button> */}
      <button onClick={logout}>Log Out</button>
      <StaticReports />
      <UserReportsContainer />
      <EmissionsImport/>
      <EmissionsChart />
      <RelatedTopics />
      <Footer/>
    </div>
  );
}

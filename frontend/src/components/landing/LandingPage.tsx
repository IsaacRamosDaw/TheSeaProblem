import { useEffect, useState } from "react";
import type { Report } from "@/shared/types/db-models";
import { CompanyList } from "../companies/index";
import { Header } from "../general/header/Header";
import { StaticReports } from "./staticReports/StaticReports";
import EmissionsChart from "../emissionsChart/EmissionsChart";
import styles from "./landingPage.module.scss";
import { RelatedTopics } from "./relatedTopics/RelatedTopics";
import { UserReportsContainer } from "./usersReportsContainer/UserReportsContainer";
import { useAuth0 } from "@auth0/auth0-react";

//! Ten al lado el services/ourReports.services.js
export function LandingPage() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  return (
    <div className={styles.landingPage}>
      <Header />
      <StaticReports />
      {/* I put it here to be able to see that the graph was displayed correctly. */}
      <h1>Bienvenido al Dashboard de The Sea Problem</h1>
      <RelatedTopics/>
      <UserReportsContainer/>
      <EmissionsChart />
      <CompanyList/>
      <h1>login stuff</h1>
      {isAuthenticated ? (
        <div>
          <img src={user?.picture} alt={user?.name} />
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
        </div>
      ) : (
        <div>
          <h2>You are not logged in</h2>
          <p>Please log in to see your profile</p>
        </div>
      )}
      <button onClick={() => loginWithRedirect()}>Log In</button>
      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log Out
      </button>
    </div>
  );
}

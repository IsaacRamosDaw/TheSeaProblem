import { Header } from "../general/header/Header";
import { StaticReports } from "./staticReports/StaticReports";
import EmissionsChart from "../emissionsChart/EmissionsChart";
import styles from "./landingPage.module.scss";
import { RelatedTopics } from "./relatedTopics/RelatedTopics";
import { UserReportsContainer } from "./usersReportsContainer/UserReportsContainer";
import { login, logout } from "../../../auth";
import { useUser } from "../../hooks/useUser";


//! Ten al lado el services/ourReports.services.js
export function LandingPage() {
  const { user } = useUser();
  return (
    <div className={styles.landingPage}>
      <Header />
      <StaticReports />
      <RelatedTopics />
      {/*}
     
      
      <h1>Bienvenido al Dashboard de The Sea Problem</h1>
      
      <UserReportsContainer />
      <EmissionsChart />
      <h1>login stuff</h1>
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
      <button onClick={login}>Log In</button>
      <button onClick={logout}>Log Out</button>
      */}
    </div>
    
  );
}

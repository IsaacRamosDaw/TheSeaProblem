import { Header } from "../general/header/Header";
import { Footer } from "../general/footer/Footer";
import { StaticReports } from "./staticReports/StaticReports";
import { Button } from "../general/button/Button";
import './landingPage.scss'

export function LandingPage() {
  return (
    <>
      <Header />
      <StaticReports/>
      <Footer />
    </>
  );
}

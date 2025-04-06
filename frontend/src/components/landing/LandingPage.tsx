import { useEffect, useState } from "react";
import type { Report } from "@/shared/types/db-models";
import { getOurReports } from "../../services/ourReports";
import { Header } from "../general/header/Header";
import { Footer } from "../general/footer/Footer";
import { StaticReportComp } from "./staticReports/StaticReports";

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
      <StaticReportComp 
        id={1} 
        title="Título" 
        subtitle="Subtitulo" 
        image={'staticReports/FotoExample.jpg'}
        paragraph="Texto textito textado texteado textando 
        textaso texting textis text.  textetextuando textaxado 
        textis, tuxto oxtus"/>
      <StaticReportComp 
        id={1} 
        title="Título" 
        subtitle="Subtitulo" 
        image={'staticReports/FotoExample.jpg'}
        paragraph="Texto textito textado texteado textando 
        textaso texting textis text.  textetextuando textaxado 
        textis, tuxto oxtus"/>
      <StaticReportComp 
        id={1} 
        title="Título" 
        subtitle="Subtitulo" 
        image={'staticReports/FotoExample.jpg'}
        paragraph="Texto textito textado texteado textando 
        textaso texting textis text.  textetextuando textaxado 
        textis, tuxto oxtus"/>
      <Footer />
    </>
  );
}

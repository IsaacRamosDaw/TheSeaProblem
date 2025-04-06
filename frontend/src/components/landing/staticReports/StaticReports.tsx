import { StaticReportComp } from "./individualStaticReport/StaticReportComp";

export function StaticReports() {
  return (
    <>
      <StaticReportComp
        id={1} 
        title="Título" 
        subtitle="Subtitulo" 
        image={'staticReports/FotoExample.jpg'}
        paragraph="Texto textito textado texteado textando 
        textaso texting textis text.  textetextuando textaxado 
        textis, tuxto oxtus"
      />
      <StaticReportComp
        id={2} 
        title="Título" 
        subtitle="Subtitulo" 
        image={'staticReports/FotoExample.jpg'}
        paragraph="Texto textito textado texteado textando 
        textaso texting textis text.  textetextuando textaxado 
        textis, tuxto oxtus"
      />
      <StaticReportComp
        id={3} 
        title="Título" 
        subtitle="Subtitulo" 
        image={'staticReports/FotoExample.jpg'}
        paragraph="Texto textito textado texteado textando 
        textaso texting textis text.  textetextuando textaxado 
        textis, tuxto oxtus"
      />
    </>
  );
}

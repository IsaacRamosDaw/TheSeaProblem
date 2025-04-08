import { StaticReportComp } from "./individualStaticReport/StaticReportComp";
import s from './staticReports.module.scss'

export function StaticReports() {
  return (
    <section className={s.staticReportContainer}>
      <StaticReportComp
        id={1} 
        title="Plastic Waste Crisis" 
        subtitle="How microplastics are invading our oceans" 
        image='staticReports/report1.jfif' // e.g., plastic debris in water
        paragraph="Over 8 million tons of plastic enter the ocean annually, threatening marine life and ecosystems. 
        This report reveals the top sources of leakage and innovative solutions to curb the tide by 2030."
      />
      <StaticReportComp
        id={2} 
        title="Oil Spill Impacts" 
        subtitle="Long-term damage to marine biodiversity" 
        image='staticReports/staticReport2.avif'// e.g., oil-covered wildlife
        paragraph="Oil spills destroy coastal habitats for decades. We analyze case studies from the Deepwater Horizon 
        disaster and present breakthrough cleanup technologies to mitigate future accidents."
      />
      <StaticReportComp
        id={3} 
        title="Coral Reefs at Risk" 
        subtitle="From pollution to bleaching" 
        image='staticReports/staticReport3.jfif' // e.g., bleached coral vs. healthy coral
        paragraph="50% of the world’s coral reefs have died due to pollution and warming waters. Explore actionable 
        strategies to protect remaining reefs through policy and community-led conservation."
      />
    </section>
  );
}

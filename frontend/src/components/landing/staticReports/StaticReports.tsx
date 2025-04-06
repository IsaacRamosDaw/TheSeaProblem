import "./staticReports.scss"
import { StaticReport } from "@/shared/types/db-models";


export function StaticReportComp({id, title, subtitle, image, paragraph}: StaticReport) {
  return (
    <div key={id} className="static-report">

      <p className="report-title"> {title} </p>

      <p className="report-sub-title"> {subtitle} </p>

      <img src={image} alt=" " />

      <p className="report-paragraph"> {paragraph} </p>
    </div>
  );
}

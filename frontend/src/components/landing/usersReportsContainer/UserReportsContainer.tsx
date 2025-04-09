import { useEffect, useState } from "react";
import { Button } from "../../general/button/Button";
import { UserReport } from "./userReport/UserReport";
import s from './userReportsContainer.module.scss';
import { 
  getAllReports, 
  createReport, 
  deleteReportById, 
  getReportById, 
  updateReportById 
} from "../../../services/reports";
import type { Report } from "@/shared/types/db-models";
import { number } from "zod";
import { ReportForm } from "./ReportForm";

export function UserReportsContainer() {
  useEffect(() => {
    getAllReports().then((data) => setReports(data));
  }, [])

  const [reports, setReports] = useState<Report[]>([]);


  return (
    <section className={s.userReportsContainer}>
      {reports.map(
        (report) => {
          return (
          <UserReport
            key={Number(report.id)}
            id={report.id}
            location={report.location}
            img="userReports/example2.jpg"
            alt="alt-image"
            date={report.date}
            Pollution={report.pollutionType}
            shortDescription={report.shortDescription}
            longDescription={report.description}
          />
          )
        }
      )}

      <ReportForm/>

      <Button variant="primary" onClick={() => console.log("Click!")}>
        Send report
      </Button>
    </section>
  )
}
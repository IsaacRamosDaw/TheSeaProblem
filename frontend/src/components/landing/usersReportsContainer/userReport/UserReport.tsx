import { PollutionType } from "@/shared/types/db-models";
import { useState } from "react";
import { deleteReportById } from "../../../../services/reports";
import s from './userReport.module.scss'
import { Button } from "../../../general/button/Button";

export function UserReport(
  { id, location, Pollution, shortDescription, date, img, longDescription, alt }
    : { id?: number, location: string, Pollution: PollutionType, longDescription: string, shortDescription: string, date: string, img: string, alt: string }
) {

  const [isExpanded, setIsExpanded] = useState(false); 
  const valueId = id;


  const toggleDescription = () => {
    setIsExpanded(!isExpanded); 
  };

  const deleteReport = () => {
    deleteReportById(String(valueId));
    window.location.reload();
  }
  return (
    <div className={s.userReport} key={id}>
      <div className={s.userReportInfo}>
        <img src={img} alt={alt} />
        <div>
          <p><span>Location:</span> {location}</p>
          <p><span>Polution:</span> {Pollution}</p>
          <p><span>Description:</span> {shortDescription}</p>
          <p><span>date:</span> {date}</p>
          <button 
            className={s.readMoreButton} 
            onClick={toggleDescription} 
          >
            {isExpanded ? "Read less" : "Read more"}
          </button>
          <Button 
            className={s.deleteButton} 
            onClick={deleteReport} 
          >
          Delete
          </Button>
        </div>
      </div>
      {isExpanded && (
        <div className={s.longDescription}>
          <p>{longDescription}</p>
        </div>
      )}
    </div>
  )
}
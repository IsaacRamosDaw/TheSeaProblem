import { PollutionType } from "@/shared/types/db-models";
import s from './userReport.module.scss'

export function UserReport(
    {id, location, Pollution, shortDescription, date, img, longDescription, alt} 
    : {id: number,  location: string, Pollution : PollutionType, longDescription : string, shortDescription : string, date : string, img: string, alt: string}
  ){
  return (
    <div className={s.userReport} key={id}>
      <div className={s.userReportInfo}>
        <img src={img} alt={alt} />
        <div>  
          <p><span>Location:</span> { location }</p>
          <p><span>Polution:</span> { Pollution }</p>
          <p><span>Description:</span> { shortDescription }</p>
          <p><span>date:</span> { date }</p>
          <button className={s.readMoreButton}>Read more</button>
        </div>
      </div>
      <div className={s.longDescription}>
        <p>
          {longDescription}
        </p>
      </div>
    </div>
  )
}
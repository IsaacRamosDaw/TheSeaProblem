import { PollutionType } from "@/shared/types/db-models";
import s from './userReport.module.scss'

export function UserReport(
    {id, location, Pollution, shortDescription, date, img, alt} 
    : {id: number,  location: string, Pollution : PollutionType, shortDescription : string, date : string, img: string, alt: string}
  ){
  return (
    <div className={s.userReport} key={id}>
      <img className={s.userReportImg} src={img} alt={alt} />
      <div className={s.userReportInfo}>  
        <p>{ location }</p>
        <p>{ Pollution }</p>
        <p>{ shortDescription }</p>
        <p>{ date }</p>
      </div>
    </div>
  )
}
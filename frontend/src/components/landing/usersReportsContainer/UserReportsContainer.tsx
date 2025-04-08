import { UserReport } from "./userReport/UserReport";
import s from './userReportsContainer.module.scss';

export function UserReportsContainer(){
  return (
    <section className={s.userReportsContainer}>
      <UserReport 
        id={1} 
        location="Las palmas" 
        img="userReports/example2.jpg" 
        alt="alt-image" 
        date="10-12-12" 
        Pollution="Plastic" 
        shortDescription="short Description" 
        longDescription=
        'kasjfkdsklfkajf jksdj kjfiojweio dsjfei cksjvcnveiej aji ifhcuiuhvuir e hscanscn'
      />
    </section>
  )
}
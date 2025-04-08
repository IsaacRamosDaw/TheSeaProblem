import { UserReport } from "./userReport/UserReport";
import s from './userReportsContainer.module.scss';

export function UserReportsContainer(){
  return (
    <section className={s.userReportsContainer}>
      <UserReport/>
    </section>
  )
}
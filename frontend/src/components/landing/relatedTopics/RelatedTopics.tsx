import { RelatedTopicComp } from "./relatedTopicsComp/RelatedTopicComp";
import s from "./relatedTopicsContainer.module.scss";

export function RelatedTopics() {
  return (
    <section className={s.topicsContainer}>
      <p className={s.topicsTitle}>Related topics</p>
      <div>
        <RelatedTopicComp href="*" img="staticReports/FotoExample.jpg" text="texto de prueba"/>
        <RelatedTopicComp href="*" img="staticReports/FotoExample.jpg" text="texto de prueba"/>
        <RelatedTopicComp href="*" img="staticReports/FotoExample.jpg" text="texto de prueba"/>
      </div>
    </section>
  );
}
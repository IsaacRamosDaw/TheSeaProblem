import { RelatedTopicComp } from "./relatedTopicsComp/RelatedTopicComp";
import s from "./relatedTopicsContainer.module.scss";

export function RelatedTopics() {
  return (
    <section className={s.topicsContainer}>
      <RelatedTopicComp/>
      <RelatedTopicComp/>
      <RelatedTopicComp/>
    </section>
  );
}
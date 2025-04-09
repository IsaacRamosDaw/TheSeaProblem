import { RelatedTopicComp } from "./relatedTopicsComp/RelatedTopicComp";
import s from "./relatedTopicsContainer.module.scss";

export function RelatedTopics() {
  return (
    <section className={s.topicsContainer}>
      <p className={s.topicsTitle}>Related topics</p>
      <div>
        <RelatedTopicComp 
          href="https://www.bbc.com/news/articles/cq6gg5mnn8eo" 
          img="staticReports/marinePollution1.webp" 
          text="Dark oxygen' mission takes aim at other worlds" 
          alt="alt-exmaple"
        />
        <RelatedTopicComp 
          href="https://education.nationalgeographic.org/resource/marine-pollution/" 
          img="relatedTopics/water-pollution.jpg" 
          text="Pollutants are dumped into the ocean. This waste affects the daily life of fish and other marine creatures" 
          alt="alt-exmaple"
        />
        <RelatedTopicComp 
          href="https://oceanliteracy.unesco.org/plastic-pollution-ocean/" 
          img="relatedTopics/plasticRatio.jpeg" 
          text="Plastic Pollution in the Ocean: Where does it come from?" 
          alt="alt-exmaple"
        />
      </div>
    </section>
  );
}
import s from "./relatedTopic.module.scss";

export function RelatedTopicComp({text, img, href, alt} : {text: string, img: string , href: string, alt: string}) {
  return (
      <a className={s.topic} href={href}>
        <img src={img} alt={alt} />

        <p>{text}</p>
      </a>
  );
}
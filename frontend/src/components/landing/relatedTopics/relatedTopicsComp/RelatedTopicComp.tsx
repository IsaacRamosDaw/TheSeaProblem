import s from "./relatedTopic.module.scss";

export function RelatedTopicComp({text, img, href} : {text: string, img: string , href: string}) {
  return (
      <a className={s.topic} href={href}>
        <img src={img} alt="" />

        <p>{text}</p>
      </a>
  );
}
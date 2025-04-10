import s from "./footer.module.scss";
import { FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillTikTok } from "react-icons/ai";

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.footer__inner}>
        <a href="">
          <FaYoutube className={s.icon} />
          <span>Youtube</span>
        </a>
        <a href="">
          <BsTwitterX className={s.icon} />
          <span>X</span>
        </a>
        <a href="">
          <RiInstagramFill className={s.icon} />
          <span>Instagram</span>
        </a>
        <a href="">
          <AiFillTikTok className={s.icon} />
          <span>Tiktok</span>
        </a>
      </div>
    </footer>
  );
}

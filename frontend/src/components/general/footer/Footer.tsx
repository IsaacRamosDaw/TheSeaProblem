import "./footer.scss"
import { FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillTikTok } from "react-icons/ai";


export function Footer() {
  return(
    <footer>
        <div id="social-media">
        <a href="">
          <FaYoutube className="icon" />
          <span>text</span>
        </a>
        <a href="">
          <BsTwitterX className="icon" />
          <span>text</span>
        </a>
        <a href="">
          <RiInstagramFill className="icon" />
          <span>text</span>
        </a>
        <a href="">
          <AiFillTikTok className="icon" />
          <span>text</span>
        </a>
      </div>
    </footer>
  )
}
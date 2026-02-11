import { Fragment } from "react";
import Linkdin from "@/assets/linkdin.png";
import Insta from "@/assets/insta.png";
import Facebook from "@/assets/facebook.png";
import Twitter from "@/assets/twiter.png";
import Link from "next/link";
import Image from "next/image";

export default function SocialIcons() {
  return (
    <Fragment>
      <div className="social-icons">
        <Link href="https://www.linkedin.com/company/lwkp/" target="_blank" rel="noopener noreferrer">
          <Image src={Linkdin} alt="" />
        </Link>

        <Link href="https://www.instagram.com/lwk_partners/" target="_blank" rel="noopener noreferrer">
          <Image src={Insta} alt="" />
        </Link>

        <Link href="https://www.facebook.com/lwk.partners" target="_blank" rel="noopener noreferrer">
          <Image src={Facebook} alt="" />
        </Link>

        <Link href="https://twitter.com/LWK_Partners" target="_blank" rel="noopener noreferrer">
          <Image src={Twitter} alt="" />
        </Link>
      </div>
    </Fragment>
  );
}

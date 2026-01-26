"use client";

import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import Linkdin from "@/assets/linkdin.png";
import Insta from "@/assets/insta.png";
import Facebook from "@/assets/facebook.png";
import Twitter from "@/assets/twiter.png";

export default function ContentMediaDiv({ post }) {
  if (!post) {
    return <p className="text-center py-5">Loading content…</p>;
  }

  const title = post?.title?.rendered || "Title not available";
  const date = post?.date ? dayjs(post.date).format("DD MMMM YYYY") : "Date not available";
  const description = post?.content?.rendered || "<p>Content not available.</p>";
  const tags = post?.acf?.myname || "";
  const postUrl = post?.link || "";

  const share = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(title)}`,
    instagram: postUrl,
  };

  return (
    <Fragment>
      <p className="post-date">{date}</p>
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      {tags && <p className="post-tags">{tags}</p>}
      <div className="social-icons">
        <Link href={share.linkedin} target="_blank" rel="noopener noreferrer">
          <Image src={Linkdin} alt="LinkedIn" loading="lazy" />
        </Link>

        <Link href={share.instagram} target="_blank" rel="noopener noreferrer">
          <Image src={Insta} alt="Instagram" loading="lazy" />
        </Link>

        <Link href={share.facebook} target="_blank" rel="noopener noreferrer">
          <Image src={Facebook} alt="Facebook" loading="lazy" />
        </Link>

        <Link href={share.twitter} target="_blank" rel="noopener noreferrer">
          <Image src={Twitter} alt="Twitter" loading="lazy" />
        </Link>
      </div>

      <div className="contnt-insight" dangerouslySetInnerHTML={{ __html: description }} />
    </Fragment>
  );
}

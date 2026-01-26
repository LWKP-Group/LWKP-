"use client";

import { Fragment } from "react";
import Image from "next/image";
import dayjs from "dayjs";

export default function StoryContentDiv({ post }) {
  if (!post) {
    return <div className="container text-center py-5">Loading story…</div>;
  }

  const title = post?.title?.rendered || "Title not available";
  const image = post?.featured_image || "";
  const date = post?.date ? dayjs(post.date).format("DD MMMM YYYY") : "";
  const description = post?.content?.rendered || "Content not available.";

  return (
    <Fragment>
      {image && <Image src={image} alt={title} width={400} height={300} className="img-fluid story-featured" loading="lazy" />}

      <h2 dangerouslySetInnerHTML={{ __html: title }} />

      <p className="post-date">Original: LWK + PARTNERS {date && `| ${date}`}</p>

      <div className="contnt-insight" dangerouslySetInnerHTML={{ __html: description }} />
    </Fragment>
  );
}

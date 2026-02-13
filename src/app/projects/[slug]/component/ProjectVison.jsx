"use client";

import Image from "next/image";
import { Fragment } from "react";
import { formatText } from "@/lib/formatText";

export default function ProjectVison({ post }) {
  if (!post) {
    return <div className="container text-center py-5">Loading content…</div>;
  }

  const title = post?.acf?.vision_heading || "Vision & Context";
  const description = post?.acf?.vision_description || "<p>Content not available.</p>";
  const visionImage = post?.acf?.vision_image || "";

  return (
    <Fragment>
      <div className="row top-pad vision-project">
        <div className="col-sm-6">
          {visionImage ? (
            <Image
              src={visionImage}
              alt={title}
              width={700}
              height={500}
              className="img-fluid philosophy-img"
              loading="lazy"
            />
          ) : (
            <p className="text-center py-4">Image not available</p>
          )}
        </div>

        <div className="col-sm-6 vision-right">
          <p className="sub-heading">Vision & Context</p>
          <h2
            dangerouslySetInnerHTML={{
              __html: formatText(title),
            }}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: formatText(description),
            }}
          />
        </div>
      </div>
    </Fragment>
  );
}

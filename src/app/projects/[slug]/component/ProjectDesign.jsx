"use client";

import Image from "next/image";
import { Fragment } from "react";
import { formatText } from "@/lib/formatText";

export default function ProjectDesign({ post }) {
  if (!post) {
    return <div className="container text-center py-5">Loading content…</div>;
  }

  const title = post?.acf?.design_heading || "Design Approach";
  const description = post?.acf?.design_description || "<p>Content not available.</p>";
  const designImage = post?.acf?.design_image || "";
  const qoutetext = post?.acf?.design_qoute || "";
  const quotation = "https://staging.lwkp.com/wp-content/uploads/2025/12/Frame-2147227200.png";

  return (
    <Fragment>
      <div className="row top-pad vision-project">
        <div className="col-sm-6 design-right">
          <p className="sub-heading">Design Approach</p>
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

          {qoutetext ? (
            <div className="quotes">
              <Image
                src={quotation}
                alt={title}
                width={700}
                height={500}
                className="img-fluid philosophy-img"
                loading="lazy"
              />
              <p>"{qoutetext}"</p>
            </div>
          ) : (
            " "
          )}
        </div>

        <div className="col-sm-6">
          {designImage ? (
            <Image
              src={designImage}
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
      </div>
    </Fragment>
  );
}

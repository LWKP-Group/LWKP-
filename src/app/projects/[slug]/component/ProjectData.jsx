"use client";

import Image from "next/image";
import { Fragment } from "react";
import { formatText } from "@/lib/formatText";
import { useSelector } from "react-redux";

export default function ProjectData({ post }) {
  if (!post) {
    return <div className="container text-center py-5">Loading content…</div>;
  }
  const lang = useSelector((state) => state.language.currentLanguage);

  const title = post?.acf?.project_data_heading || "Project Data";
  const description = post?.acf?.project_data_description || "<p> </p>";
  const projectImage = post?.acf?.project_data_image || "";

  return (
    <Fragment>
      <div className="row top-pad vision-project last">
        <div className="col-sm-6">
          {projectImage ? (
            <Image
              src={projectImage}
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
          <p className="sub-heading"> {lang === "ch" ? "项目数据 " : "Project Data "} </p>
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

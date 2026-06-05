"use client";

import Image from "next/image";
import { Fragment } from "react";
import { useSelector } from "react-redux";

export default function OverviewDetail({ post }) {
  if (!post) {
    return <div className="container text-center py-5">Loading content…</div>;
  }

  const title = post?.title?.rendered || "Not available";
  const location = post?.acf?.location || "Not available";
  const client = post?.acf?.client || "Not available";
  const region = post?.acf?.region || "Not available";
  const year = post?.acf?.year || "Not available";
  const sector = post?.acf?.sector || "Not available";
  const service = post?.acf?.services || "Not available";
  const overviewImage = post?.acf?.overview_image || "";
  const lang = useSelector((state) => state.language.currentLanguage);

  return (
    <Fragment>
      <div className="row overview-detail">
        <div className="col-sm-3 project-detail">
          <h5> {lang === "ch" ? "项目名称" : "Project Name"}</h5>
          <p dangerouslySetInnerHTML={{ __html: title }} />
        </div>

        <div className="col-sm-3 project-detail">
          <h5> {lang === "ch" ? "位置" : "Location"}</h5>
          <p dangerouslySetInnerHTML={{ __html: location }} />
        </div>

        <div className="col-sm-3 project-detail">
          <h5> {lang === "ch" ? "客户" : "Client"}</h5>
          <p dangerouslySetInnerHTML={{ __html: client }} />
        </div>

        <div className="col-sm-3 project-detail">
          <h5> {lang === "ch" ? "地区" : "Region"}</h5>
          <p dangerouslySetInnerHTML={{ __html: region }} />
        </div>

        <div className="col-sm-3 project-detail">
          <h5> {lang === "ch" ? "年" : "Year"}</h5>
          <p dangerouslySetInnerHTML={{ __html: year }} />
        </div>

        <div className="col-sm-3 project-detail">
          <h5> {lang === "ch" ? "行业" : "Sector"}</h5>
          <p dangerouslySetInnerHTML={{ __html: sector }} />
        </div>

        <div className="col-sm-3 project-detail">
          <h5> {lang === "ch" ? "服务" : "Services"}</h5>
          <p dangerouslySetInnerHTML={{ __html: service }} />
        </div>
      </div>

      <div className="row overview-image">
        {overviewImage ? (
          <Image
            src={overviewImage}
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
    </Fragment>
  );
}

"use client";

import { Fragment } from "react";

export default function OverviewHeading({ post }) {
  if (!post) {
    return <div className="container text-center py-5">Loading content…</div>;
  }

  const title = post?.acf?.overview_heading || "Overview";
  const description = post?.acf?.overview_description || "<p>Content not available.</p>";

  return (
    <Fragment>
      <div className="row top-pad single-insight-row">
        <div className="col-sm-12 project-overview">
          <p className="sub-heading">OVERVIEW</p>
          <h2>{title}</h2>
          <p dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </div>
    </Fragment>
  );
}

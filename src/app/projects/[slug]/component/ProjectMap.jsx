"use client";

import { Fragment } from "react";

export default function ProjectMap({ post }) {
  if (!post) {
    return <div className="container text-center py-5">Loading map…</div>;
  }

  const map = post?.acf?.map_iframe || "";

  if (!map) {
    return <div className="container text-center py-5"></div>;
  }

  return (
    <Fragment>
      <div className="row top-pad single-insight-row">
        <div
          className="col-sm-12 project-map"
          dangerouslySetInnerHTML={{
            __html: map,
          }}
        />
      </div>
    </Fragment>
  );
}

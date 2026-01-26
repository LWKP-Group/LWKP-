"use client";

import { Fragment } from "react";
import OverviewHeading from "./OverviewHeading";
import OverviewDetail from "./OverviewDetail";
import ProjectVison from "./ProjectVison";
import ProjectDesign from "./ProjectDesign";
import ProjectGallery from "./ProjectGallery";
import ProjectMap from "./ProjectMap";
import ProjectData from "./ProjectData";

export default function MainProjectContent({ post }) {
  if (!post) {
    return <div className="container text-center py-5">Loading content…</div>;
  }

  return (
    <Fragment>
      <div className="container">
        <OverviewHeading post={post} />
        <OverviewDetail post={post} />
        <ProjectVison post={post} />
        <ProjectDesign post={post} />
        <ProjectGallery post={post} />
      </div>

      <div className="container-fluid">
        <ProjectMap post={post} />
      </div>

      <div className="container">
        <ProjectData post={post} />
      </div>
    </Fragment>
  );
}

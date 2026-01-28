"use client";

import { Fragment } from "react";
import RelatedStory from "./RelatedStory";
import StoryContentDiv from "./StoryContentDiv";
import SocialIcons from "@/components/GlobalCompo/SocialIcons";
import HeroVideoBanner from "./HeroVideoBanner";

export default function MainStoryContent({ post }) {
  if (!post) {
    return <div className="container text-center py-5">Loading content…</div>;
  }

  return (
    <Fragment>
      <div className="container">
        <div className="row top-pad bottom-pad single-insight-row">
          <div className="col-sm-9 insight-single-post">
            {/* <StoryContentDiv post={post} /> */}
            <HeroVideoBanner post={post} />
            <StoryContentDiv post={post} />
          </div>

          <div className="col-sm-3 related">
            <div className="sidebar position-sticky top-0">
              <RelatedStory />
              <SocialIcons />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

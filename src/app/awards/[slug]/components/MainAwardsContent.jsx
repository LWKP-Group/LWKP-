"use client";

import { Fragment } from "react";
import FooterForm from "@/components/GlobalCompo/FooterForm";
import SocialIcons from "@/components/GlobalCompo/SocialIcons";
import ContentAwardDiv from "./ContentAwardDiv";
import RelatedAwardposts from "./RelatedAwardposts";

export default function MainAwardsContent({ post }) {
  if (!post) {
    return <div className="container text-center py-5">Loading content…</div>;
  }

  return (
    <Fragment>
      <div className="container">
        <div className="row top-pad bottom-pad single-insight-row">
          <div className="col-sm-8 insight-single-post">
            <ContentAwardDiv post={post} />
          </div>

          <div className="col-sm-4 related ">
            <div className="sidebar position-sticky top-0">
              <FooterForm />
              <RelatedAwardposts />
              <SocialIcons />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

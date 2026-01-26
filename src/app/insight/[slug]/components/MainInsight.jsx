"use client";

import { Fragment } from "react";
import ContentDiv from "./ContentDiv";
import FooterForm from "@/components/GlobalCompo/FooterForm";
import RelatedPost from "./RelatePost";
import SocialIcons from "@/components/GlobalCompo/SocialIcons";

export default function MainInsight({ post }) {
  if (!post) {
    return <div className="container text-center py-5">Loading content…</div>;
  }

  return (
    <Fragment>
      <div className="container">
        <div className="row top-pad bottom-pad single-insight-row">
          <div className="col-sm-8 insight-single-post">
            <ContentDiv post={post} />
          </div>

          <div className="col-sm-4 related">
            <div className="sidebar position-sticky top-0">
              <FooterForm />
              <RelatedPost />
              <SocialIcons />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

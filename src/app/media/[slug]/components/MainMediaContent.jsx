"use client";

import { Fragment } from "react";
import FooterForm from "@/components/GlobalCompo/FooterForm";
import SocialIcons from "@/components/GlobalCompo/SocialIcons";
import ContentMediaDiv from "./ContentMediaDiv";
import RelatedMediaPost from "./RelatedMediaPost";

export default function MainMediaContent({ post }) {
  if (!post) {
    return <div className="container text-center py-5">Loading content…</div>;
  }

  return (
    <Fragment>
      <div className="container">
        <div className="row top-pad bottom-pad single-insight-row">
          <div className="col-sm-8 insight-single-post">
            <ContentMediaDiv post={post} />
          </div>

          <div className="col-sm-4 related">
            <div className="sidebar position-sticky top-0">
              <FooterForm />
              <RelatedMediaPost />
              <SocialIcons />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

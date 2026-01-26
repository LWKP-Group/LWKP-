import { Fragment, Suspense } from "react";
import StickyHeader from "@/components/GlobalCompo/StickyHeader";
import StoryBanner from "@/components/StoryComponents/StoryBanner";
import StoryHeading from "@/components/StoryComponents/StoryHeading";
import StoryArchives from "@/components/StoryComponents/StoryArchives";
import StoryTagline from "@/components/StoryComponents/StoryTagline";

export const metadata = {
  title: "Our Stories — LWK Agency | Creative Digital Solutions",
  description: "LWK + PARTNERS is a leading architecture and design practice rooted in Hong Kong"
};

export default function page() {
  return (
    <Fragment>
      <div className="position-sticky top-0">
        <Suspense fallback={<div className="text-center py-5">Loading banner…</div>}>
          <StoryBanner />
        </Suspense>
      </div>

      <div className="bgwhite">
        <StickyHeader />

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <StoryHeading />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading stories…</div>}>
          <StoryArchives />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <StoryTagline />
        </Suspense>
      </div>
    </Fragment>
  );
}

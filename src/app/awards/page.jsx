import { Fragment, Suspense } from "react";
import StickyHeader from "@/components/GlobalCompo/StickyHeader";
import AwardBanner from "@/components/AwardComponent/AwardBanner";
import AwardHeading from "@/components/AwardComponent/AwardHeading";
import AwardsFilterGrid from "@/components/AwardComponent/AwardsFilterGrid";

export const metadata = {
  title: "Awards — LWK Agency | Creative Digital Solutions",
  description: "LWK + PARTNERS is a leading architecture and design practice rooted in Hong Kong"
};

export default function page() {
  return (
    <Fragment>
      <div className="position-sticky top-0">
        <Suspense fallback={<div className="text-center py-5">Loading banner…</div>}>
          <AwardBanner />
        </Suspense>
      </div>

      <div className="bgwhite">
        <StickyHeader />

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <AwardHeading />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <AwardsFilterGrid />
        </Suspense>
      </div>
    </Fragment>
  );
}

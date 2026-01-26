import { Fragment, Suspense } from "react";
import StickyHeader from "@/components/GlobalCompo/StickyHeader";
import TimelineBanner from "@/components/TimelineComponent/TimelineBanner";
import TimelineHeading from "@/components/TimelineComponent/TimelineHeading";
import TimelineQoute from "@/components/TimelineComponent/TimelineQoute";
import Timeline from "@/components/TimelineComponent/Timeline";

export const metadata = {
  title: "Our Journey — LWK Agency | Creative Digital Solutions",
  description: "LWK + PARTNERS is a leading architecture and design practice rooted in Hong Kong"
};

export default function page() {
  return (
    <Fragment>
      <div className="position-sticky top-0">
        <Suspense fallback={<div className="text-center py-5">Loading banner…</div>}>
          <TimelineBanner />
        </Suspense>
      </div>

      <div className="bgwhite">
        <StickyHeader />

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <TimelineHeading />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <Timeline />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <TimelineQoute />
        </Suspense>
      </div>
    </Fragment>
  );
}

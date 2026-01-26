import { Fragment, Suspense } from "react";
import StickyHeader from "@/components/GlobalCompo/StickyHeader";
import InsightBanner from "@/components/InsightComponent/InsightBanner";
import InsightHeading from "@/components/InsightComponent/InsightHeading";
import InsightTabs from "@/components/InsightComponent/InsightTabs";

export const metadata = {
  title: "Insight — LWK Agency | Creative Digital Solutions",
  description: "LWK + PARTNERS is a leading architecture and design practice rooted in Hong Kong"
};

export default function page() {
  return (
    <Fragment>
      <div className="position-sticky top-0">
        <Suspense fallback={<div className="text-center py-5">Loading banner…</div>}>
          <InsightBanner />
        </Suspense>
      </div>

      <div className="bgwhite">
        <StickyHeader />

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <InsightHeading />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <InsightTabs />
        </Suspense>
      </div>
    </Fragment>
  );
}

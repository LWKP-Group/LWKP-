import { Fragment, Suspense } from "react";
import PurposeBanner from "@/components/PurposeComponents/PurposeBanner";
import StickyHeader from "@/components/GlobalCompo/StickyHeader";
import PurposeSection from "@/components/PurposeComponents/PurposeSection";
import PurposeBoxes from "@/components/PurposeComponents/PurposeBoxes";
import PurposeQoute from "@/components/PurposeComponents/PurposeQoute";

export const metadata = {
  title: "Purpose — LWK Agency | Creative Digital Solutions",
  description: "LWK + PARTNERS is a leading architecture and design practice rooted in Hong Kong"
};

export default function page() {
  return (
    <Fragment>
      <div className="position-sticky top-0">
        <Suspense fallback={<div className="text-center py-5">Loading banner…</div>}>
          <PurposeBanner />
        </Suspense>
      </div>

      <div className="bgwhite purpose-page">
        <StickyHeader />

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <PurposeSection />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <PurposeBoxes />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <PurposeQoute />
        </Suspense>
      </div>
    </Fragment>
  );
}

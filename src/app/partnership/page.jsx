import { Fragment, Suspense } from "react";
import StickyHeader from "@/components/GlobalCompo/StickyHeader";
import PartnershipBanner from "@/components/PartnershipComponent/PartnershipBanner";
import PartnershipHeading from "@/components/PartnershipComponent/PartnershipHeading";
import PartnershipFilterGrid from "@/components/PartnershipComponent/PartnershipFilterGrid";

export const metadata = {
  title: "Partnership — LWK Agency | Creative Digital Solutions",
  description: "LWK + PARTNERS is a leading architecture and design practice rooted in Hong Kong"
};

export default function page() {
  return (
    <Fragment>
      <div className="position-sticky top-0">
        <Suspense fallback={<div className="text-center py-5">Loading banner…</div>}>
          <PartnershipBanner />
        </Suspense>
      </div>

      <div className="bgwhite">
        <StickyHeader />

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <PartnershipHeading />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <PartnershipFilterGrid />
        </Suspense>
      </div>
    </Fragment>
  );
}

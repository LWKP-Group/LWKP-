import { Fragment, Suspense } from "react";
import StickyHeader from "@/components/GlobalCompo/StickyHeader";
import RankingBanner from "@/components/RankingComponent/RankingBanner";
import RankingHeading from "@/components/RankingComponent/RankingHeading";
import RankingFilterGrid from "@/components/RankingComponent/RankingFilterGrid";

export const metadata = {
  title: "Rankings — LWK Agency | Creative Digital Solutions",
  description: "LWK + PARTNERS is a leading architecture and design practice rooted in Hong Kong"
};

export default function page() {
  return (
    <Fragment>
      <div className="position-sticky top-0">
        <Suspense fallback={<div className="text-center py-5">Loading banner…</div>}>
          <RankingBanner />
        </Suspense>
      </div>

      <div className="bgwhite">
        <StickyHeader />

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <RankingHeading />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <RankingFilterGrid />
        </Suspense>
      </div>
    </Fragment>
  );
}

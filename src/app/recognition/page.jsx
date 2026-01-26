import { Fragment, Suspense } from "react";
import StickyHeader from "@/components/GlobalCompo/StickyHeader";
import RecognitionBanner from "@/components/RecognitionComponent/RecognitionBanner";
import RecognitionHeadings from "@/components/RecognitionComponent/RecognitionHeadings";
import RecognitionAward from "@/components/RecognitionComponent/RecognitionAward";
import ReconitionRanking from "@/components/RecognitionComponent/ReconitionRanking";
import RecognitionMedia from "@/components/RecognitionComponent/RecognitionMedia";
import RecognitionPartner from "@/components/RecognitionComponent/RecognitionPartner";
import RecognitionGuideline from "@/components/RecognitionComponent/RecognitionGuideline";
import HashScroll from "@/components/ReuseableComponent/HashScroll";

export const metadata = {
  title: "Recognition — LWK Agency | Creative Digital Solutions",
  description: "LWK + PARTNERS is a leading architecture and design practice rooted in Hong Kong"
};

export default function page() {
  return (
    <Fragment>
      <HashScroll />

      <div className="position-sticky top-0">
        <Suspense fallback={<div className="text-center py-5">Loading banner…</div>}>
          <RecognitionBanner />
        </Suspense>
      </div>

      <div className="bgwhite">
        <StickyHeader />

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <RecognitionHeadings />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <RecognitionAward />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <ReconitionRanking />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <RecognitionMedia />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <RecognitionPartner />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <RecognitionGuideline />
        </Suspense>
      </div>
    </Fragment>
  );
}

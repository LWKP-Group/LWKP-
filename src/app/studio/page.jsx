import { Fragment, Suspense } from "react";
import StickyHeader from "@/components/GlobalCompo/StickyHeader";
import StudioBanner from "@/components/StudioPageComponenets/StudioBanner";
import StudioSection from "@/components/StudioPageComponenets/StudioSection";
import StudioQoute from "@/components/StudioPageComponenets/StudioQoute";
import Locations from "@/components/StudioPageComponenets/Locations";
import StudioDimensions from "@/components/StudioPageComponenets/StudioDimensions";

export const metadata = {
  title: "Studio — LWK Agency | Creative Digital Solutions",
  description: "LWK + PARTNERS is a leading architecture and design practice rooted in Hong Kong"
};

export default function page() {
  return (
    <Fragment>
      <div className="position-sticky top-0">
        <Suspense fallback={<div className="text-center py-5">Loading banner…</div>}>
          <StudioBanner />
        </Suspense>
      </div>

      <div className="bgwhite studio-page">
        <StickyHeader />

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <StudioSection />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading locations…</div>}>
          <Locations />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading dimensions…</div>}>
          <StudioDimensions />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <StudioQoute />
        </Suspense>
      </div>
    </Fragment>
  );
}

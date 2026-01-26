import { Fragment, Suspense } from "react";
import PhilosophyBanner from "@/components/PhilosophyComponents/PhilosophyBanner";
import PhilosophyArchives from "@/components/PhilosophyComponents/PhilosophyArchives";
import StickyHeader from "@/components/GlobalCompo/StickyHeader";

export const metadata = {
  title: "Philosophy — LWK Agency | Creative Digital Solutions",
  description: "LWK + PARTNERS is a leading architecture and design practice rooted in Hong Kong"
};

export default function page() {
  return (
    <Fragment>
      <div className="position-sticky top-0">
        <Suspense fallback={<div className="text-center py-5">Loading banner…</div>}>
          <PhilosophyBanner />
        </Suspense>
      </div>

      <div className="bgwhite">
        <StickyHeader />

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <PhilosophyArchives />
        </Suspense>
      </div>
    </Fragment>
  );
}

import { Fragment, Suspense } from "react";
import AboutBanner from "@/components/AboutComponents/AboutBanner";
import WhoWeAre from "@/components/AboutComponents/WhoWeAre";
import AboutValues from "@/components/AboutComponents/AboutValues";
import AboutPeople from "@/components/AboutComponents/AboutPeople";
import AboutJourney from "@/components/AboutComponents/AboutJourney";
import AboutStudios from "@/components/AboutComponents/AboutStudios";
import StickyHeader from "@/components/GlobalCompo/StickyHeader";

export const metadata = {
  title: "About Us — LWK Agency | Creative Digital Solutions",
  description: "LWK + PARTNERS is a leading architecture and design practice rooted in Hong Kong",
};

export default function AboutPage() {
  return (
    <Fragment>
      <div className="position-sticky top-0">
        <Suspense fallback={<div className="text-center py-5">Loading banner…</div>}>
          <AboutBanner />
        </Suspense>
      </div>

      <div className="bgwhite">
        <StickyHeader />

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <WhoWeAre />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <AboutValues />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <AboutPeople />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <AboutJourney />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <AboutStudios />
        </Suspense>
      </div>
    </Fragment>
  );
}

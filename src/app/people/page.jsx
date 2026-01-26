import { Fragment, Suspense } from "react";
import StickyHeader from "@/components/GlobalCompo/StickyHeader";
import HashScroll from "@/components/ReuseableComponent/HashScroll";
import PeopleBanner from "@/components/PeopleComponent/PeopleBanner";
import PeopleHeading from "@/components/PeopleComponent/PeopleHeading";
import PeopleDeparts from "@/components/PeopleComponent/PeopleDeparts";

export const metadata = {
  title: "People — LWK Agency | Creative Digital Solutions",
  description: "LWK + PARTNERS is a leading architecture and design practice rooted in Hong Kong"
};

export default function page() {
  return (
    <Fragment>
      <HashScroll />

      <div className="position-sticky top-0">
        <Suspense fallback={<div className="text-center py-5">Loading banner…</div>}>
          <PeopleBanner />
        </Suspense>
      </div>

      <div className="bgwhite">
        <StickyHeader />

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <PeopleHeading />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <PeopleDeparts />
        </Suspense>
      </div>
    </Fragment>
  );
}

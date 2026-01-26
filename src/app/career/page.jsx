import { Fragment, Suspense } from "react";
import StickyHeader from "@/components/GlobalCompo/StickyHeader";
import HashScroll from "@/components/ReuseableComponent/HashScroll";
import CareerBanner from "@/components/CareerComponent/CareerBanner";
import CareerHeading from "@/components/CareerComponent/CareerHeading";
import EmployeHeading from "@/components/CareerComponent/EmployeHeading";
import CarrerLWK from "@/components/CareerComponent/CarrerLWK";
import EmployeSlider from "@/components/CareerComponent/EmployeSlider";
import JobTabs from "@/components/CareerComponent/JobTabs";

export const metadata = {
  title: "LWK Career — LWK Agency | Creative Digital Solutions",
  description: "LWK + PARTNERS is a leading architecture and design practice rooted in Hong Kong"
};

export default function page() {
  return (
    <Fragment>
      <HashScroll />

      <div className="position-sticky top-0">
        <Suspense fallback={<div className="text-center py-5">Loading banner…</div>}>
          <CareerBanner />
        </Suspense>
      </div>

      <div className="bgwhite">
        <StickyHeader />

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <CareerHeading />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <JobTabs />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <CarrerLWK />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <EmployeHeading />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <EmployeSlider />
        </Suspense>
      </div>
    </Fragment>
  );
}

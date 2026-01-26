import { Fragment, Suspense } from "react";
import ContactBanner from "@/components/ContactComponent/ContactBanner";
import StickyHeader from "@/components/GlobalCompo/StickyHeader";
import ContactHeading from "@/components/ContactComponent/ContactHeading";
import FormAndMap from "@/components/ContactComponent/FormAndMap";
import OfficeLocation from "../../components/ContactComponent/OfficeLocation";

export const metadata = {
  title: "Contact Us — LWK Agency | Creative Digital Solutions",
  description: "LWK + PARTNERS is a leading architecture and design practice rooted in Hong Kong",
};

export default function page() {
  return (
    <Fragment>
      <div className="position-sticky top-0">
        <Suspense fallback={<div className="text-center py-5">Loading banner…</div>}>
          <ContactBanner />
        </Suspense>
      </div>

      <div className="bgwhite">
        <StickyHeader />

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <ContactHeading />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <FormAndMap />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <OfficeLocation />
        </Suspense>
      </div>
    </Fragment>
  );
}

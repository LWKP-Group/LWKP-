import { Fragment, Suspense } from "react";
import StickyHeader from "@/components/GlobalCompo/StickyHeader";
import MediaBanner from "@/components/MediaComponenet/MediaBanner";
import MediaHeading from "@/components/MediaComponenet/MediaHeading";
import MediaTabs from "@/components/MediaComponenet/MediaTabs";

export const metadata = {
  title: "Media Coverage — LWK Agency | Creative Digital Solutions",
  description: "LWK + PARTNERS is a leading architecture and design practice rooted in Hong Kong"
};

export default function page() {
  return (
    <Fragment>
      <div className="position-sticky top-0">
        <Suspense fallback={<div className="text-center py-5">Loading banner…</div>}>
          <MediaBanner />
        </Suspense>
      </div>

      <div className="bgwhite">
        <StickyHeader />

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <MediaHeading />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <MediaTabs />
        </Suspense>
      </div>
    </Fragment>
  );
}

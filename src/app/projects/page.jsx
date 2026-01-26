import { Fragment, Suspense } from "react";
import StickyHeader from "@/components/GlobalCompo/StickyHeader";
import PortfolioBanner from "@/components/PortfolioComponent/PortfolioBanner";
import FeaturedPortfolio from "@/components/PortfolioComponent/FeaturedPortfolio";
import ProjectsWrapper from "@/components/PortfolioComponent/ProjectsWrapper";

export const metadata = {
  title: "Portfolio — LWK Agency | Creative Digital Solutions",
  description: "LWK + PARTNERS is a leading architecture and design practice rooted in Hong Kong"
};

export default function page() {
  return (
    <Fragment>
      <div className="position-sticky top-0">
        <Suspense fallback={<div className="text-center py-5">Loading banner…</div>}>
          <PortfolioBanner />
        </Suspense>
      </div>

      <div className="bgwhite">
        <StickyHeader />

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <FeaturedPortfolio />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <ProjectsWrapper />
        </Suspense>
      </div>
    </Fragment>
  );
}

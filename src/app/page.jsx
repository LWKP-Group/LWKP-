import { Fragment, Suspense } from "react";
import PhilosophySec from "@/components/Home/philosophySection";
import AboutWe from "@/components/Home/aboutWe";
import MainBanner from "@/components/Home/mainBanner";
import Purpose from "@/components/Home/purpose";
import HomeProjects from "@/components/Home/HomeProjects";
import Recognition from "@/components/Home/Recognition";
import HomeStories from "@/components/Home/HomeStories";
import HomePortfolio from "@/components/Home/HomeProtfolio";
import HomeInsights from "@/components/Home/HomeInsights";
import StickyHeader from "@/components/GlobalCompo/StickyHeader";

export default function Home() {
  return (
    <Fragment>
      <div className="position-sticky top-0">
        <Suspense fallback={<div className="text-center py-5">Loading banner…</div>}>
          <MainBanner />
        </Suspense>
      </div>

      <div className="bgwhite home">
        <StickyHeader />

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <AboutWe />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <PhilosophySec />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <Purpose />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5"> </div>}>
          <HomeProjects />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading recognition…</div>}>
          <Recognition />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading stories…</div>}>
          <HomeStories />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading portfolio…</div>}>
          <HomePortfolio />
        </Suspense>

        <Suspense fallback={<div className="text-center py-5">Loading insights…</div>}>
          <HomeInsights />
        </Suspense>
      </div>
    </Fragment>
  );
}

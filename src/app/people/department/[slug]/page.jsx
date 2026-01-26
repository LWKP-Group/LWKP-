import { Fragment, Suspense } from "react";
import DepartmentLayoutClient from "./components/DepartmentLayoutClient";
import StickyHeader from "@/components/GlobalCompo/StickyHeader";
import SinglePageBanner from "@/components/PeopleComponent/SinglePageBanner";
import PeopleHeading from "@/components/PeopleComponent/PeopleHeading";
import { decodeHTML } from "@/lib/formatText";
import MaintenanceGuard from "@/components/MaintenanceGuard";

async function getDepartment(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/people_departs?slug=${slug}&_embed`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data?.[0] || null;
  } catch (err) {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const type = await getDepartment(slug);

  if (!type) {
    return {
      title: "Project Type Not Found | LWK",
      description: "This project type does not exist.",
    };
  }

  return {
    title: `${decodeHTML(type.name)} — Projects | LWK`,
    description: type.description || `Explore ${type.name} projects.`,
  };
}

export default async function PeopleDepartmentPage({ params }) {
  const { slug } = await params;
  const dept = await getDepartment(slug);

  if (!dept) {
    return <MaintenanceGuard posts={dept} />;
  }
  const people = dept.people || [];

  return (
    <Fragment>
      <div className="position-sticky top-0">
        <Suspense fallback={<div className="text-center py-5">Loading banner…</div>}>
          <SinglePageBanner />
        </Suspense>
      </div>

      <div className="bgwhite people-single-page">
        <StickyHeader />

        <Suspense fallback={<div className="text-center py-5">Loading content…</div>}>
          <PeopleHeading />
        </Suspense>

        <DepartmentLayoutClient people={people} />
      </div>
    </Fragment>
  );
}

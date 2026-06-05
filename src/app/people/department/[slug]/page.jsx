import { Fragment, Suspense } from "react";
import { cookies } from "next/headers";

import DepartmentLayoutClient from "./components/DepartmentLayoutClient";
import StickyHeader from "@/components/GlobalCompo/StickyHeader";
import SinglePageBanner from "@/components/PeopleComponent/SinglePageBanner";
import PeopleHeading from "@/components/PeopleComponent/PeopleHeading";
import { decodeHTML } from "@/lib/formatText";
import MaintenanceGuard from "@/components/MaintenanceGuard";

async function getDepartment(slug, lang) {
  try {
    const wpLang = lang === "ch" ? "zh-hans" : "en";

    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/people_departs?slug=${slug}&lang=${wpLang}&_embed`, {
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
  const cookieStore = await cookies();

  const lang = cookieStore.get("site_lang")?.value || "en";

  const { slug } = await params;

  const type = await getDepartment(slug, lang);

  if (!type) {
    return {
      title: "Department Not Found | LWK",
      description: "This department does not exist.",
    };
  }

  return {
    title: `${decodeHTML(type.name)} — People | LWK`,
    description: type.description || `Explore ${type.name} people.`,
  };
}

export default async function PeopleDepartmentPage({ params }) {
  const cookieStore = await cookies();

  const lang = cookieStore.get("site_lang")?.value || "en";

  const { slug } = await params;

  const dept = await getDepartment(slug, lang);

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

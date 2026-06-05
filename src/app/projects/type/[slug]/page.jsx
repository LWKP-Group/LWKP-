import { cookies } from "next/headers";

import BannerWrapper from "./typecomponents/BannerWrapper";
import StickyHeader from "@/components/GlobalCompo/StickyHeader";
import ProjectTypeArchives from "./typecomponents/ProjectTypeArchives";
import MaintenanceGuard from "@/components/MaintenanceGuard";

async function getType(slug, lang) {
  try {
    const wpLang = lang === "ch" ? "zh-hans" : "en";

    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/project_type?slug=${slug}&lang=${wpLang}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();

    return data?.[0] || null;
  } catch (err) {
    return null;
  }
}

async function getProjects(typeId, lang) {
  try {
    const wpLang = lang === "ch" ? "zh-hans" : "en";

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WP_API}/projects?project_type=${typeId}&per_page=12&lang=${wpLang}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) return [];

    return await res.json();
  } catch (err) {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const cookieStore = await cookies();

  const lang = cookieStore.get("site_lang")?.value || "en";

  const { slug } = await params;

  const type = await getType(slug, lang);

  if (!type) {
    return {
      title: "Project Type Not Found | LWK",
      description: "This project type does not exist.",
    };
  }

  return {
    title: `${type.name} — Projects | LWK`,
    description: type.description || `Explore ${type.name} projects.`,
  };
}

export default async function Page({ params }) {
  const cookieStore = await cookies();

  const lang = cookieStore.get("site_lang")?.value || "en";

  const { slug } = await params;

  const type = await getType(slug, lang);

  if (!type) {
    return <MaintenanceGuard posts={type} />;
  }

  const projects = await getProjects(type.id, lang);

  return (
    <div>
      <div className="position-sticky top-0">
        <BannerWrapper type={type} />
      </div>

      <div className="bgwhite">
        <StickyHeader />
        <ProjectTypeArchives projects={projects} />
      </div>
    </div>
  );
}

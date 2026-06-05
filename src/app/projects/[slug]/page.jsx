import { cookies } from "next/headers";

async function getPost(slug, lang) {
  try {
    const wpLang = lang === "ch" ? "zh-hans" : "en";

    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/projects?slug=${slug}&lang=${wpLang}&_embed`, {
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

  const post = await getPost(slug, lang);

  if (!post) {
    return {
      title: "Post Not Found — Projects | LWK",
      description: "Requested post does not exist.",
    };
  }

  return {
    title: `${post.title.rendered} — Projects | LWK`,
    description: post?.acf?.sub_heading || post?.acf?.description?.substring(0, 150) || "Projects content at LWK.",
  };
}

import StickyHeader from "@/components/GlobalCompo/StickyHeader";
import HeroProjects from "./component/HeroProjects";
import MainProjectContent from "./component/MainProjectContent";
import MaintenanceGuard from "@/components/MaintenanceGuard";

export default async function ProjectSingle({ params }) {
  const cookieStore = await cookies();

  const lang = cookieStore.get("site_lang")?.value || "en";

  const { slug } = await params;

  const post = await getPost(slug, lang);

  if (!post) {
    return <MaintenanceGuard posts={post} />;
  }

  return (
    <div>
      <div className="position-sticky top-0">
        <HeroProjects post={post} />
      </div>

      <div className="bgwhite">
        <StickyHeader />
        <MainProjectContent post={post} />
      </div>
    </div>
  );
}

import { cookies } from "next/headers";

async function getPost(slug, lang) {
  try {
    const wpLang = lang === "ch" ? "zh-hans" : "en";

    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/media_post?slug=${slug}&lang=${wpLang}&_embed`, {
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
      title: "Post Not Found — Media | LWK",
      description: "Requested post does not exist.",
    };
  }

  return {
    title: `${post.title.rendered} — Media | LWK`,
    description: post?.acf?.sub_heading || post?.acf?.description?.substring(0, 150) || "Media content at LWK.",
  };
}

import StickyHeader from "@/components/GlobalCompo/StickyHeader";
import MainMediaContent from "./components/MainMediaContent";
import HeroMedia from "./components/HeroMedia";
import MaintenanceGuard from "@/components/MaintenanceGuard";

export default async function MediaSingle({ params }) {
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
        <HeroMedia post={post} />
      </div>

      <div className="bgwhite">
        <StickyHeader />
        <MainMediaContent post={post} />
      </div>
    </div>
  );
}

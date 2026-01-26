async function getPost(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/media_post?slug=${slug}&_embed`, { cache: "no-store" });

    if (!res.ok) return null;

    const data = await res.json();
    return data?.[0] || null;
  } catch (err) {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found — media | LWK",
      description: "Requested post does not exist.",
    };
  }

  return {
    title: `${post.title.rendered} — media | LWK`,
    description: post?.acf?.sub_heading || post?.acf?.description?.substring(0, 150) || "media content at LWK.",
  };
}

import StickyHeader from "@/components/GlobalCompo/StickyHeader";
import MainMediaContent from "./components/MainMediaContent";
import HeroMedia from "./components/HeroMedia";
import MaintenanceGuard from "@/components/MaintenanceGuard";

export default async function mediaSingle({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

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

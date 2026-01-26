async function getPost(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/awards?slug=${slug}&_embed`, { cache: "no-store" });

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
      title: "Post Not Found — awards | LWK",
      description: "Requested post does not exist.",
    };
  }

  return {
    title: `${post.title.rendered} — awards | LWK`,
    description: post?.acf?.sub_heading || post?.acf?.description?.substring(0, 150) || "awards content at LWK.",
  };
}

import StickyHeader from "@/components/GlobalCompo/StickyHeader";
import HeroAward from "./components/HeroAward";
import MainAwardsContent from "./components/MainAwardsContent";
import MaintenanceGuard from "@/components/MaintenanceGuard";

export default async function awardSingle({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return <MaintenanceGuard posts={post} />;
  }

  return (
    <div>
      <div className="position-sticky top-0">
        <HeroAward post={post} />
      </div>

      <div className="bgwhite">
        <StickyHeader />
        <MainAwardsContent post={post} />
      </div>
    </div>
  );
}

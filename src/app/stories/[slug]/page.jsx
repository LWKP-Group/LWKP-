// global api fetch funtion for slug
async function getPost(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/stories?slug=${slug}&_embed`, { cache: "no-store" });

    if (!res.ok) return null;

    const data = await res.json();
    return data?.[0] || null;
  } catch (err) {
    return null;
  }
}

// Dynamic Meta Data
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found — story | LWK",
      description: "Requested post does not exist.",
    };
  }

  return {
    title: `${post.title.rendered} — story | LWK`,
    description: post?.acf?.sub_heading || post?.acf?.description?.substring(0, 150) || "story content at LWK.",
  };
}

import StickyHeader from "@/components/GlobalCompo/StickyHeader";
import HeroStory from "./components/HeroStory";
import MainStoryContent from "./components/MainStoryContent";
import MaintenanceGuard from "@/components/MaintenanceGuard";

export default async function storySingle({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return <MaintenanceGuard posts={post} />;
  }

  return (
    <div>
      <div className="position-sticky top-0">
        <HeroStory post={post} />
      </div>

      <div className="bgwhite">
        <StickyHeader />
        <MainStoryContent post={post} />
      </div>
    </div>
  );
}

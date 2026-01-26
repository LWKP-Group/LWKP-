async function getPost(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/projects?slug=${slug}&_embed`, { cache: "no-store" });

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
      title: "Post Not Found — projects | LWK",
      description: "Requested post does not exist.",
    };
  }

  return {
    title: `${post.title.rendered} — projects | LWK`,
    description: post?.acf?.sub_heading || post?.acf?.description?.substring(0, 150) || "projects content at LWK.",
  };
}

import StickyHeader from "@/components/GlobalCompo/StickyHeader";
import HeroProjects from "./component/HeroProjects";
import MainProjectContent from "./component/MainProjectContent";
import MaintenanceGuard from "@/components/MaintenanceGuard";

export default async function projctSingle({ params }) {
  const { slug } = await params;

  const post = await getPost(slug);

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

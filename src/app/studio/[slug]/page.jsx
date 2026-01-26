async function getPost(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/studiolocation?slug=${slug}&_embed`, {
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
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found — Studio Location | LWK",
      description: "Requested post does not exist.",
    };
  }

  return {
    title: `${post.title.rendered} — Studio Location | LWK`,
    description:
      post?.acf?.sub_heading || post?.acf?.description?.substring(0, 150) || "Studio Location content at LWK.",
  };
}

import Hero from "./components/HeroBanner";
import StickyHeader from "@/components/GlobalCompo/StickyHeader";
import Rhythm from "./components/Rhythm";
import Convergence from "./components/Convergence";
import Gallery from "./components/Gallery";
import FeatureProjects from "./components/FeatureProjects";
import MaintenanceGuard from "@/components/MaintenanceGuard";

export default async function page({ params }) {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    return <MaintenanceGuard posts={post} />;
  }
  return (
    <div>
      <div className="position-sticky top-0">
        <Hero post={post} />
      </div>

      <div className="bgwhite">
        <StickyHeader />

        <Rhythm post={post} />
        <Convergence post={post} />
        <Gallery post={post} />
        <FeatureProjects projects={post?.acf?.projects_realtion || []} />
      </div>
    </div>
  );
}

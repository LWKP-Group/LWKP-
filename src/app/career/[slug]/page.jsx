async function getPost(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/jobs?slug=${slug}&_embed`, { cache: "no-store" });

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
      title: "Post Not Found — Philosophy | LWK",
      description: "Requested post does not exist.",
    };
  }

  return {
    title: `${post.title.rendered} — Philosophy | LWK`,
    description: post?.acf?.sub_heading || post?.acf?.description?.substring(0, 150) || "Philosophy content at LWK.",
  };
}

import MaintenanceGuard from "@/components/MaintenanceGuard";
import MergerCompo from "./components/MergerCompo";

export default async function careerSingle({ params }) {
  const { slug } = await params;
  const job = await getPost(slug);

  if (!job) {
    return <MaintenanceGuard posts={job} />;
  }

  return (
    <div className="container jobs-single">
      <MergerCompo job={job} />
    </div>
  );
}

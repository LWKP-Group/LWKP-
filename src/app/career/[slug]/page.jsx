import { cookies } from "next/headers";

async function getPost(slug, lang) {
  try {
    const wpLang = lang === "ch" ? "zh-hans" : "en";

    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/jobs?slug=${slug}&lang=${wpLang}&_embed`, {
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
      title: "Job Not Found | LWK",
      description: "Requested job does not exist.",
    };
  }

  return {
    title: `${post.title.rendered} | Careers | LWK`,
    description: post?.acf?.sub_heading || post?.acf?.description?.substring(0, 150) || "Career opportunities at LWK.",
  };
}

import MaintenanceGuard from "@/components/MaintenanceGuard";
import MergerCompo from "./components/MergerCompo";

export default async function CareerSingle({ params }) {
  const cookieStore = await cookies();

  const lang = cookieStore.get("site_lang")?.value || "en";

  const { slug } = await params;

  const job = await getPost(slug, lang);

  if (!job) {
    return <MaintenanceGuard posts={job} />;
  }

  return (
    <div className="container jobs-single">
      <MergerCompo job={job} />
    </div>
  );
}

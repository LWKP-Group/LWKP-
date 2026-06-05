import { cookies } from "next/headers";
import StickyHeader from "@/components/GlobalCompo/StickyHeader";
import HeroCategoryBanner from "../catcomponenet/HeroCategoryBanner";
import CategoryArchivePage from "../catcomponenet/CategoryArchivePage";
import MaintenanceGuard from "@/components/MaintenanceGuard";

/* 🔹 Fetch Category by SLUG (SSR) */
async function getCategory(slug, lang) {
  try {
    const wpLang = lang === "ch" ? "zh-hans" : "en";

    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/story_category?slug=${slug}&lang=${wpLang}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();

    return data?.[0] || null;
  } catch (err) {
    return null;
  }
}

/* 🔹 Fetch Posts by Category ID (SSR) */
async function getCategoryPosts(id, lang) {
  try {
    const wpLang = lang === "ch" ? "zh-hans" : "en";

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WP_API}/stories?_embed&story_category=${id}&per_page=12&lang=${wpLang}`,
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

/* 🔹 SEO */
export async function generateMetadata({ params }) {
  const cookieStore = await cookies();

  const lang = cookieStore.get("site_lang")?.value || "en";

  const { slug } = await params;

  const category = await getCategory(slug, lang);

  if (!category) {
    return {
      title: "Category Not Found | LWK",
      description: "This category does not exist.",
    };
  }

  return {
    title: `${category.name} — Stories | LWK`,
    description: category.description || `Explore stories under ${category.name}.`,
  };
}

/* 🔹 Main Category Page */
export default async function Page({ params }) {
  const cookieStore = await cookies();

  const lang = cookieStore.get("site_lang")?.value || "en";

  const { slug } = await params;

  const category = await getCategory(slug, lang);

  if (!category) {
    return <MaintenanceGuard posts={category} />;
  }

  let imageUrl = null;

  if (category?.acf?.image) {
    try {
      const imgRes = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/media/${category.acf.image}`, {
        cache: "no-store",
      });

      const imgData = await imgRes.json();

      imageUrl = imgData?.source_url || null;
    } catch (_) {}
  }

  category.image = imageUrl;

  const posts = await getCategoryPosts(category.id, lang);

  return (
    <>
      <div className="position-sticky top-0">
        <HeroCategoryBanner category={category} />
      </div>

      <div className="bgwhite">
        <StickyHeader />
        <CategoryArchivePage posts={posts} />
      </div>
    </>
  );
}

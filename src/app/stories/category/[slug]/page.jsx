import StickyHeader from "@/components/GlobalCompo/StickyHeader";
import HeroCategoryBanner from "../catcomponenet/HeroCategoryBanner";
import CategoryArchivePage from "../catcomponenet/CategoryArchivePage";
import MaintenanceGuard from "@/components/MaintenanceGuard";

/* 🔹 Fetch Category by SLUG (SSR) */
async function getCategory(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/story_category?slug=${slug}`, { cache: "no-store" });

    if (!res.ok) return null;

    const data = await res.json();
    return data?.[0] || null;
  } catch (err) {
    return null;
  }
}

/* 🔹 Fetch Posts by Category ID (SSR) */
async function getCategoryPosts(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/stories?_embed&story_category=${id}&per_page=12`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    return await res.json();
  } catch (err) {
    return [];
  }
}

/* 🔹 SEO: Dynamic Meta Title + Description */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategory(slug);

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
  const { slug } = await params;

  const category = await getCategory(slug);

  if (!category) {
    return <MaintenanceGuard posts={category} />;
  }

  // Resolve category image from ACF media if needed
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

  // add resolved image into category object (banner uses this)
  category.image = imageUrl;

  // Fetch category posts
  const posts = await getCategoryPosts(category.id);

  return (
    <>
      {/* Sticky Header + Banner */}
      <div className="position-sticky top-0">
        <HeroCategoryBanner category={category} />
      </div>

      {/* Archive */}
      <div className="bgwhite">
        <StickyHeader />
        <CategoryArchivePage posts={posts} />
      </div>
    </>
  );
}

/**
 * Resolve WordPress Media ID → Image URL
 * Reusable across project
 */

const mediaCache = {};

export async function getMediaUrl(mediaId) {
  if (!mediaId) return null;

  // cache hit
  if (mediaCache[mediaId]) {
    return mediaCache[mediaId];
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/media/${mediaId}`);

    if (!res.ok) return null;

    const data = await res.json();
    const url = data?.source_url || null;

    mediaCache[mediaId] = url;
    return url;
  } catch (error) {
    console.error("Media fetch failed:", error);
    return null;
  }
}

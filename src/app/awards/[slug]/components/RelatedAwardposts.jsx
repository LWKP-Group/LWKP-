"use client";

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchawardsPosts, selectawardsPosts, selectawardsLoading } from "@/store/slices/awardsSlice";
import { shuffleArray } from "@/lib/shuffleArray";
import { limitWords } from "@/lib/shuffleArray";

export default function RelatedAwardposts() {
  const dispatch = useDispatch();

  const posts = useSelector(selectawardsPosts);
  const loading = useSelector(selectawardsLoading);
  const [randomPosts, setRandomPosts] = useState([]);

  useEffect(() => {
    if (!posts || posts.length === 0) {
      dispatch(fetchawardsPosts({ page: 1 }));
    }
  }, [dispatch]);
  useEffect(() => {
    if (posts && posts.length > 0) {
      const shuffled = shuffleArray(posts);
      setRandomPosts(shuffled.slice(0, 4));
    }
  }, [posts]);

  if (loading) {
    return <div className="text-center py-4">Loading related posts…</div>;
  }

  if (!randomPosts || randomPosts.length === 0) {
    return <div className="text-center py-4">No related posts available.</div>;
  }

  return (
    <Fragment>
      <div className="row related-posts">
        <div className="col-sm-12">
          <h4>You may also like</h4>
        </div>

        {randomPosts.map((post) => {
          const image = post?.featured_image;
          const title = limitWords(post?.title?.rendered || "Title not available");
          const slug = post?.slug;

          return (
            <div className="col-sm-6 mb-4" key={post.id}>
              {image ? (
                <Image src={image} alt={title} width={400} height={300} className="img-fluid" loading="lazy" />
              ) : (
                <p>Image not available</p>
              )}

              <h6 dangerouslySetInnerHTML={{ __html: title }} />
              <Link href={`/awards/${slug}`}>READ MORE →</Link>
            </div>
          );
        })}

        <div className="col-sm-12">
          <h4>Follow us on</h4>
        </div>
      </div>
    </Fragment>
  );
}

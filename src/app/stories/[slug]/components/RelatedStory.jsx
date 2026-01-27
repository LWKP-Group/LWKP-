"use client";

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchstoriesPosts, selectstoriesPosts, selectstoriesLoading } from "@/store/slices/storiesSlice";
import { shuffleArray } from "@/lib/shuffleArray";
import { limitWords } from "@/lib/shuffleArray";

export default function RelatedStory() {
  const dispatch = useDispatch();

  const posts = useSelector(selectstoriesPosts);
  const loading = useSelector(selectstoriesLoading);

  const [randomPosts, setRandomPosts] = useState([]);

  useEffect(() => {
    if (!posts || posts.length === 0) {
      dispatch(fetchstoriesPosts({ page: 1 }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (posts && posts.length > 0) {
      const shuffled = shuffleArray(posts);
      setRandomPosts(shuffled.slice(0, 2));
    }
  }, [posts]);

  if (loading) {
    return <div className="container text-center py-4">Loading related stories…</div>;
  }

  if (!randomPosts.length) {
    return <div className="container text-center py-4">No related stories found.</div>;
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
            <div className="col-sm-12 mb-4 storyy" key={post.id}>
              <div className="row ">
                <div className="col-sm-4">
                  {image && (
                    <Image src={image} alt={title} width={400} height={300} className="img-fluid" loading="lazy" />
                  )}
                </div>
                <div className="col-sm-8">
                  {" "}
                  <h6 dangerouslySetInnerHTML={{ __html: title }} />
                  <Link href={`/stories/${slug}`}>READ MORE →</Link>
                </div>
              </div>
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

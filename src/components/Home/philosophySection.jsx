"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPhilosophyPosts,
  selectAllPhilosophyPosts,
  selectAllPhilosophyLoading,
} from "@/store/slices/philosophyAllSlice";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";
import { motion } from "framer-motion";
import { rowAnim } from "@/lib/animation";
import Link from "next/link";

export default function PhilosophySection() {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPhilosophyPosts);
  const loading = useSelector(selectAllPhilosophyLoading);
  const lang = useSelector((state) => state.language.currentLanguage);

  useEffect(() => {
    dispatch(fetchAllPhilosophyPosts());
  }, [dispatch, lang]);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return <div className="container text-center py-5"> </div>;
  }

  return (
    <motion.div
      className="container philosophySection"
      variants={rowAnim}
      initial="hidden"
      whileInView="show"
      exit="exit"
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="row heads mb-4">
        <p className="sub-heading">{lang === "ch" ? "哲学" : "Philosophy"}</p>

        <h3>{lang === "ch" ? "明日传奇" : "Legacy of Tomorrow"}</h3>
      </div>

      <div className="row g-4">
        {posts.map((post, index) => {
          const img = post?.featured_image;
          const colClass = index < 2 ? "col-sm-6" : "col-sm-4";
          const title = post?.title?.rendered || "Philosophy";

          return (
            <div key={post.id} className={colClass}>
              <div className="card h-100">
                {img ? (
                  <img src={img} className="card-img-top" alt={title} loading="lazy" />
                ) : (
                  <div className="card-img-top">Image not available</div>
                )}

                <div className="card-body">
                  <Link href={`/philosophy/${post.slug}`}>
                    <h5 className="philo-title-link" dangerouslySetInnerHTML={{ __html: title }} />
                  </Link>

                  {post?.acf?.archive_tagline && <p className="text-muted small">{post.acf.archive_tagline}</p>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

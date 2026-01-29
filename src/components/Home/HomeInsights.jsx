"use client";

import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchInsightPosts, selectInsightPosts, selectInsightLoading } from "@/store/slices/insightSlice";

import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { rowAnim } from "@/lib/animation";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";

function HomeInsights() {
  const dispatch = useDispatch();

  const posts = useSelector(selectInsightPosts);
  const loading = useSelector(selectInsightLoading);

  useEffect(() => {
    dispatch(fetchInsightPosts({ page: 1, category: "all" }));
  }, [dispatch]);

  if (loading || !posts) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!posts.length) {
    return <div className="container text-center py-5">Content not available.</div>;
  }

  return (
    <Fragment>
      <motion.div
        className="container insights-wrapper"
        variants={rowAnim}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="row">
          <div className="col-sm-12">
            <p className="sub-heading">Insights</p>
            <h3>Thoughtscapes</h3>
          </div>

          <div className="row insight-post">
            {posts.slice(0, 3).map((post) => {
              const formattedDate = dayjs(post.date).format("DD MMMM YYYY");
              const image = post?.featured_image;
              const title = post?.title?.rendered || "Insight";

              return (
                <motion.div whileHover={{ scale: 0.95 }} key={post.id} className="col-sm-4">
                  {image ? (
                    <Image
                      src={image}
                      alt={title}
                      width={400}
                      height={300}
                      className="img-fluid"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  ) : (
                    <div>Image not available.</div>
                  )}

                  <p>
                    Articles — <span className="date">{formattedDate}</span>
                  </p>

                  <Link href={`/insight/${post.slug}`}>
                    {" "}
                    <h5
                      dangerouslySetInnerHTML={{
                        __html: title,
                      }}
                    />
                  </Link>

                  {/* <Link href={`/insight/${post.slug}`}>Read More →</Link> */}
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
}

export default HomeInsights;

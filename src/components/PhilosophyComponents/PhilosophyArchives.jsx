"use client";

import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";
import {
  fetchPhilosophyPosts,
  selectPhilosophyPosts,
  selectPhilosophyLoading,
  selectPhilosophyTotal,
} from "@/store/slices/philosophySlice";

import ArchivePagination from "@/components/ReuseableComponent/Pagination";
import { motion } from "framer-motion";
import { rowAnim } from "@/lib/animation";

export default function PhilosophyArchives() {
  const dispatch = useDispatch();

  const posts = useSelector(selectPhilosophyPosts);
  const loading = useSelector(selectPhilosophyLoading);
  const total = useSelector(selectPhilosophyTotal);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchPhilosophyPosts({ page }));
  }, [dispatch, page]);

  if (loading && (!posts || posts.length === 0)) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return <div className="container text-center py-5">No Philosophy Found</div>;
  }

  return (
    <Fragment>
      <div className="container philosophy-archives">
        {posts.map((post, index) => {
          const title = post?.title?.rendered || "";
          const subHeading = post?.acf?.sub_heading || "";
          const description = post?.acf?.description || "";
          const image = post?.featured_image?.url || post?.featured_image || "/no-image.jpg";
          const slug = post?.slug;

          const isEven = index % 2 === 0;

          const shortDesc =
            (description
              ?.replace(/<[^>]*>/g, " ")
              ?.replace(/\s+/g, " ")
              ?.trim()
              ?.split(" ")
              ?.slice(0, 25)
              ?.join(" ") || "") + "...";

          return (
            <motion.div
              key={post.id}
              className="row align-items-center philosophy-row"
              id={title.toLowerCase().replace(/\s+/g, "-")}
              variants={rowAnim}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.3 }}
            >
              {isEven && (
                <div className="col-sm-6 left-side">
                  <p className="sub-heading">{title}</p>
                  <h2>{subHeading}</h2>

                  <div className="wysiwyg-text" dangerouslySetInnerHTML={{ __html: shortDesc }} />

                  <Link href={`/philosophy/${slug}`} className="button-css mt-3">
                    VIEW MORE →
                  </Link>
                </div>
              )}

              <div className="col-sm-6">
                <Image
                  src={image}
                  alt={title}
                  width={700}
                  height={500}
                  className="img-fluid philosophy-img"
                  loading="lazy"
                />
              </div>

              {!isEven && (
                <div className="col-sm-6 right-side">
                  <p className="sub-heading">{title}</p>
                  <h2>{subHeading}</h2>

                  <div className="wysiwyg-text" dangerouslySetInnerHTML={{ __html: shortDesc }} />

                  <Link href={`/philosophy/${slug}`} className="button-css mt-3">
                    VIEW MORE →
                  </Link>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {total > 8 && <ArchivePagination current={page} pageSize={8} total={total} onChange={(p) => setPage(p)} />}
    </Fragment>
  );
}

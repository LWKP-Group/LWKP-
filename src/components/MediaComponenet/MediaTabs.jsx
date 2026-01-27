"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchMediaCategories,
  selectMediaCategories,
  selectMediaCategoriesLoading,
} from "@/store/slices/mediaCategorySlice";

import { fetchMediaPosts, selectMediaPosts, selectMediaTotal, selectMediaLoading } from "@/store/slices/mediaSlice";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";
import ArchivePagination from "@/components/ReuseableComponent/Pagination";
import { rowAnim, cardAnim } from "@/lib/animation";

export default function MediaTabs() {
  const dispatch = useDispatch();

  const categories = useSelector(selectMediaCategories);
  const catLoading = useSelector(selectMediaCategoriesLoading);

  const posts = useSelector(selectMediaPosts);
  const total = useSelector(selectMediaTotal);
  const loading = useSelector(selectMediaLoading);

  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);

  const perPage = 12;

  useEffect(() => {
    dispatch(fetchMediaCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchMediaPosts({
        page,
        category: activeTab,
      }),
    );
  }, [dispatch, page, activeTab]);

  if (catLoading || !categories) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  return (
    <motion.div
      className="container top-bottom-pad tabs-insight"
      id="media"
      variants={rowAnim}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false }}
    >
      <ul className="nav nav-tabs insight-tabs">
        {/* ALL TAB */}
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "all" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("all");
              setPage(1);
            }}
          >
            All Media
          </button>
        </li>

        {categories.map((cat) => (
          <li className="nav-item" key={cat.id}>
            <button
              className={`nav-link ${activeTab === cat.id ? "active" : ""}`}
              onClick={() => {
                setActiveTab(cat.id);
                setPage(1);
              }}
            >
              <span dangerouslySetInnerHTML={{ __html: cat.name }} />
            </button>
          </li>
        ))}
      </ul>

      <div className="tab-content mt-4">
        {loading || !posts ? (
          <div className="container text-center py-5">
            <GlobalLoader />
          </div>
        ) : posts.length === 0 ? (
          <div className="container text-center py-5">No media found</div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${page}`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 25 }}
              transition={{ duration: 0.35 }}
            >
              <div className="row media-post">
                {posts.map((post, i) => {
                  const date = dayjs(post.date).format("DD MMMM YYYY");
                  const image = post?.featured_image;
                  const title = post?.title?.rendered || "Media";

                  return (
                    <motion.div
                      key={post.id}
                      className="col-sm-12 mb-4"
                      custom={i}
                      variants={cardAnim}
                      initial="hidden"
                      animate="show"
                    >
                      <div className="row mediabox">
                        <div className="col-sm-6 media-right">
                          <p>{date}</p>
                          <h4
                            dangerouslySetInnerHTML={{
                              __html: title,
                            }}
                          />
                          <Link href={`/media/${post.slug}`}>READ MORE →</Link>
                        </div>

                        <div className="col-sm-6">
                          {image ? (
                            <Image
                              src={image}
                              alt={title}
                              width={400}
                              height={300}
                              className="img-fluid"
                              loading="lazy"
                              sizes="(max-width: 768px) 100vw, 400px"
                              unoptimized
                            />
                          ) : (
                            <div>Image not available</div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {total > perPage && (
                <ArchivePagination
                  current={page}
                  pageSize={perPage}
                  total={total}
                  onChange={(p) => {
                    setPage(p);
                    window.scrollTo({
                      top: 200,
                      behavior: "smooth",
                    });
                  }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}

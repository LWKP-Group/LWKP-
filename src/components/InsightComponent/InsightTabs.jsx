"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchInsightCategories,
  selectInsightCategories,
  selectInsightCategoriesLoading,
} from "@/store/slices/insightCategorySlice";

import {
  fetchInsightPosts,
  selectInsightPosts,
  selectInsightTotal,
  selectInsightLoading,
} from "@/store/slices/insightSlice";

import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";
import ArchivePagination from "@/components/ReuseableComponent/Pagination";
import { rowAnim, cardAnim } from "@/lib/animation";

export default function InsightTabs() {
  const dispatch = useDispatch();

  const categories = useSelector(selectInsightCategories);
  const catLoading = useSelector(selectInsightCategoriesLoading);

  const posts = useSelector(selectInsightPosts) || [];
  const total = useSelector(selectInsightTotal);
  const loading = useSelector(selectInsightLoading);

  const [activeTab, setActiveTab] = useState("all"); // slug
  const [page, setPage] = useState(1);

  const perPage = 9;

  // Load categories
  useEffect(() => {
    dispatch(fetchInsightCategories());
  }, [dispatch]);

  // 🔥 Handle URL Hash (Slug Based)
  useEffect(() => {
    if (!categories || categories.length === 0) return;

    const applyHash = () => {
      const hash = window.location.hash.replace("#", "");

      if (!hash) {
        setActiveTab("all");
        return;
      }

      const matched = categories.find((cat) => cat.slug === hash);

      if (matched) {
        setActiveTab(matched.slug);
        setPage(1);
      } else {
        setActiveTab("all");
      }
    };

    applyHash();

    window.addEventListener("hashchange", applyHash);

    return () => {
      window.removeEventListener("hashchange", applyHash);
    };
  }, [categories]);

  // 🔥 Fetch Posts (Convert slug → ID)
  useEffect(() => {
    if (!categories) return;

    let categoryId = null;

    if (activeTab !== "all") {
      const matched = categories.find((cat) => cat.slug === activeTab);
      categoryId = matched ? matched.id : null;
    }

    dispatch(
      fetchInsightPosts({
        page,
        categoryId,
      }),
    );
  }, [dispatch, page, activeTab, categories]);

  if (catLoading) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  return (
    <motion.div
      className="container top-bottom-pad tabs-insight"
      id="insight"
      variants={rowAnim}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false }}
    >
      {/* Tabs */}
      <ul className="nav nav-tabs insight-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "all" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("all");
              setPage(1);
              window.location.hash = "";
            }}
          >
            All Insights
          </button>
        </li>

        {categories.map((cat) => (
          <li className="nav-item" key={cat.id}>
            <button
              className={`nav-link ${activeTab === cat.slug ? "active" : ""}`}
              onClick={() => {
                setActiveTab(cat.slug);
                setPage(1);
                window.location.hash = cat.slug;
              }}
            >
              <span dangerouslySetInnerHTML={{ __html: cat.name }} />
            </button>
          </li>
        ))}
      </ul>

      {/* Content */}
      <div className="tab-content mt-4">
        {loading ? (
          <div className="container text-center py-5">
            <GlobalLoader />
          </div>
        ) : posts.length === 0 ? (
          <div className="container text-center py-5">No insights found</div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${page}`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 25 }}
              transition={{ duration: 0.35 }}
            >
              <div className="row insight-post">
                {posts.map((post, i) => {
                  const date = dayjs(post.date).format("DD MMMM YYYY");
                  const image = post?.featured_image;
                  const title = post?.title?.rendered || "Insight";

                  return (
                    <motion.div
                      key={post.id}
                      className="col-sm-4 mb-4"
                      custom={i}
                      variants={cardAnim}
                      initial="hidden"
                      animate="show"
                    >
                      {image ? (
                        <Image src={image} alt={title} width={400} height={300} className="img-fluid" loading="lazy" />
                      ) : (
                        <div>Image not available</div>
                      )}

                      <p>
                        Articles — <span className="date">{date}</span>
                      </p>

                      <h5
                        dangerouslySetInnerHTML={{
                          __html: title,
                        }}
                      />

                      <Link href={`/insight/${post.slug}`}>Read More →</Link>
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

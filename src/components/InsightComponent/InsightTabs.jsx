"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import { fetchInsightCategories, selectInsightCategories, selectInsightCategoriesLoading } from "@/store/slices/insightCategorySlice";

import { fetchInsightPosts, selectInsightPosts, selectInsightTotal, selectInsightLoading } from "@/store/slices/insightSlice";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";
import ArchivePagination from "@/components/ReuseableComponent/Pagination";
import { rowAnim, cardAnim } from "@/lib/animation";

export default function InsightTabs() {
  const dispatch = useDispatch();

  const categories = useSelector(selectInsightCategories);
  const catLoading = useSelector(selectInsightCategoriesLoading);

  const posts = useSelector(selectInsightPosts);
  const total = useSelector(selectInsightTotal);
  const loading = useSelector(selectInsightLoading);

  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);

  const perPage = 9;

  useEffect(() => {
    dispatch(fetchInsightCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchInsightPosts({
        page,
        category: activeTab
      })
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
    <motion.div className="container top-bottom-pad tabs-insight" id="insight" variants={rowAnim} initial="hidden" whileInView="show" viewport={{ once: false }}>
      <ul className="nav nav-tabs insight-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "all" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("all");
              setPage(1);
            }}>
            All Insights
          </button>
        </li>

        {categories.map(cat => (
          <li className="nav-item" key={cat.id}>
            <button
              className={`nav-link ${activeTab === cat.id ? "active" : ""}`}
              onClick={() => {
                setActiveTab(cat.id);
                setPage(1);
              }}>
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
          <div className="container text-center py-5">No insights found</div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={`${activeTab}-${page}`} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 25 }} transition={{ duration: 0.35 }}>
              <div className="row insight-post">
                {posts.map((post, i) => {
                  const date = dayjs(post.date).format("DD MMMM YYYY");
                  const image = post?.featured_image;
                  const title = post?.title?.rendered || "Insight";

                  return (
                    <motion.div key={post.id} className="col-sm-4 mb-4" custom={i} variants={cardAnim} initial="hidden" animate="show">
                      {image ? (
                        <Image src={image} alt={title} width={400} height={300} className="img-fluid" loading="lazy" sizes="(max-width: 768px) 100vw, 400px" unoptimized />
                      ) : (
                        <div>Image not available</div>
                      )}

                      <p>
                        Articles — <span className="date">{date}</span>
                      </p>

                      <h5
                        dangerouslySetInnerHTML={{
                          __html: title
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
                  onChange={p => {
                    setPage(p);
                    window.scrollTo({
                      top: 200,
                      behavior: "smooth"
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

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";
import { fetchJobs, selectJobs, selectJobsTotal, selectJobsLoading } from "@/store/slices/jobSlice";

import { fetchjobCategories, selectjobCategories } from "@/store/slices/jobCategorySlice";

import ArchivePagination from "@/components/ReuseableComponent/Pagination";
import { rowAnim, cardAnim } from "@/lib/animation";

export default function JobTabs() {
  const dispatch = useDispatch();

  const categories = useSelector(selectjobCategories);
  const jobs = useSelector(selectJobs);
  const total = useSelector(selectJobsTotal);
  const loading = useSelector(selectJobsLoading);

  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(1);

  const perPage = 20;

  useEffect(() => {
    dispatch(fetchjobCategories());
  }, [dispatch]);

  useEffect(() => {
    const categoryId = activeTab === 0 ? "" : categories?.[activeTab - 1]?.id;

    dispatch(fetchJobs({ page, category: categoryId }));
  }, [dispatch, page, activeTab, categories]);

  return (
    <motion.div
      className="container top-bottom-pad tabs-insight"
      variants={rowAnim}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false }}
    >
      <ul className="nav nav-tabs insight-tabs">
        <li className="nav-item">
          {/* <button
            className={`nav-link ${activeTab === 0 ? "active" : ""}`}
            onClick={() => {
              setActiveTab(0);
              setPage(1);
            }}
          >
            All Jobs
          </button> */}
        </li>

        {(categories || []).map((cat, index) => (
          <li className="nav-item" key={cat.id}>
            <button
              className={`nav-link ${activeTab === index + 1 ? "active" : ""}`}
              onClick={() => {
                setActiveTab(index + 1);
                setPage(1);
              }}
            >
              <span dangerouslySetInnerHTML={{ __html: cat.name }} />
            </button>
          </li>
        ))}
      </ul>

      <div className="tab-content mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`jobs-${activeTab}-${page}`}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 25 }}
            transition={{ duration: 0.4 }}
          >
            {loading ? (
              <div className="container text-center py-5">
                <GlobalLoader />
              </div>
            ) : (
              <>
                <div className="row">
                  {Array.isArray(jobs) && jobs.length > 0 ? (
                    jobs.map((job, i) => (
                      <motion.div
                        key={job.id}
                        className="col-sm-6 job-content"
                        whileHover={{ scale: 1.02 }}
                        custom={i}
                        variants={cardAnim}
                        initial="hidden"
                        animate="show"
                      >
                        <div className="job-card">
                          <h4
                            dangerouslySetInnerHTML={{
                              __html: job?.title?.rendered || "Job Title",
                            }}
                          />
                          {job?.acf?.location && <p className="job-location">{job.acf.location}</p>}
                          <Link href={`/career/${job.slug}`} className="job-link">
                            Apply Now →
                          </Link>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-sm-12 text-center py-5">
                      <h4>No jobs available</h4>
                    </div>
                  )}
                </div>

                {total > perPage && (
                  <ArchivePagination
                    current={page}
                    pageSize={perPage}
                    total={total}
                    onChange={(p) => {
                      setPage(p);
                      window.scrollTo({ top: 50, behavior: "smooth" });
                    }}
                  />
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

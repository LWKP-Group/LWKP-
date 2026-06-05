"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";

import {
  fetchProjectsPaginated,
  selectProjectsPaginatedPosts,
  selectProjectsPaginatedLoading,
  selectProjectsPaginatedTotal,
} from "@/store/slices/projectsPaginatedSlice";

import ArchivePagination from "@/components/ReuseableComponent/Pagination";
import { rowAnim } from "@/lib/animation";

export default function FeaturedPortfolio() {
  const dispatch = useDispatch();

  const rawProjects = useSelector(selectProjectsPaginatedPosts);
  const loading = useSelector(selectProjectsPaginatedLoading);
  const total = useSelector(selectProjectsPaginatedTotal);
  const lang = useSelector((state) => state.language.currentLanguage);

  const projects = Array.isArray(rawProjects) ? rawProjects : [];

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProjectsPaginated({ page }));
  }, [dispatch, page, lang]);

  return (
    <motion.section
      className="container project-philosophy main-pad"
      variants={rowAnim}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.1 }}
    >
      <div className="row mb-4" id="featured">
        <div className="col-sm-12">
          <p className="sub-heading">{lang === "ch" ? "精选" : "featured"}</p>
          <h3> {lang === "ch" ? "精选项目" : "Featured Projects"}</h3>
        </div>
      </div>

      {/* ✅ SIMPLE LOADER (WORKS ON PAGINATION) */}
      {loading && (
        <div className="text-center py-5">
          <GlobalLoader />
        </div>
      )}

      {/* ❌ GRID HIDE WHILE LOADING */}
      {!loading && projects.length === 0 && <div className="text-center py-5">No Featured Projects</div>}

      {!loading && (
        <div className="row">
          {projects.map((project) => {
            const title = project?.title?.rendered || "";
            const slug = project?.slug || "";
            const location = project?.project_loaction?.[0]?.name || project?.acf?.project_location || "";

            const image = project?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

            return (
              <motion.div key={project.id} whileHover={{ scale: 0.98 }} className="col-sm-6 mb-4">
                {image && (
                  <Image src={image} alt={title} width={600} height={400} className="img-fluid" loading="lazy" />
                )}

                <h5 dangerouslySetInnerHTML={{ __html: title }} />
                {location && <h6>{location}</h6>}

                <Link href={`/projects/${slug}`}>{lang === "ch" ? "查看项目 → " : "View Project → "}</Link>
              </motion.div>
            );
          })}
        </div>
      )}

      {total > 6 && <ArchivePagination current={page} pageSize={6} total={total} onChange={(p) => setPage(p)} />}
    </motion.section>
  );
}

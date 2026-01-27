"use client";

import { useEffect, useState, useRef, useMemo, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";
import {
  fetchProjectsArchive,
  selectProjectsArchivePosts,
  selectProjectsArchiveLoading,
  selectProjectsArchiveTotal,
} from "@/store/slices/projectsArchiveSlice";

import ProjectFilters from "./ProjectFilters";
import ArchivePagination from "@/components/ReuseableComponent/Pagination";

const fadeGrid = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

export default function FilterGrid() {
  const dispatch = useDispatch();
  const gridRef = useRef(null);

  // RAW DATA FROM API
  const rawProjects = useSelector(selectProjectsArchivePosts);
  const loading = useSelector(selectProjectsArchiveLoading);
  const total = useSelector(selectProjectsArchiveTotal);

  // FILTER STATES
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState(null);
  const [location, setLocation] = useState(null);

  const [appliedKeyword, setAppliedKeyword] = useState("");
  const [appliedType, setAppliedType] = useState(null);
  const [appliedLocation, setAppliedLocation] = useState(null);

  const pageSize = 9;

  // FETCH DATA
  useEffect(() => {
    dispatch(
      fetchProjectsArchive({
        page,
        keyword: appliedKeyword,
        type: appliedType,
        location: appliedLocation,
      }),
    );
  }, [dispatch, page, appliedKeyword, appliedType, appliedLocation]);

  // ✅ SORT BY DATE (LATEST FIRST)
  const projects = useMemo(() => {
    return [...rawProjects].sort((a, b) => {
      const aDate = new Date(a?.date_gmt || a?.date || a?.modified_gmt);
      const bDate = new Date(b?.date_gmt || b?.date || b?.modified_gmt);
      return bDate - aDate; // 🔥 latest published first
    });
  }, [rawProjects]);

  // APPLY FILTERS
  const handleSearch = () => {
    setPage(1);
    setAppliedKeyword(keyword);
    setAppliedType(type);
    setAppliedLocation(location);
  };

  return (
    <Fragment>
      <div className="container" id="recent-projects">
        <p className="sub-heading">Portfolio</p>
        <h2>Our Recent Project</h2>
      </div>

      <div className="container py-5 gridbox" ref={gridRef}>
        <ProjectFilters
          keyword={keyword}
          type={type}
          location={location}
          onKeywordChange={setKeyword}
          onTypeChange={setType}
          onLocationChange={setLocation}
          onSearch={handleSearch}
        />

        {loading && (
          <div className="text-center py-5">
            <GlobalLoader />
          </div>
        )}

        {!loading && projects.length === 0 && <div className="text-center py-5">No Project Found</div>}

        {!loading && projects.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${page}-${appliedKeyword}-${appliedType}-${appliedLocation}`}
              className="row"
              variants={fadeGrid}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {projects.map((project) => {
                const title = project?.title?.rendered || "";
                const slug = project?.slug || "";
                const image = project?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

                return (
                  <motion.div key={project.id} className="col-sm-4 mb-4" whileHover={{ scale: 0.98 }}>
                    {image && (
                      <Image src={image} alt={title} width={600} height={400} className="img-fluid" loading="lazy" />
                    )}

                    <h5 dangerouslySetInnerHTML={{ __html: title }} />
                    <Link href={`/projects/${slug}`}>View Project →</Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}

        {total > pageSize && (
          <ArchivePagination
            current={page}
            pageSize={pageSize}
            total={total}
            onChange={(p) => {
              setPage(p);
              gridRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        )}
      </div>
    </Fragment>
  );
}

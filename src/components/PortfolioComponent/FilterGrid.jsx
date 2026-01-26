"use client";

import { useEffect, useState, useRef, useMemo, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";
import { fetchProjectsArchive, selectProjectsArchivePosts, selectProjectsArchiveLoading, selectProjectsArchiveTotal } from "@/store/slices/projectsArchiveSlice";

import ProjectFilters from "./ProjectFilters";
import ArchivePagination from "@/components/ReuseableComponent/Pagination";

const fadeGrid = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } }
};

export default function FilterGrid() {
  const dispatch = useDispatch();
  const gridRef = useRef(null);

  const rawProjects = useSelector(selectProjectsArchivePosts);
  const loading = useSelector(selectProjectsArchiveLoading);
  const total = useSelector(selectProjectsArchiveTotal);

  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState(null);
  const [location, setLocation] = useState(null);

  const [appliedKeyword, setAppliedKeyword] = useState("");
  const [appliedType, setAppliedType] = useState(null);
  const [appliedLocation, setAppliedLocation] = useState(null);

  const pageSize = 9;

  useEffect(() => {
    dispatch(fetchProjectsArchive({ page, keyword: appliedKeyword }));
  }, [dispatch, page, appliedKeyword]);

  const projects = useMemo(() => {
    return rawProjects.filter(p => {
      if (appliedType) {
        const types = p?.project_type || [];
        if (!types.some(t => Number(t.id) === Number(appliedType))) return false;
      }

      if (appliedLocation) {
        const locs = p?.project_location || p?.project_loaction || [];
        if (!locs.some(l => Number(l.id) === Number(appliedLocation))) return false;
      }

      return true;
    });
  }, [rawProjects, appliedType, appliedLocation]);

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
      <div className="container py-5 gridbox " ref={gridRef}>
        <ProjectFilters keyword={keyword} type={type} location={location} onKeywordChange={setKeyword} onTypeChange={setType} onLocationChange={setLocation} onSearch={handleSearch} />

        {loading && (
          <div className="container text-center py-5">
            <GlobalLoader />
          </div>
        )}

        {!loading && projects.length === 0 && <div className="container text-center py-5">No Project Found</div>}

        {!loading && projects.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div key={`${page}-${appliedKeyword}-${appliedType}-${appliedLocation}`} className="row" variants={fadeGrid} initial="hidden" animate="show" exit="exit">
              {projects.map(project => {
                const title = project?.title?.rendered || "";
                const slug = project?.slug || "";
                const image = project?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

                return (
                  <motion.div key={project.id} className="col-sm-4 mb-4">
                    {image && <Image src={image} alt={title} width={600} height={400} className="img-fluid" loading="lazy" />}

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
            onChange={p => {
              setPage(p);
              gridRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        )}
      </div>
    </Fragment>
  );
}

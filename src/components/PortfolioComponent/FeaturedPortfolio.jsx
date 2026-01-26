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

  const projects = useSelector(selectProjectsPaginatedPosts);
  const loading = useSelector(selectProjectsPaginatedLoading);
  const total = useSelector(selectProjectsPaginatedTotal);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProjectsPaginated({ page }));
  }, [dispatch, page]);

  if (loading && (!projects || projects.length === 0)) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return <div className="container text-center py-5">No Projects Found</div>;
  }

  const featuredProjects = projects.filter((project) => {
    const categories = project?.project_category || project?.taxonomies?.project_category || [];

    return categories.some((cat) => cat?.slug === "featured" || cat?.name?.toLowerCase() === "featured");
  });

  if (featuredProjects.length === 0) {
    return <div className="container text-center py-5">No Featured Projects</div>;
  }

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
          <p className="sub-heading">featured</p>
          <h3>Featured Project</h3>
        </div>
      </div>

      <div className="row">
        {featuredProjects.map((project) => {
          const title = project?.title?.rendered || project?.title || "";
          const slug = project?.slug;
          const location = project?.project_loaction?.[0]?.name || project?.acf?.project_location || "";

          const image = project?.featured_image || project?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

          return (
            <motion.div whileHover={{ scale: 0.95 }} key={project.id} className="col-sm-6 mb-4">
              {image && <Image src={image} alt={title} width={600} height={400} className="img-fluid" loading="lazy" />}

              <h5 dangerouslySetInnerHTML={{ __html: title }} />
              {location && <h6>{location}</h6>}

              <Link href={`/projects/${slug}`}>View Project →</Link>
            </motion.div>
          );
        })}
      </div>

      {total > 12 && <ArchivePagination current={page} pageSize={12} total={total} onChange={(p) => setPage(p)} />}
    </motion.section>
  );
}

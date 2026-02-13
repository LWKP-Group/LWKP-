"use client";

import Image from "next/image";
import { Fragment, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ArchivePagination from "@/components/ReuseableComponent/Pagination";
import { formatText } from "@/lib/formatText";
import { rowAnim } from "@/lib/animation";

export default function ProjectTypeArchives({ projects }) {
  const [loadedImages, setLoadedImages] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 10;

  if (!projects || projects.length === 0) {
    return <div className="container text-center py-5"> </div>;
  }

  const start = (currentPage - 1) * perPage;
  const paginatedProjects = projects.slice(start, start + perPage);

  return (
    <Fragment>
      <div className="container philosophy-archives">
        <motion.div
          className="row align-items-center gridbox"
          variants={rowAnim}
          initial="hidden"
          whileInView="show"
          exit="exit"
          viewport={{ once: false, amount: 0.3 }}
        >
          {paginatedProjects.map((project, index) => {
            const title = project?.title?.rendered || "Title not available";
            const image = project?.featured_image;
            const slug = project?.slug;
            const description = project?.acf?.tagline || "";
            const location = project?.project_loaction?.[0]?.name || "Location";

            return (
              <motion.div className="col-sm-4" key={index} whileHover={{ scale: 0.95 }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: loadedImages[index] ? 1 : 0 }}
                  transition={{ duration: 0.7 }}
                >
                  {image ? (
                    <Image
                      src={image}
                      alt={title}
                      width={700}
                      height={500}
                      className="img-fluid philosophy-img"
                      loading="lazy"
                      onLoad={() =>
                        setLoadedImages((prev) => ({
                          ...prev,
                          [index]: true,
                        }))
                      }
                    />
                  ) : (
                    <p className="text-center py-4">Image not available</p>
                  )}
                </motion.div>

                {location && <p className="sub-heading">{location}</p>}
                <h4 className="arc-head">{title}</h4>

                <div
                  className="wysiwyg-text mt-3"
                  dangerouslySetInnerHTML={{
                    __html: description ? formatText(description) : "<p>Content not available.</p>",
                  }}
                />

                <Link href={`/projects/${slug}`} className="button-css mt-3">
                  View Project →
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <ArchivePagination
        current={currentPage}
        pageSize={perPage}
        total={projects.length}
        onChange={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 200, behavior: "smooth" });
        }}
      />
    </Fragment>
  );
}

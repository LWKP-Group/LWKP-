"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { container, itemAnim } from "@/lib/animation";

export default function FeatureProjects({ projects }) {
  if (!projects) {
    return <div className="container text-center py-5">Loading featured projects…</div>;
  }

  if (!projects.length) {
    return <div className="container text-center py-5"> </div>;
  }

  const sortedProjects = projects.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="container project-philosophy studion-inner" id="featured">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        exit="exit"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="row mb-4">
          <div className="col-sm-12">
            <p className="sub-heading">Featured</p>
            <h3>Featured Projects</h3>
          </div>
        </div>

        <div className="row">
          {sortedProjects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemAnim}
              whileHover={{ scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="col-sm-6 mb-4"
            >
              {project?.featured_image ? (
                <Image
                  src={project.featured_image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="img-fluid"
                  loading="lazy"
                />
              ) : (
                <p>Image not available.</p>
              )}
              <h5>{project.title}</h5>
              <h6>{project?.taxonomies?.project_loaction?.[0]?.name}</h6>
              <Link href={`/projects/${project.slug}`}>View Project →</Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { container } from "@/lib/animation";

export default function Projects({ projects }) {
  if (!projects || projects.length === 0) {
    return <section className="container project-philosophy text-center py-5">Loading projects…</section>;
  }

  const sortedProjects = projects.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section className="container project-philosophy">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="row mb-4">
          <div className="col-sm-12">
            <p className="sub-heading">Projects</p>
            <h3>Our Stories in Design</h3>
          </div>
        </div>

        <div className="row">
          {sortedProjects.map((project, index) => {
            return (
              <motion.div
                className="col-sm-6 mb-4"
                key={project.id || project.slug || index}
                whileHover={{ scale: 0.98 }}
              >
                {project?.featured_image ? (
                  <Image
                    src={project.featured_image}
                    alt={project?.title || "Project image"}
                    width={400}
                    height={300}
                    className="img-fluid"
                    loading="lazy"
                  />
                ) : (
                  <p>Image not available</p>
                )}
                <h5>{project?.title || "Title not available"}</h5>
                <h6>{project?.taxonomies?.project_loaction?.[0]?.name || "Location not available"}</h6>
                <Link href={`/projects/${project.slug}`}>View Project →</Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

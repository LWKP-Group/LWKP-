"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CategoryArchivePage({ posts = [] }) {
  if (!posts.length) {
    return <div className="container py-5 text-center">No stories found.</div>;
  }

  return (
    <div className="container py-5">
      <div className="row carArc">
        {posts.map((post) => {
          const title = post?.title?.rendered || "Untitled";
          const slug = post?.slug;
          const link = `/stories/${slug}`;
          const thumb = post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

          return (
            <motion.div key={post.id} className="col-sm-6 mb-4" whileHover={{ scale: 0.95 }}>
              <div className="card h-100 shadow-sm border-0">
                {/* Thumbnail */}
                {thumb ? (
                  <Image
                    src={thumb}
                    alt={title}
                    width={500}
                    height={350}
                    className="card-img-top"
                    style={{
                      objectFit: "cover",
                      height: "220px",
                      width: "100%",
                    }}
                  />
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center bg-light"
                    style={{ height: "220px" }}
                  >
                    No Image
                  </div>
                )}

                {/* Card Body */}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title" dangerouslySetInnerHTML={{ __html: title }} />

                  <Link href={link} className="btn btn-dark mt-auto w-100" style={{ fontWeight: 500 }}>
                    View Story →
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

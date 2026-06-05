"use client";

import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { container } from "@/lib/animation";
import { useSelector } from "react-redux";

export default function InsightsList({ insights }) {
  if (!insights || insights.length === 0) {
    return <section className="container py-5 text-center">Loading insights…</section>;
  }
  const lang = useSelector((state) => state.language.currentLanguage);

  const sortedInsights = insights.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section className="container py-5">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        exit="exit"
        viewport={{ once: false, amount: 0.25 }}
      >
        <div className="row mb-4">
          <div className="col-sm-12">
            <p className="sub-heading">Insights</p>
            <h3>Thoughtscapes</h3>
          </div>
        </div>

        <div className="row insight-post">
          {sortedInsights.map((post, index) => {
            const formattedDate = post?.date ? dayjs(post.date).format("DD MMMM YYYY") : "Date not available";

            return (
              <motion.div className="col-sm-4 mb-4" key={post.id || post.slug || index} whileHover={{ scale: 0.95 }}>
                {post?.featured_image ? (
                  <Image
                    src={post.featured_image}
                    alt={post?.title || "image"}
                    width={400}
                    height={300}
                    className="img-fluid"
                    loading="lazy"
                  />
                ) : (
                  <p>Image not available</p>
                )}

                <p>
                  {lang === "ch" ? " 文章 " : "Articles "} - <span className="date">{formattedDate}</span>
                </p>

                <h5>{post?.title || "Title not available"}</h5>

                <Link href={`/insight/${post.slug}`}>{lang === "ch" ? " 阅读更多 → " : " Read More → "}</Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

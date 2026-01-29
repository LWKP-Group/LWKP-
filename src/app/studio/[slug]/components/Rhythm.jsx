"use client";

import Image from "next/image";
import { Fragment } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { rowAnim } from "@/lib/animation";

export default function Rhythm({ post }) {
  if (!post) {
    return <div className="container text-center py-5">Loading content…</div>;
  }

  const title = post?.acf?.rhythm_heading || "Rhythm";
  const subHeading = "RHYTHM";
  const description = post?.acf?.rhythm_description || "";
  const image = post?.acf?.rhythm_image || "";

  const safeImage = image && image.trim() !== "" ? image : null;

  return (
    <Fragment>
      <div className="container studios-archives" id="rhythm">
        <motion.div
          className="row align-items-center studios-row"
          id={title.toLowerCase().replace(/\s+/g, "-")}
          variants={rowAnim}
          initial="hidden"
          whileInView="show"
          exit="exit"
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="col-sm-6 left-side">
            <p className="sub-heading">{subHeading}</p>
            <h2>{title}</h2>

            <div className="wysiwyg-text" dangerouslySetInnerHTML={{ __html: description }} />

            <Link href="#" className="button-css mt-3">
              Contact Us →
            </Link>
          </div>

          <div className="col-sm-6">
            {safeImage ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
                <Image
                  src={safeImage}
                  alt={title}
                  width={700}
                  height={500}
                  className="img-fluid philosophy-img"
                  loading="lazy"
                />
              </motion.div>
            ) : (
              <p>Image not available.</p>
            )}
          </div>
        </motion.div>
      </div>
    </Fragment>
  );
}

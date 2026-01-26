"use client";

import Image from "next/image";
import { Fragment } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { rowAnim } from "@/lib/animation";

export default function Convergence({ post }) {
  if (!post) {
    return <div className="container text-center py-5">Loading content…</div>;
  }

  const title = post?.acf?.convergence_heading || "Convergence";
  const subHeading = "convergence";
  const description = post?.acf?.convergence_description || "";
  const image = post?.acf?.convergence_image || "";
  const safeImage = image && image.trim() !== "" ? image : null;

  return (
    <Fragment>
      <div className="container studios-archives" id="convergence">
        <motion.div
          className="row align-items-center studios-row"
          id={title.toLowerCase().replace(/\s+/g, "-")}
          variants={rowAnim}
          initial="hidden"
          whileInView="show"
          exit="exit"
          viewport={{ once: false, amount: 0.3 }}>
          <div className="col-sm-6">
            {safeImage ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
                <Image src={safeImage} alt={title} width={700} height={500} className="img-fluid philosophy-img" loading="lazy" />
              </motion.div>
            ) : (
              <p>Image not available.</p>
            )}
          </div>

          <div className="col-sm-6 right-side">
            <p className="sub-heading">{subHeading}</p>
            <h2>{title}</h2>

            <div className="wysiwyg-text" dangerouslySetInnerHTML={{ __html: description }} />

            <Link href="#" className="button-css mt-3">
              Contact Us →
            </Link>
          </div>
        </motion.div>
      </div>
    </Fragment>
  );
}

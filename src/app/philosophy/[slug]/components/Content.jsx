"use client";

import Image from "next/image";
import { Fragment } from "react";
import { formatText } from "@/lib/formatText";
import { motion } from "framer-motion";
import { container, itemAnim } from "@/lib/animation";

export default function Content({ post }) {
  if (!post) {
    return <div className="container text-center py-5">Loading content…</div>;
  }

  return (
    <Fragment>
      <motion.div className="container phiosophy-content" variants={container} initial="hidden" whileInView="show" exit="exit" viewport={{ once: false, amount: 0.2 }}>
        <div className="row">
          <motion.div className="col-sm-12" variants={itemAnim}>
            <p className="sub-heading">{post?.title?.rendered || "Title not available"}</p>

            <h2>{post?.acf?.sub_heading || "Heading not available"}</h2>

            <div
              className="wysiwyg-text mt-3"
              dangerouslySetInnerHTML={{
                __html: post?.acf?.description ? formatText(post?.acf?.description) : "<p>Content not available.</p>"
              }}
            />

            <motion.div variants={itemAnim} className="mt-4">
              {post?.acf?.sub_image ? (
                <Image src={post.acf.sub_image} alt={post?.title?.rendered || "image"} width={1200} height={600} loading="lazy" className="img-fluid" />
              ) : (
                <p className="text-center">Image not available</p>
              )}
            </motion.div>
          </motion.div>

          <motion.div className="row boxes-three" variants={container} initial="hidden" whileInView="show" exit="exit" viewport={{ once: false, amount: 0.2 }}>
            <motion.div className="col-sm-4" variants={itemAnim}>
              <div
                className="wysiwyg-text mt-3"
                dangerouslySetInnerHTML={{
                  __html: post?.acf?.box_one ? formatText(post.acf.box_one) : "<p>Content not available.</p>"
                }}
              />
            </motion.div>

            <motion.div className="col-sm-4" variants={itemAnim}>
              <div
                className="wysiwyg-text mt-3"
                dangerouslySetInnerHTML={{
                  __html: post?.acf?.box_two ? formatText(post.acf.box_two) : "<p>Content not available.</p>"
                }}
              />
            </motion.div>

            <motion.div className="col-sm-4" variants={itemAnim}>
              <div
                className="wysiwyg-text mt-3"
                dangerouslySetInnerHTML={{
                  __html: post?.acf?.box_three ? formatText(post.acf.box_three) : "<p>Content not available.</p>"
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </Fragment>
  );
}

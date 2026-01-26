"use client";

import { Fragment, useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { rowAnim } from "@/lib/animation";

export default function Gallery({ post }) {
  if (!post) {
    return <div className="container text-center py-5">Loading gallery…</div>;
  }

  const gallery = post?.acf?.gallery || [];
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  if (!gallery.length) {
    return <div className="container text-center py-5">No images available.</div>;
  }

  const images = gallery.map((item) => ({
    src: item.id,
  }));

  return (
    <Fragment>
      <div className="container gallery mt-5" id="people">
        <motion.div
          className="row"
          variants={rowAnim}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="col-sm-12 mb-4">
            <p className="sub-heading">Our People</p>
            <h2>
              The Minds Behind the <br /> Architecture
            </h2>
          </div>

          <div className="col-sm-12">
            <div className="masonry-grid">
              {gallery.map((img, index) => (
                <motion.div
                  className="masonry-item"
                  key={index}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: "easeOut" },
                  }}
                  viewport={{ once: false, amount: 0.2 }}
                >
                  <img
                    src={img.id}
                    alt={img.title || "Gallery image"}
                    className="masonry-img"
                    loading="lazy"
                    onClick={() => {
                      setStartIndex(index);
                      setOpen(true);
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <Lightbox open={open} close={() => setOpen(false)} slides={images} index={startIndex} />
    </Fragment>
  );
}

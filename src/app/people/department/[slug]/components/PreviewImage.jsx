"use client";

import Image from "next/image";
import { Fragment, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { imgAnim } from "@/lib/animation";

export default function PreviewImage({ selectedPerson }) {
  const [loaded, setLoaded] = useState(false);

  if (!selectedPerson) {
    return <div className="col-sm-3 preview-image"></div>;
  }

  const img = selectedPerson?.image;

  return (
    <Fragment>
      <div className="col-sm-3 preview-image">
        <AnimatePresence mode="wait">
          <motion.div
            key={img}
            variants={imgAnim}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {img ? (
              <motion.div
                initial={{ filter: "blur(15px)" }}
                animate={{ filter: loaded ? "blur(0px)" : "blur(15px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Image
                  src={img}
                  width={400}
                  height={500}
                  alt="preview"
                  className="img-fluid"
                  loading="lazy"
                  onLoadingComplete={() => setLoaded(true)}
                />
              </motion.div>
            ) : (
              <p>No image available</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Fragment>
  );
}

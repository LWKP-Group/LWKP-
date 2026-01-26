"use client";

import Image from "next/image";
import { Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { imgAnim } from "@/lib/animation";

export default function PreviewImage({ selectedPerson }) {
  if (!selectedPerson) {
    return <div className="col-sm-3 preview-image"></div>; // EMPTY ON LOAD
  }

  const img = selectedPerson?.image;

  return (
    <Fragment>
      <div className="col-sm-3 preview-image">
        <AnimatePresence mode="wait">
          <motion.div key={img} variants={imgAnim} initial="hidden" animate="show" exit="hidden">
            {img ? (
              <Image src={img} width={400} height={500} alt="preview" className="img-fluid" loading="lazy" />
            ) : (
              <p>No image available</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Fragment>
  );
}

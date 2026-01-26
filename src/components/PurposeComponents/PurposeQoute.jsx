"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectpurposePosts } from "@/store/slices/purposeSlice";
import { rowAnim } from "@/lib/animation";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";

export default function PurposeQoute() {
  const posts = useSelector(selectpurposePosts);
  const acf = posts?.[0]?.acf;
  const guideline = acf?.guideline || "";

  if (!posts || posts.length === 0 || !guideline) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  return (
    <Fragment>
      <motion.div
        className="container quote-purpose"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="row">
          <motion.div className="col-sm-12" variants={rowAnim}>
            <h3>{guideline}</h3>
          </motion.div>
        </div>
      </motion.div>
    </Fragment>
  );
}

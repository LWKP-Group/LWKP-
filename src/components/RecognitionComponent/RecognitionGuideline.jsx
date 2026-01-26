"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectrecognitionPagePosts, selectrecognitionPageLoading } from "@/store/slices/recognitionPageSlice";
import { rowAnim } from "@/lib/animation";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";

export default function RecognitionGuideline() {
  const posts = useSelector(selectrecognitionPagePosts);
  const loading = useSelector(selectrecognitionPageLoading);

  if (loading || !posts || posts.length === 0) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  const guideline = posts[0]?.acf?.tagline || "";

  if (!guideline) return null;

  return (
    <Fragment>
      <motion.div
        className="container quote-purpose"
        id="guideline"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="row">
          <motion.div className="col-sm-12" variants={rowAnim}>
            <div className="qoutes">
              <h2>{guideline}</h2>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Fragment>
  );
}

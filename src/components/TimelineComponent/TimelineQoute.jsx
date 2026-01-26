"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selecttimelinePagePosts } from "@/store/slices/timelinePageSlice";
import AnimatedSubHeading from "@/components/ReuseableComponent/AnimatedSubHeading";
import { rowAnim } from "@/lib/animation";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";

export default function TimelineQoute() {
  const posts = useSelector(selecttimelinePagePosts);

  if (!posts || posts.length === 0) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  const acf = posts[0]?.acf || {};
  const guideline = acf?.timeline_qoute_one || "";
  const quote = acf?.timeline_qoute_two || "";

  if (!guideline && !quote) return null;

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
            {guideline && <h3>{guideline}</h3>}

            {quote && (
              <>
                <br />
                <h3>{quote}</h3>
              </>
            )}
          </motion.div>
        </div>
      </motion.div>
    </Fragment>
  );
}

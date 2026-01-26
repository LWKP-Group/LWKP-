"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectstudiopagePosts, selectstudiopageLoading } from "@/store/slices/studioPageSlice";
import AnimatedSubHeading from "@/components/ReuseableComponent/AnimatedSubHeading";
import { rowAnim } from "@/lib/animation";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";

export default function StudioQoute() {
  const posts = useSelector(selectstudiopagePosts);
  const loading = useSelector(selectstudiopageLoading);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!posts || posts.length === 0) return null;

  const acf = posts[0]?.acf;
  const guidelines = acf?.guideline || "";

  if (!guidelines) return null;

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
            <h3>{guidelines}</h3>
          </motion.div>
        </div>
      </motion.div>
    </Fragment>
  );
}

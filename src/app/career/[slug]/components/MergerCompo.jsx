"use client";

import { motion } from "framer-motion";
import { rowAnim } from "@/lib/animation";
import LeftSideInfo from "./LeftSideInfo";
import RightSideInfo from "./RightSideInfo";

export default function MergerCompo({ job }) {
  if (!job) {
    return <div className="container text-center py-5">Loading details…</div>;
  }

  return (
    <motion.div variants={rowAnim} initial="hidden" animate="show" className="merger-wrapper">
      <div className="row">
        <div className="col-sm-4">
          <LeftSideInfo job={job} />
        </div>

        <div className="col-sm-8">
          <RightSideInfo job={job} />
        </div>
      </div>
    </motion.div>
  );
}

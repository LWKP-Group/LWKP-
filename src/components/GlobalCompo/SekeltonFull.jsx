"use client";

import { Skeleton } from "antd";
import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export default function SekeltonFull({ count = 6, layout = "mixed", className = "" }) {
  return (
    <div className={`row skeletonfull g-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => {
        const colClass = layout === "mixed" ? (index < 2 ? "col-sm-6" : "col-sm-4") : "col-sm-4";

        return (
          <motion.div key={`sk-${index}`} className="col-sm-12" variants={item} initial="hidden" animate="show">
            <div className="card p-3">
              <Skeleton.Image
                style={{
                  width: "100%",
                  height: "180px",
                  borderRadius: 8,
                  marginBottom: "15px"
                }}
                active
              />

              <Skeleton active title={{ width: "70%" }} paragraph={{ rows: 2 }} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

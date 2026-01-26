"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const containerVariant = {
  show: {
    transition: {
      staggerChildren: 0.25
    }
  },
  hidden: {}
};

const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" }
  }
};

export default function RevealSection({ children, className = "" }) {
  const ref = useRef(null);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef("down");

  const controls = useAnimation();
  const inView = useInView(ref, { amount: 0.3 });

  // Detect scroll direction
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      scrollDirection.current = y > lastScrollY.current ? "down" : "up";
      lastScrollY.current = y;
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (inView && scrollDirection.current === "down") {
      controls.start("show");
    }

    if (!inView) {
      controls.start("hidden");
    }
  }, [inView]);

  return (
    <motion.section ref={ref} variants={containerVariant} initial="hidden" animate={controls} className={className}>
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={index} variants={itemVariant}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={itemVariant}>{children}</motion.div>
      )}
    </motion.section>
  );
}

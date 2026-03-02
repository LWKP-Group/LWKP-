"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="back-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 50 }}     // start slightly below
          animate={{ opacity: 1, y: 0 }}      // slide up into position
          exit={{ opacity: 0, y: 50 }}        // slide down on exit
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}
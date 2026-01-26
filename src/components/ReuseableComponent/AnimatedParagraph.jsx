"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export default function AnimatedParagraph({ text, className, staggerDelay = 0.08 }) {
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("show");
    }
  }, [isInView, controls]);

  const words = text.split(" ");

  const parent = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariant = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.p
      ref={ref}
      className={className}
      variants={parent}
      initial="hidden"
      animate={controls}
      aria-label={text}
      style={{ overflowWrap: "break-word" }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariant}
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            marginRight: "6px",
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

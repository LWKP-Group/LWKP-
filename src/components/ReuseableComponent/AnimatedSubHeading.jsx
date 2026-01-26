"use client";

import { motion } from "framer-motion";

export default function AnimatedSubHeading({ text, className, staggerDelay = 0.06 }) {
  const words = text.split(" ").map((word, wIndex) => ({
    id: wIndex,
    letters: word.split(""),
  }));

  const parent = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const wordVariant = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const letterVariant = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.h3
      className={className}
      variants={parent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      aria-label={text}
      style={{ overflowWrap: "break-word" }}
    >
      {words.map((word) => (
        <motion.span
          key={word.id}
          variants={wordVariant}
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            marginRight: "10px",
          }}
        >
          {word.letters.map((letter, i) => (
            <motion.span key={i} variants={letterVariant} style={{ display: "inline-block" }}>
              {letter}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </motion.h3>
  );
}

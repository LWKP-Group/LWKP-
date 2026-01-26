"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedText from "@/components/ReuseableComponent/AnimatedHeading";
import AnimatedParagraph from "@/components/ReuseableComponent/AnimatedParagraph";
import arrow from "@/assets/arrow.png";

export default function HeroCategoryBanner({ category }) {
  if (!category) {
    return <div className="container text-center py-5">Category not found...</div>;
  }

  const bgImage = category.image || "";
  const title = category.name || "";
  const description = category.description || "";
  const subheading = "Process/People/Culture/Perspective";

  return (
    <motion.section
      className="row mainbanner category-banner position-relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        padding: "80px 0",
      }}
    >
      {/* overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "rgba(0,0,0,0.45)" }} />

      <div className="col-sm-10 position-relative text-white">
        <AnimatedParagraph text={subheading} className="hero-text" />
        {/* Title */}
        <AnimatedText
          text={title}
          className="hero-title"
          style={{ fontSize: "48px", fontWeight: 800, marginBottom: "10px" }}
        />

        {/* Description */}
        {description && (
          <AnimatedParagraph
            text={description}
            className="hero-text"
            style={{
              maxWidth: "650px",
              fontSize: "18px",
              lineHeight: "1.5",
              opacity: 0.9,
            }}
          />
        )}

        {/* Scroll Arrow */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollBy({
                top: window.innerHeight * 0.5,
                behavior: "smooth",
              });
            }}
          >
            <Image src={arrow} alt="down arrow" loading="lazy" />
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}

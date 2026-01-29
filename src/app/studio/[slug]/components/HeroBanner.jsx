"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/ReuseableComponent/AnimatedHeading";
import AnimatedParagraph from "@/components/ReuseableComponent/AnimatedParagraph";
import { motion } from "framer-motion";
import arrow from "@/assets/arrow.png";
import SekeltonFull from "@/components/GlobalCompo/SekeltonFull";

export default function HeroBanner({ post }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  if (loading || !post) {
    return (
      <div className="container text-center py-5">
        <SekeltonFull count={1} layout="mixed" />
      </div>
    );
  }

  const bgImage = post?.featured_image || "";
  const title = post?.acf?.main_heading || "Title not available";
  const para = post?.acf?.mian_description || "Description not available";

  return (
    <motion.section
      className="row mainbanner"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="col-sm-6">
        <AnimatedText text={title} className="hero-title" />
        <AnimatedParagraph text={para} className="hero-para" />

        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollBy({
                top: window.innerHeight * 0.5,
                behavior: "smooth",
              });
            }}
          >
            <Image src={arrow} alt="arrow" loading="lazy" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

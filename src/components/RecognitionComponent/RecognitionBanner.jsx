"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/ReuseableComponent/AnimatedHeading";
import AnimatedParagraph from "@/components/ReuseableComponent/AnimatedParagraph";
import { motion } from "framer-motion";
import arrow from "@/assets/arrow.png";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchrecognitionPagePosts,
  selectrecognitionPagePosts,
  selectrecognitionPageLoading,
} from "@/store/slices/recognitionPageSlice";
import SekeltonFull from "@/components/GlobalCompo/SekeltonFull";

export default function RecognitionBanner() {
  const dispatch = useDispatch();
  const posts = useSelector(selectrecognitionPagePosts);
  const loading = useSelector(selectrecognitionPageLoading);

  useEffect(() => {
    dispatch(fetchrecognitionPagePosts());
  }, [dispatch]);

  if (loading || !posts || posts.length === 0) {
    return (
      <div className="container text-center py-5">
        <SekeltonFull count={1} layout="mixed" />
      </div>
    );
  }

  const recognition = posts[0];
  const bgImage = recognition?.featured_image || "";
  const title = recognition?.title?.rendered || "Recognition";
  const description =
    recognition?.acf?.main_description || "Every space we design carries memory forward — alive with meaning.";

  return (
    <motion.section
      className="row mainbanner"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="col-sm-6">
        <AnimatedText text={title} className="hero-title" />
        <AnimatedParagraph text={description} className="hero-text" />

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
            <Image src={arrow} alt="arrow" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

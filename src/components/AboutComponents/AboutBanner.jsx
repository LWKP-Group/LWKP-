"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/ReuseableComponent/AnimatedHeading";
import AnimatedParagraph from "@/components/ReuseableComponent/AnimatedParagraph";
import { motion } from "framer-motion";
import arrow from "@/assets/arrow.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchaboutusPosts, selectaboutusPosts, selectaboutusLoading } from "@/store/slices/aboutusSlice";
import SekeltonFull from "@/components/GlobalCompo/SekeltonFull";

export default function AboutBanner() {
  const dispatch = useDispatch();
  const posts = useSelector(selectaboutusPosts);
  const loading = useSelector(selectaboutusLoading);

  useEffect(() => {
    dispatch(fetchaboutusPosts());
  }, [dispatch]);

  if (loading || !posts || posts.length === 0) {
    return (
      <div className="container text-center py-5">
        <SekeltonFull count={1} layout="mixed" />
      </div>
    );
  }

  const about = posts[0];
  const bgImage = about?.featured_image;
  const title = about?.title?.rendered || "About Us";
  const description = about?.acf?.main_text || "Every space we design carries memory forward — alive with meaning.";

  return (
    <motion.section
      className="row mainbanner"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="col-sm-4">
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
            <Image src={arrow} alt="arrow" loading="lazy" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/ReuseableComponent/AnimatedHeading";
import AnimatedParagraph from "@/components/ReuseableComponent/AnimatedParagraph";
import { motion } from "framer-motion";
import arrow from "@/assets/arrow.png";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchtimelinePagePosts,
  selecttimelinePagePosts,
  selecttimelinePageLoading,
} from "@/store/slices/timelinePageSlice";
import SekeltonFull from "@/components/GlobalCompo/SekeltonFull";

export default function TimelineBanner() {
  const dispatch = useDispatch();
  const posts = useSelector(selecttimelinePagePosts);
  const loadingApi = useSelector(selecttimelinePageLoading);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchtimelinePagePosts());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loadingApi && (!posts || posts.length === 0)) {
    return (
      <div className="container text-center py-5">
        <SekeltonFull count={1} layout="mixed" />
      </div>
    );
  }

  if (!posts || posts.length === 0) return null;

  const timeline = posts[0];
  const bgImage = timeline?.featured_image;
  const title = timeline?.title?.rendered || "Timeline";
  const description =
    timeline?.acf?.main_description || "Every space we design carries memory forward — alive with meaning.";

  return (
    <motion.section
      className="row mainbanner"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="col-sm-6">
        {!loading ? (
          <AnimatedText text={title} className="hero-title" />
        ) : (
          <h1 className="hero-title-placeholder" aria-hidden>
            &nbsp;
          </h1>
        )}

        {!loading ? (
          <AnimatedParagraph text={description} className="hero-text" />
        ) : (
          <p className="hero-text-placeholder" aria-hidden>
            &nbsp;
          </p>
        )}

        {!loading && (
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
        )}
      </div>
    </motion.section>
  );
}

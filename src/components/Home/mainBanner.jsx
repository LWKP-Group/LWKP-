"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchhomePagePosts, selecthomePagePosts, selecthomePageLoading } from "@/store/slices/homePageSlice";
import SekeltonFull from "@/components/GlobalCompo/SekeltonFull";
import MaintenanceGuard from "../MaintenanceGuard";

export default function MainBanner() {
  const dispatch = useDispatch();
  const posts = useSelector(selecthomePagePosts);
  const loading = useSelector(selecthomePageLoading);

  useEffect(() => {
    dispatch(fetchhomePagePosts());
  }, [dispatch]);

  if (loading || !posts) {
    return (
      <div className="container text-center py-5">
        <SekeltonFull count={1} layout="mixed" />
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return <MaintenanceGuard posts={posts} />;
  }

  const home = posts[0];
  const bgImage = home?.featured_image;
  const title = home?.title?.rendered || "Home Page";
  const description = home?.acf?.main_text || "Every space we design carries memory forward — alive with meaning.";

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
      <div className="col-sm-5">
        {/* <AnimatedText text={title} className="hero-title" />

        <motion.div className="mt-4" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
          <Link
            href="#"
            onClick={e => {
              e.preventDefault();
              window.scrollBy({
                top: window.innerHeight * 0.5,
                behavior: "smooth"
              });
            }}>
            <Image src={arrow} alt="arrow"  
  loading="lazy" />
          </Link>
        </motion.div> */}
      </div>
    </motion.section>
  );
}

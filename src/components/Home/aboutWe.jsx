"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchhomePagePosts, selecthomePagePosts, selecthomePageLoading } from "@/store/slices/homePageSlice";
import { formatText } from "@/lib/formatText";
import { rowAnim } from "@/lib/animation";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";

export default function AboutWe() {
  const dispatch = useDispatch();

  const post = useSelector(selecthomePagePosts);
  const loading = useSelector(selecthomePageLoading);

  useEffect(() => {
    dispatch(fetchhomePagePosts());
  }, [dispatch]);

  if (loading || !post) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!post.length) {
    return <div className="container text-center py-5">Content not available.</div>;
  }

  const heading = post[0]?.acf?.about_heading || "About Us";
  const description = post[0]?.acf?.about_description || "<p>About content coming soon.</p>";

  return (
    <motion.div
      className="container aboutSection"
      variants={rowAnim}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="row">
        <div className="col-sm-12">
          <p className="sub-heading">About Us</p>

          <h2
            dangerouslySetInnerHTML={{
              __html: formatText(heading),
            }}
          />

          <div
            className="wysiwyg-text"
            dangerouslySetInnerHTML={{
              __html: formatText(description),
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

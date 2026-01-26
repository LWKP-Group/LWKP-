"use client";

import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchstorypagePosts, selectstorypagePosts, selectstorypageLoading } from "@/store/slices/storyPage";
import { motion } from "framer-motion";
import AnimatedSubHeading from "@/components/ReuseableComponent/AnimatedSubHeading";
import { rowAnim } from "@/lib/animation";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";

export default function StoryTagline() {
  const dispatch = useDispatch();

  const post = useSelector(selectstorypagePosts);
  const loading = useSelector(selectstorypageLoading);

  useEffect(() => {
    dispatch(fetchstorypagePosts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!post || post.length === 0) return null;

  const tagline = post[0]?.acf?.tagline || "";

  if (!tagline) return null;

  return (
    <Fragment>
      <motion.div
        className="container story-tagline"
        variants={rowAnim}
        initial="hidden"
        whileInView="show"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="row">
          <div className="col-sm-10">
            <AnimatedSubHeading text={tagline} className="hero-title" />
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
}

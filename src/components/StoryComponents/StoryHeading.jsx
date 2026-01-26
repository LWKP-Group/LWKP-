"use client";

import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchstorypagePosts, selectstorypagePosts, selectstorypageLoading } from "@/store/slices/storyPage";
import { motion } from "framer-motion";
import { rowAnim } from "@/lib/animation";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";

export default function StoryHeading() {
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

  const secondHeading = post[0]?.acf?.second_heading || "";
  const secondDescription = post[0]?.acf?.secong_description || "";

  if (!secondHeading && !secondDescription) return null;

  return (
    <Fragment>
      <motion.div
        className="container story-heading-section"
        id="story-heading"
        variants={rowAnim}
        initial="hidden"
        whileInView="show"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="row">
          <div className="col-sm-7">
            <p className="sub-heading">Stories</p>

            {secondHeading && <h2>{secondHeading}</h2>}

            {secondDescription && (
              <div className="wysiwyg-text" dangerouslySetInnerHTML={{ __html: secondDescription }} />
            )}
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchhomePagePosts, selecthomePagePosts, selecthomePageLoading } from "@/store/slices/homePageSlice";
import { formatText } from "@/lib/formatText";
import { rowAnim } from "@/lib/animation";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";

export default function Recognition() {
  const dispatch = useDispatch();

  const post = useSelector(selecthomePagePosts);
  const loading = useSelector(selecthomePageLoading);

  const [hover, setHover] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

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

  const heading = post[0]?.acf?.recognition_heading || "Recognition";
  const description = post[0]?.acf?.recognition_description || "<p>Recognition content coming soon.</p>";
  const image = post[0]?.acf?.recognition_image;
  const videoURL = post[0]?.acf?.recognition_video || "";

  return (
    <motion.div
      className="container recognition purpose-section"
      variants={rowAnim}
      initial="hidden"
      whileInView="show"
      exit="exit"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="row">
        <div className="col-sm-6 purpose-content">
          <p className="sub-heading">legacy</p>
          <h3
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

        <div
          className="col-sm-6 purpose-media-wrapper"
          onMouseEnter={() => {
            setHover(true);
            setVideoLoaded(false);
          }}
          onMouseLeave={() => {
            setHover(false);
            setVideoLoaded(false);
          }}
        >
          {image ? (
            <motion.img
              src={image}
              alt="Recognition Preview"
              className="purpose-image"
              loading="lazy"
              initial={{ opacity: 1 }}
              animate={{ opacity: hover && videoLoaded ? 0 : 1 }}
              transition={{ duration: 0.5 }}
            />
          ) : (
            <div className="purpose-image">Image not available</div>
          )}

          {hover && videoURL && (
            <motion.div
              className="purpose-video"
              initial={{ opacity: 0 }}
              animate={{ opacity: videoLoaded ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <iframe
                src={`${videoURL}?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&rel=0&loop=1`}
                title="Recognition Video"
                allow="autoplay; encrypted-media"
                onLoad={() => setVideoLoaded(true)}
              ></iframe>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

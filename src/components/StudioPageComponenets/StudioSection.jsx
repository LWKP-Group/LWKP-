"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchstudiopagePosts, selectstudiopagePosts, selectstudiopageLoading } from "@/store/slices/studioPageSlice";
import { formatText } from "@/lib/formatText";
import { rowAnim } from "@/lib/animation";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";

export default function StudioSection() {
  const dispatch = useDispatch();
  const posts = useSelector(selectstudiopagePosts);
  const loading = useSelector(selectstudiopageLoading);

  const [hover, setHover] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchstudiopagePosts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!posts || posts.length === 0) return null;

  const post = posts[0];
  const acf = post?.acf;

  const heading = acf?.second_heading || "Meaning in Making";
  const description =
    acf?.second_description ||
    "Design begins with intent — to create spaces that shape how people live, connect, and thrive.";
  const image = acf?.second_image || "https://via.placeholder.com/800x600";
  const video = acf?.video_link || "";

  return (
    <motion.div
      className="container purpose-section"
      id="studio"
      variants={rowAnim}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="row">
        <div className="col-sm-6 purpose-content">
          <p className="sub-heading">Studio</p>
          <h3>{heading}</h3>
          <div
            className="wysiwyg-text mt-3"
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
          <motion.img
            src={image}
            alt="Studio Preview"
            className="purpose-image"
            initial={{ opacity: 1 }}
            animate={{ opacity: hover && videoLoaded ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          />

          {hover && video && (
            <motion.div
              className="purpose-video"
              initial={{ opacity: 0 }}
              animate={{ opacity: videoLoaded ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <iframe
                src={`${video}?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&rel=0&loop=1&playlist=${video
                  .split("/")
                  .pop()}`}
                title="Studio Hover Video"
                onLoad={() => setVideoLoaded(true)}
                allow="autoplay; encrypted-media"
              ></iframe>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

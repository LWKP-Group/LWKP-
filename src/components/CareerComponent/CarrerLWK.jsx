"use client";

import Image from "next/image";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchcareerPagePosts, selectcareerPagePosts, selectcareerPageLoading } from "@/store/slices/careerPageSlice";
import { motion } from "framer-motion";
import { rowAnim } from "@/lib/animation";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";

export default function CarrerLWK() {
  const dispatch = useDispatch();
  const pageData = useSelector(selectcareerPagePosts);
  const loading = useSelector(selectcareerPageLoading);

  useEffect(() => {
    dispatch(fetchcareerPagePosts());
  }, [dispatch]);

  if (loading || !pageData) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!pageData.length) {
    return <div className="container text-center py-5">Content not available.</div>;
  }

  const mediaHeading = pageData[0]?.acf?.lwk_heading || "Life at LWK";
  const mediaDescription = pageData[0]?.acf?.lwk_description || "<p>Content coming soon.</p>";
  const mediaImage = pageData[0]?.acf?.lwk_image;

  return (
    <Fragment>
      <motion.div
        className="container top-bottom-pad awards lwk-section"
        id="life-at-lwk"
        variants={rowAnim}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="row align-items-center">
          <div className="col-sm-7">
            {mediaImage ? (
              <Image
                src={mediaImage}
                alt={mediaHeading}
                width={800}
                height={600}
                className="img-fluid"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            ) : (
              <div>Image not available.</div>
            )}
          </div>

          <div className="col-sm-5">
            <p className="sub-heading">LWK</p>
            <h3 dangerouslySetInnerHTML={{ __html: mediaHeading }} />
            <div className="wysiwyg-text" dangerouslySetInnerHTML={{ __html: mediaDescription }} />
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
}

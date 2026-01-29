"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchrecognitionPagePosts,
  selectrecognitionPagePosts,
  selectrecognitionPageLoading,
} from "@/store/slices/recognitionPageSlice";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";
import { motion } from "framer-motion";
import { rowAnim } from "@/lib/animation";

export default function RecognitionMedia() {
  const dispatch = useDispatch();
  const pageData = useSelector(selectrecognitionPagePosts);
  const loading = useSelector(selectrecognitionPageLoading);

  useEffect(() => {
    dispatch(fetchrecognitionPagePosts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!pageData || pageData.length === 0) {
    return null;
  }

  const mediaHeading = pageData[0]?.acf?.media_heading || "";
  const mediaDescription = pageData[0]?.acf?.media_description || "";
  const mediaImage = pageData[0]?.acf?.media_image || "";

  if (!mediaHeading && !mediaDescription && !mediaImage) return null;

  return (
    <Fragment>
      <motion.div
        className="container top-bottom-pad awards"
        id="media"
        variants={rowAnim}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="row align-items-center">
          <div className="col-sm-7">
            {mediaImage && (
              <Image
                src={mediaImage}
                alt={mediaHeading || "media Image"}
                width={800}
                height={600}
                className="img-fluid"
                loading="lazy"
              />
            )}
          </div>

          <div className="col-sm-5">
            {mediaHeading && <h2 dangerouslySetInnerHTML={{ __html: mediaHeading }} />}

            {mediaDescription && (
              <div className="wysiwyg-text" dangerouslySetInnerHTML={{ __html: mediaDescription }} />
            )}

            <Link href="/media" className="button-css">
              View media →
            </Link>
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
}

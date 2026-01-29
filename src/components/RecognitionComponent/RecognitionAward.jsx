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

export default function RecognitionAward() {
  const dispatch = useDispatch();
  const pageData = useSelector(selectrecognitionPagePosts);
  const loading = useSelector(selectrecognitionPageLoading);

  useEffect(() => {
    dispatch(fetchrecognitionPagePosts());
  }, [dispatch]);

  if (loading || !pageData || pageData.length === 0) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  const awardHeading = pageData[0]?.acf?.award_heading || "";
  const awardDescription = pageData[0]?.acf?.award_description || "";
  const awardImage = pageData[0]?.acf?.award_image || "";

  return (
    <Fragment>
      <motion.div
        className="container top-bottom-pad awards"
        id="awards"
        variants={rowAnim}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="row align-items-center">
          <div className="col-sm-7">
            {awardImage && (
              <Image
                src={awardImage}
                alt={awardHeading || "Award Image"}
                width={800}
                height={600}
                className="img-fluid"
              />
            )}
          </div>
          <div className="col-sm-5">
            <h2 dangerouslySetInnerHTML={{ __html: awardHeading }} />
            <div className="wysiwyg-text" dangerouslySetInnerHTML={{ __html: awardDescription }} />
            <Link href="/awards" className="button-css">
              View Awards →
            </Link>
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
}

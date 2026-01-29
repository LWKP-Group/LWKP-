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

export default function ReconitionRanking() {
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

  const rankingHeading = pageData[0]?.acf?.ranking_heading || "";
  const rankingDescription = pageData[0]?.acf?.ranking_description || "";
  const rankingImage = pageData[0]?.acf?.ranking_image || "";

  if (!rankingHeading && !rankingDescription && !rankingImage) return null;

  return (
    <Fragment>
      <motion.div
        className="container top-bottom-pad awards recognitions"
        id="ranking"
        variants={rowAnim}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="row align-items-center">
          <div className="col-sm-5">
            {rankingHeading && <h2 dangerouslySetInnerHTML={{ __html: rankingHeading }} />}
            {rankingDescription && (
              <div className="wysiwyg-text" dangerouslySetInnerHTML={{ __html: rankingDescription }} />
            )}
            <Link href="/rankings" className="button-css">
              View rankings →
            </Link>
          </div>

          <div className="col-sm-7">
            {rankingImage && (
              <Image
                src={rankingImage}
                alt={rankingHeading || "ranking Image"}
                width={800}
                height={600}
                className="img-fluid"
                loading="lazy"
              />
            )}
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
}

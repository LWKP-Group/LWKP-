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

import { motion } from "framer-motion";
import { rowAnim } from "@/lib/animation";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";

export default function RecognitionPartner() {
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

  const partnerHeading = pageData[0]?.acf?.partner_heading || "";
  const partnerDescription = pageData[0]?.acf?.partner_description || "";
  const partnerImage = pageData[0]?.acf?.partner_image || "";

  if (!partnerHeading && !partnerDescription && !partnerImage) return null;

  return (
    <Fragment>
      <motion.div
        className="container top-bottom-pad partner awards recognitions"
        id="partnership"
        variants={rowAnim}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="row align-items-center">
          <div className="col-sm-5">
            {partnerHeading && <h2 dangerouslySetInnerHTML={{ __html: partnerHeading }} />}

            {partnerDescription && (
              <div className="wysiwyg-text" dangerouslySetInnerHTML={{ __html: partnerDescription }} />
            )}

            <Link href="/partnership" className="button-css">
              View partners →
            </Link>
          </div>

          <div className="col-sm-7">
            {partnerImage && (
              <Image
                src={partnerImage}
                alt={partnerHeading || "partner Image"}
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

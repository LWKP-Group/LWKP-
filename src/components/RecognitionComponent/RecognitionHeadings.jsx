"use client";

import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchrecognitionPagePosts,
  selectrecognitionPagePosts,
  selectrecognitionPageLoading,
} from "@/store/slices/recognitionPageSlice";
import { formatText } from "@/lib/formatText";
import { motion } from "framer-motion";
import { rowAnim } from "@/lib/animation";

export default function RecognitionHeadings() {
  const dispatch = useDispatch();
  const pageData = useSelector(selectrecognitionPagePosts);
  const loading = useSelector(selectrecognitionPageLoading);

  useEffect(() => {
    dispatch(fetchrecognitionPagePosts());
  }, [dispatch]);

  if (loading || !pageData || pageData.length === 0) {
    return null;
  }

  const secondHeading = pageData[0]?.acf?.second_heading || "";
  const secondDescription = pageData[0]?.acf?.second_description || "";

  if (!secondHeading && !secondDescription) return null;

  return (
    <Fragment>
      <motion.div
        className="container top-pad"
        variants={rowAnim}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="row">
          <div className="col-sm-9">
            <p className="sub-heading">Recognition</p>

            {secondHeading && (
              <h2
                dangerouslySetInnerHTML={{
                  __html: formatText(secondHeading),
                }}
              />
            )}

            {secondDescription && (
              <div
                className="wysiwyg-text"
                dangerouslySetInnerHTML={{
                  __html: formatText(secondDescription),
                }}
              />
            )}
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
}

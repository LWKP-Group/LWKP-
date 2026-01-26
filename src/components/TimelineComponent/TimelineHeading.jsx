"use client";

import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchtimelinePagePosts,
  selecttimelinePagePosts,
  selecttimelinePageLoading,
} from "@/store/slices/timelinePageSlice";
import { formatText } from "@/lib/formatText";
import { motion } from "framer-motion";
import { rowAnim } from "@/lib/animation";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";

export default function TimelineHeading() {
  const dispatch = useDispatch();
  const pageData = useSelector(selecttimelinePagePosts);
  const loading = useSelector(selecttimelinePageLoading);

  useEffect(() => {
    dispatch(fetchtimelinePagePosts());
  }, [dispatch]);

  if (loading && (!pageData || pageData.length === 0)) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!pageData || pageData.length === 0) return null;

  const secondHeading = pageData[0]?.acf?.second_heading || "";
  const seconddescription = pageData[0]?.acf?.second_description || "";

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
            <p className="sub-heading">Contact</p>

            {secondHeading && (
              <h2
                dangerouslySetInnerHTML={{
                  __html: formatText(secondHeading),
                }}
              />
            )}

            {seconddescription && (
              <div
                dangerouslySetInnerHTML={{
                  __html: formatText(seconddescription),
                }}
              />
            )}
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
}

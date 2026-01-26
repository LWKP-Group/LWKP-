"use client";

import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchinsightPagePosts,
  selectinsightPagePosts,
  selectinsightPageLoading,
} from "@/store/slices/insightPageSlice";
import { formatText } from "@/lib/formatText";
import { motion } from "framer-motion";
import { rowAnim } from "@/lib/animation";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";

export default function InsightHeading() {
  const dispatch = useDispatch();
  const pageData = useSelector(selectinsightPagePosts);
  const loading = useSelector(selectinsightPageLoading);

  useEffect(() => {
    dispatch(fetchinsightPagePosts());
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

  const secondHeading = pageData[0]?.acf?.second_heading || "Insights";

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
            <p className="sub-heading">insight</p>
            <h2
              dangerouslySetInnerHTML={{
                __html: formatText(secondHeading),
              }}
            />
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
}

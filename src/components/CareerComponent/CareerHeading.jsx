"use client";

import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchcareerPagePosts, selectcareerPagePosts, selectcareerPageLoading } from "@/store/slices/careerPageSlice";
import { motion } from "framer-motion";
import { rowAnim } from "@/lib/animation";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";
import { formatText } from "@/lib/formatText";

export default function CareerHeading() {
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

  const secondHeading = pageData[0]?.acf?.second_heading || "Careers at Our Studio";

  return (
    <Fragment>
      <motion.div
        className="container top-pad"
        id="career"
        variants={rowAnim}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="row">
          <div className="col-sm-9">
            <p className="sub-heading">career</p>
            <h2 dangerouslySetInnerHTML={{ __html: formatText(secondHeading) }} />
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
}

"use client";

import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchmediaPagePosts, selectmediaPagePosts, selectmediaPageLoading } from "@/store/slices/mediaPageSlice";
import { formatText } from "@/lib/formatText";
import { motion } from "framer-motion";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";
import { rowAnim } from "@/lib/animation";

export default function MediaHeading() {
  const dispatch = useDispatch();
  const pageData = useSelector(selectmediaPagePosts);
  const loading = useSelector(selectmediaPageLoading);
  const lang = useSelector((state) => state.language.currentLanguage);

  useEffect(() => {
    dispatch(fetchmediaPagePosts());
  }, [dispatch, lang]);

  if (loading || !pageData) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!pageData.length) {
    return <div className="container text-center py-5"> </div>;
  }

  const secondHeading = pageData[0]?.acf?.second_heading || "Media";

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
            <p className="sub-heading">{lang === "ch" ? "媒体" : "Media"}</p>
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

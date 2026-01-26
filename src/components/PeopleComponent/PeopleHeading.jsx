"use client";

import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchpeoplePagePosts, selectpeoplePagePosts, selectpeoplePageLoading } from "@/store/slices/peoplePageSlice";
import { formatText } from "@/lib/formatText";
import { motion } from "framer-motion";
import { rowAnim } from "@/lib/animation";
import Image from "next/image";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";

export default function PeopleHeading() {
  const dispatch = useDispatch();
  const pageData = useSelector(selectpeoplePagePosts);
  const loading = useSelector(selectpeoplePageLoading);

  useEffect(() => {
    dispatch(fetchpeoplePagePosts());
  }, [dispatch]);

  if (loading || !pageData || pageData.length === 0) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  const secondHeading = pageData[0]?.acf?.second_heading || "";
  const secondDescription = pageData[0]?.acf?.second_description || "";
  const secondImage = pageData[0]?.acf?.second_image || "";

  return (
    <Fragment>
      <motion.div
        className="container top-pad"
        id="people"
        variants={rowAnim}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="row">
          <div className="col-sm-9">
            <p className="sub-heading">our people</p>

            <h2
              dangerouslySetInnerHTML={{
                __html: formatText(secondHeading),
              }}
            />

            <div
              className="wysiwyg-text"
              dangerouslySetInnerHTML={{
                __html: formatText(secondDescription),
              }}
            />
          </div>
        </div>

        <div className="row teamimage">
          <div className="col-sm-12 peopleimage">
            {secondImage && (
              <Image
                src={secondImage}
                alt="peopleimage"
                width={1400}
                height={700}
                style={{ width: "100%", height: "auto" }}
                loading="lazy"
              />
            )}
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
}

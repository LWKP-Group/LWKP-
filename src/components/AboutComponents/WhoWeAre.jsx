"use client";

import Image from "next/image";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectaboutusPosts, selectaboutusLoading } from "@/store/slices/aboutusSlice";
import { motion } from "framer-motion";
import { rowAnim } from "@/lib/animation";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";

function WhoWeAre() {
  const posts = useSelector(selectaboutusPosts);
  const loading = useSelector(selectaboutusLoading);

  if (loading || !posts) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  const about = posts?.[0];
  if (!about) {
    return <div className="container text-center py-5">Content not available.</div>;
  }

  const heading = about?.acf?.who_we_are_heading || "Who We Are";
  const description = about?.acf?.who_we_are_description || "<p>Information coming soon.</p>";
  const image = about?.acf?.who_we_are_image;

  return (
    <Fragment>
      <motion.div
        className="container whoweare"
        id="who-we-are"
        variants={rowAnim}
        initial="hidden"
        whileInView="show"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="row align-items-center">
          <div className="col-sm-6 whowe">
            <p className="sub-heading">Who We Are</p>
            <h2>{heading}</h2>

            <div className="wysiwyg-text" dangerouslySetInnerHTML={{ __html: description }} />
          </div>

          <div className="col-sm-6">
            {image ? (
              <Image
                src={image}
                alt={heading}
                width={600}
                height={500}
                className="img-fluid who-img"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 600px"
                unoptimized
              />
            ) : (
              <div>Image not available.</div>
            )}
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
}

export default WhoWeAre;

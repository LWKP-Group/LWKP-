"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectaboutusPosts } from "@/store/slices/aboutusSlice";
import { rowAnim } from "@/lib/animation";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";

export default function AboutJourney() {
  const posts = useSelector(selectaboutusPosts);
  const about = posts?.[0];

  if (!posts)
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  if (!about) return <div className="container">Content not available.</div>;

  const heading = about?.acf?.journey_heading || "Our Journey";
  const description = about?.acf?.journey_description || "<p>Journey details coming soon.</p>";
  const image = about?.acf?.journey_image;

  return (
    <Fragment>
      <motion.div
        className="container about-journey-section"
        id="our-journey"
        variants={rowAnim}
        initial="hidden"
        whileInView="show"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="row align-items-center">
          <div className="col-sm-6 journery">
            <p className="sub-heading">Our Journey</p>
            <h2 className="main-heading">{heading}</h2>

            <div className="wysiwyg-text mt-3" dangerouslySetInnerHTML={{ __html: description }} />

            <div className="mt-4">
              <Link href="/our-journey" className="button-css">
                Explore Our Timeline →
              </Link>
            </div>
          </div>

          <div className="col-sm-6">
            {image ? (
              <Image
                src={image}
                alt="Our Journey"
                width={700}
                height={500}
                className="img-fluid journey-img"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 700px"
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

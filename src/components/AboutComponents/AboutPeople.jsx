"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectaboutusPosts } from "@/store/slices/aboutusSlice";
import { rowAnim } from "@/lib/animation";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";

export default function AboutPeople() {
  const posts = useSelector(selectaboutusPosts);
  const about = posts?.[0];

  if (!posts)
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  if (!about) return <div className="container">Content not available.</div>;

  const heading = about?.acf?.people_heading || "Meet the Team";
  const description = about?.acf?.people_description || "<p>Team information coming soon.</p>";
  const image = about?.acf?.people_image;

  return (
    <Fragment>
      <motion.div
        className="container about-people"
        id="our-people"
        variants={rowAnim}
        initial="hidden"
        whileInView="show"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="row align-items-center">
          <div className="col-sm-8">
            <p className="sub-heading">Our People</p>
            <h2 className="main-heading">{heading}</h2>

            <div className="description wysiwyg-text" dangerouslySetInnerHTML={{ __html: description }} />
          </div>

          <div className="col-sm-4 d-flex align-items-start justify-content-end">
            <Link href="/people" className="button-css">
              Meet Our Team →
            </Link>
          </div>

          <div className="col-sm-12 mt-4">
            {image ? (
              <Image
                src={image}
                alt="Our People"
                width={1400}
                height={800}
                className="img-fluid people-img"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 1400px"
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

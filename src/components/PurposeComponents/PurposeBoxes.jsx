"use client";

import Image from "next/image";
import { Fragment } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectpurposePosts } from "@/store/slices/purposeSlice";
import { formatText } from "@/lib/formatText";
import { rowAnim } from "@/lib/animation";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";

export default function PurposeBoxes() {
  const posts = useSelector(selectpurposePosts);
  const acf = posts?.[0]?.acf;

  if (!posts || posts.length === 0 || !acf) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  const data = [
    {
      img: acf?.box_one_image,
      heading: acf?.box_one_heading,
      text: acf?.box_one_text,
    },
    {
      img: acf?.box_two_image,
      heading: acf?.box_two_heading,
      text: acf?.box_two_description,
    },
    {
      img: acf?.box_three_image,
      heading: acf?.box_three_heading,
      text: acf?.box_three_text,
    },
  ];

  return (
    <Fragment>
      <motion.div
        className="container three-boxes"
        id="values"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="row">
          {data.map((item, index) => (
            <motion.div key={index} className="col-sm-4" variants={rowAnim}>
              {item.img && (
                <Image
                  src={item.img}
                  alt={item.heading || "box-image"}
                  width={500}
                  height={400}
                  className="img-fluid"
                  loading="lazy"
                />
              )}
              {item.heading && <h4 className="mt-3">{item.heading}</h4>}

              {item.text && (
                <div
                  className="wysiwyg-text mt-3"
                  dangerouslySetInnerHTML={{
                    __html: formatText(item.text),
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Fragment>
  );
}

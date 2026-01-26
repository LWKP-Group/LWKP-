"use client";

import { Fragment, useEffect } from "react";
import { rowAnim } from "@/lib/animation";
import { fetchcontactusPosts, selectcontactusPosts, selectcontactusLoading } from "@/store/slices/contactUsSlice";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Image from "next/image";
import ContactForm from "./ContactForm";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";

export default function FormAndMap() {
  const dispatch = useDispatch();
  const pageData = useSelector(selectcontactusPosts);
  const loading = useSelector(selectcontactusLoading);

  useEffect(() => {
    dispatch(fetchcontactusPosts());
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

  const mapImage = pageData[0]?.acf?.map_image;

  return (
    <Fragment>
      <motion.div
        className="container top-pad bottom-pad"
        variants={rowAnim}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="row">
          <div className="col-sm-6">
            <ContactForm />
          </div>

          <div className="col-sm-6">
            {mapImage ? (
              <Image
                src={mapImage}
                alt="map"
                width={700}
                height={500}
                className="img-fluid philosophy-img"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 700px"
                unoptimized
              />
            ) : (
              <div>Map image not available.</div>
            )}
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
}

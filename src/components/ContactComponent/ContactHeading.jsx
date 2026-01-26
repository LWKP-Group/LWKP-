"use client";

import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchcontactusPosts, selectcontactusPosts, selectcontactusLoading } from "@/store/slices/contactUsSlice";
import { formatText } from "@/lib/formatText";
import { motion } from "framer-motion";
import { rowAnim } from "@/lib/animation";
import Image from "next/image";
import Envelop from "@/assets/envelop.png";
import Link from "next/link";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";

export default function ContactHeading() {
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

  const secondHeading = pageData[0]?.acf?.contact_heading || "Get in Touch";
  const Businessemail = pageData[0]?.acf?.business_email || "";
  const marketingemail = pageData[0]?.acf?.marketing_email || "";
  const hremail = pageData[0]?.acf?.hr_email || "";

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
            <h2 dangerouslySetInnerHTML={{ __html: formatText(secondHeading) }} />
          </div>
        </div>

        <div className="row rowbox">
          <div className="col-sm-4 mailbox">
            {Businessemail ? (
              <Link href={`mailto:${Businessemail}`}>
                <Image src={Envelop} alt="Envelop" loading="lazy" unoptimized />
                <div className="iconbox-text">
                  <p>Business Enquiries</p>
                  <span>{Businessemail}</span>
                </div>
              </Link>
            ) : (
              <div>Business email not available.</div>
            )}
          </div>

          <div className="col-sm-4 mailbox">
            {marketingemail ? (
              <Link href={`mailto:${marketingemail}`}>
                <Image src={Envelop} alt="Envelop" loading="lazy" unoptimized />
                <div className="iconbox-text">
                  <p>Marketing & Media Enquiries</p>
                  <span>{marketingemail}</span>
                </div>
              </Link>
            ) : (
              <div>Marketing email not available.</div>
            )}
          </div>

          <div className="col-sm-4 mailbox" id="contact-form">
            {hremail ? (
              <Link href={`mailto:${hremail}`}>
                <Image src={Envelop} alt="Envelop" loading="lazy" unoptimized />
                <div className="iconbox-text">
                  <p>Human Resources</p>
                  <span>{hremail}</span>
                </div>
              </Link>
            ) : (
              <div>HR email not available.</div>
            )}
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
}

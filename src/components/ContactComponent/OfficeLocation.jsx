"use client";

import { Fragment, useEffect } from "react";
import { rowAnim } from "@/lib/animation";
import { fetchcontactusPosts, selectcontactusPosts, selectcontactusLoading } from "@/store/slices/contactUsSlice";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";
import { formatText } from "@/lib/formatText";

export default function OfficeLocation() {
  const dispatch = useDispatch();
  const pageData = useSelector(selectcontactusPosts);
  const loading = useSelector(selectcontactusLoading);
  const lang = useSelector((state) => state.language.currentLanguage);

  useEffect(() => {
    dispatch(fetchcontactusPosts());
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

  const acf = pageData[0]?.acf || {};

  // 🔹 Define static city list + acf field mapping
  const locations = [
    {
      city: lang === "ch" ? "香港" : "Hong Kong",
      key: "location_one",
    },
    {
      city: lang === "ch" ? "深圳" : "Shenzhen",
      key: "location_two",
    },
    {
      city: lang === "ch" ? "广州" : "Guangzhou",
      key: "location_three",
    },
    {
      city: lang === "ch" ? "上海" : "Shanghai",
      key: "location_four",
    },
    {
      city: lang === "ch" ? "重庆" : "Chongqing",
      key: "location_five",
    },
    {
      city: lang === "ch" ? "北京" : "Beijing",
      key: "location_six",
    },
    {
      city: lang === "ch" ? "马尼拉" : "Manila",
      key: "location_seven",
    },
    {
      city: lang === "ch" ? "迪拜" : "Dubai",
      key: "location_eight",
    },
    {
      city: lang === "ch" ? "利雅得" : "Riyadh",
      key: "location_nine",
    },
  ];
  return (
    <Fragment>
      <motion.div
        className="container top-pad bottom-pad"
        variants={rowAnim}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="row">
          <div className="col-sm-12 location-heading">
            <h3> {lang === "ch" ? "我们的分支机构" : "Our Locations"}</h3>
          </div>
          {locations.map((loc, index) => (
            <div className="col-sm-4 flipcard" key={index}>
              <div className="flip-card">
                <div className="flip-card-inner">
                  {/* Front */}
                  <div className="flip-card-front">
                    <h4>{loc.city}</h4>
                  </div>

                  {/* Back */}
                  <div className="flip-card-back">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: formatText(acf[loc.key]) || "<p>No details available.</p>",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </Fragment>
  );
}

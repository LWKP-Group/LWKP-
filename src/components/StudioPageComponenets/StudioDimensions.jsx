"use client";

import { Fragment, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProjectTypes, selectProjectTypes, selectProjectTypesLoading } from "@/store/slices/projectTypeSlice";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { rowAnim } from "@/lib/animation";
import { motion } from "framer-motion";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function StudioDimensions() {
  const dispatch = useDispatch();
  const types = useSelector(selectProjectTypes);
  const loading = useSelector(selectProjectTypesLoading);

  useEffect(() => {
    dispatch(fetchProjectTypes());
  }, [dispatch]);

  // ✅ FIXED ORDER (normalized)
  const ORDER = [
    "urban planning & masterplanning",
    "architecture",
    "landscape & public realm",
    "interiors",
    "cross-disciplinary approach",
  ];

  // ✅ NORMALIZE helper
  const normalize = (str = "") => str.toLowerCase().replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

  // ✅ SORTED TYPES
  const sortedTypes = useMemo(() => {
    if (!Array.isArray(types)) return [];

    return [...types].sort((a, b) => {
      const aName = normalize(a?.name);
      const bName = normalize(b?.name);

      const ai = ORDER.indexOf(aName);
      const bi = ORDER.indexOf(bName);

      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    });
  }, [types]);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!sortedTypes.length) return null;

  return (
    <Fragment>
      <motion.div
        id="loactions"
        variants={rowAnim}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="container projects-heading-wrapper" id="practice">
          <div className="row">
            <div className="col-sm-12">
              <p className="sub-heading">Practice</p>
            </div>
            <div className="col-sm-12">
              <h3>Crafted Dimensions</h3>
            </div>
          </div>
        </div>

        <div className="projects-slider-wrapper dimensions">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            loop={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2.5 },
              1200: { slidesPerView: 3.2 },
            }}
            pagination={{ clickable: true }}
            navigation
            className="dimensionsSwiper"
          >
            {sortedTypes.map((type) => (
              <SwiperSlide key={type.id}>
                <motion.div whileHover={{ scale: 0.95 }} transition={{ duration: 0.3 }} className="dimensionslideBox">
                  {type?.acf?.project_type_texanomy_image && (
                    <img
                      src={type.acf.project_type_texanomy_image}
                      alt={type?.name}
                      className="slideImg"
                      loading="lazy"
                    />
                  )}

                  <h4>{type?.name}</h4>

                  <p>
                    {type?.description
                      ?.replace(/<[^>]+>/g, "")
                      .split(" ")
                      .slice(0, 15)
                      .join(" ") || "—"}
                  </p>

                  <Link href={`/projects/type/${type?.slug}`} className="storyLink">
                    <b>EXPLORE →</b>
                  </Link>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.div>
    </Fragment>
  );
}

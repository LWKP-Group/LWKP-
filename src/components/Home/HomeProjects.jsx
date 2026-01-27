"use client";

import { Fragment, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectTypes, selectProjectTypes, selectProjectTypesLoading } from "@/store/slices/projectTypeSlice";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { rowAnim } from "@/lib/animation";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";

export default function ProjectTypeSlider() {
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

  if (loading || !types) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!sortedTypes.length) {
    return <div className="container text-center py-5">Content not available.</div>;
  }

  return (
    <Fragment>
      <motion.div
        variants={rowAnim}
        initial="hidden"
        whileInView="show"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="container projects-heading-wrapper">
          <div className="row">
            <div className="col-sm-12">
              <p className="sub-heading">Studio</p>
            </div>
            <div className="col-sm-12">
              <h3>Crafted Dimensions</h3>
            </div>
          </div>
        </div>

        <div className="projects-slider-wrapper">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            loop={true}
            pagination={{ clickable: true }}
            navigation
            className="projectsSwiper"
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2.5 },
              1200: { slidesPerView: 3.2 },
            }}
          >
            {sortedTypes.map((type) => (
              <SwiperSlide key={type.id}>
                <motion.div whileHover={{ scale: 1.0 }} transition={{ duration: 0.3 }} className="projectSlideBox">
                  {type?.acf?.project_type_texanomy_image ? (
                    <img
                      src={type.acf.project_type_texanomy_image}
                      alt={type?.name || "Project Type"}
                      className="slideImg"
                      loading="lazy"
                    />
                  ) : (
                    <div className="slideImg">Image not available</div>
                  )}

                  <div className="slideOverlay"></div>

                  <div className="slideContent">
                    <Link href={`/projects/type/${type?.slug}`}>
                      <h5
                        dangerouslySetInnerHTML={{
                          __html: type?.name || "Project Type",
                        }}
                      />
                      <p>{type?.description || "—"}</p>
                    </Link>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.div>
    </Fragment>
  );
}

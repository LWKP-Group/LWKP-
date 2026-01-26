"use client";

import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProjectTypes, selectProjectTypes, selectProjectTypesLoading } from "@/store/slices/projectTypeSlice";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { rowAnim } from "@/lib/animation";
import { motion } from "framer-motion";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

export default function StudioDimensions() {
  const dispatch = useDispatch();
  const types = useSelector(selectProjectTypes);
  const loading = useSelector(selectProjectTypesLoading);

  useEffect(() => {
    dispatch(fetchProjectTypes());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!types || types.length === 0) return null;

  return (
    <Fragment>
      <motion.div
        id="loactions"
        variants={rowAnim}
        initial="hidden"
        whileInView="show"
        exit="exit"
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
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2.5,
              },
              1200: {
                slidesPerView: 3.2,
              },
            }}
            pagination={{ clickable: true }}
            navigation={{ clickable: true }}
            className="dimensionsSwiper"
          >
            {types.map((type, index) => (
              <SwiperSlide key={index}>
                <motion.div transition={{ duration: 0.3 }} whileHover={{ scale: 1.05 }} className="dimensionslideBox">
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

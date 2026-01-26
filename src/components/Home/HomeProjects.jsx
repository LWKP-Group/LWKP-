"use client";

import { Fragment, useEffect } from "react";
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

  if (loading || !types) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!types.length) {
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
            navigation={true}
            className="projectsSwiper"
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
          >
            {types.map((type, index) => (
              <SwiperSlide key={index}>
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

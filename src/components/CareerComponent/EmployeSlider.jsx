"use client";

import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchreviewsPosts, selectreviewsPosts, selectreviewsLoading } from "@/store/slices/reviewSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import Image from "next/image";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function EmployeSlider() {
  const dispatch = useDispatch();
  const reviews = useSelector(selectreviewsPosts);
  const loading = useSelector(selectreviewsLoading);

  useEffect(() => {
    dispatch(fetchreviewsPosts());
  }, [dispatch]);

  if (loading || !reviews) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!reviews.length) {
    return <div className="container text-center py-5">Content not available.</div>;
  }

  const quoteone = "https://hostedsitedemo.com/lwkp/wp-content/uploads/2025/12/unnamed-file.png";
  const quotetwo = "https://hostedsitedemo.com/lwkp/wp-content/uploads/2025/12/1.png";

  return (
    <Fragment>
      <div className="projects-slider-wrapper employe-slider">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1.3,
            },
            1200: {
              slidesPerView: 3.2,
            },
          }}
          pagination={{ clickable: true }}
          className="projectsSwiper"
        >
          {reviews.map((review) => {
            const image = review?.featured_image;
            const title = review?.title?.rendered || "Employee";
            const designation = review?.acf?.designation || "";
            const detail = review?.acf?.detail || "";

            return (
              <SwiperSlide key={review.id}>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="reviewSlideBox">
                  <div className="row align-items-start slides-employe">
                    <div className="col-sm-4 left-box">
                      <div className="review-image-wrap">
                        {image ? (
                          <Image
                            src={image}
                            alt={title}
                            width={400}
                            height={400}
                            className="review-image"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, 400px"
                          />
                        ) : (
                          <div>Image not available.</div>
                        )}

                        <div className="review-info-box">
                          <h5 className="review-name">{title}</h5>
                          <h6 className="review-designation">{designation}</h6>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-8 right-box">
                      <p>
                        <Image src={quoteone} alt="quotes" width={100} height={100} loading="lazy" />
                        {detail}
                        <Image src={quotetwo} alt="quotes" width={100} height={100} loading="lazy" />
                      </p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </Fragment>
  );
}

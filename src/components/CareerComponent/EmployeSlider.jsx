"use client";

import { Fragment, useEffect, useMemo } from "react";
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
  const lang = useSelector((state) => state.language.currentLanguage);

  useEffect(() => {
    dispatch(fetchreviewsPosts());
  }, [dispatch, lang]);

  /*
   * Normalize text
   * Removes HTML and makes comparison safer.
   */
  const cleanText = (value = "") => {
    return String(value)
      .replace(/<[^>]*>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&#8217;/g, "'")
      .replace(/&#8211;/g, "-")
      .replace(/&#8212;/g, "—")
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  };

  /*
   * Put Ivan Fu / 符展成 FIRST
   */
  const sortedReviews = useMemo(() => {
    if (!reviews || !reviews.length) {
      return [];
    }

    const targetIndexes = [];

    reviews.forEach((review, index) => {
      const title = cleanText(review?.title?.rendered);
      const designation = cleanText(review?.acf?.designation);

      const isIvan = title === "ivan fu" || title === "符展成";

      const isManagingDirector = designation === "managing director" || designation === "董事总经理";

      if (isIvan || (isManagingDirector && (title === "ivan fu" || title === "符展成"))) {
        targetIndexes.push(index);
      }
    });

    /*
     * If target employee was found,
     * move that exact review to the beginning.
     */
    if (targetIndexes.length > 0) {
      const targetIndex = targetIndexes[0];

      const targetReview = reviews[targetIndex];

      return [targetReview, ...reviews.filter((_, index) => index !== targetIndex)];
    }

    /*
     * Fallback:
     * If the title is different for some reason,
     * search only by designation.
     */
    const fallbackIndex = reviews.findIndex((review) => {
      const designation = cleanText(review?.acf?.designation);

      return designation === "managing director" || designation === "董事总经理";
    });

    if (fallbackIndex !== -1) {
      const targetReview = reviews[fallbackIndex];

      return [targetReview, ...reviews.filter((_, index) => index !== fallbackIndex)];
    }

    return reviews;
  }, [reviews]);

  if (loading || !reviews) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!reviews.length) {
    return <div className="container text-center py-5"></div>;
  }

  const quoteone = "https://staging.lwkp.com/wp-content/uploads/2025/12/unnamed-file.png";

  const quotetwo = "https://staging.lwkp.com/wp-content/uploads/2025/12/1.png";

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
          {sortedReviews.map((review) => {
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

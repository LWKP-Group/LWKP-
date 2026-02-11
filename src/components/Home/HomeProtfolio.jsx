"use client";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchprojectsPosts, selectprojectsPosts, selectprojectsLoading } from "@/store/slices/projectsSlice";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { rowAnim } from "@/lib/animation";

export default function HomePortfolio() {
  const dispatch = useDispatch();
  const posts = useSelector(selectprojectsPosts);
  const loading = useSelector(selectprojectsLoading);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchprojectsPosts());
  }, [dispatch]);

  const filteredPosts =
    posts?.filter((p) =>
      p?.project_category?.some((cat) => cat.slug === "homepage-slider" || cat.slug === "homepgae-slider"),
    ) || [];

  if (loading || !posts) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!filteredPosts.length) {
    return <div className="container text-center py-5">Content not available.</div>;
  }

  return (
    <Fragment>
      <motion.div
        className="portfolio-hero-wrapper"
        variants={rowAnim}
        initial="hidden"
        whileInView="show"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
      >
        <Swiper
          modules={[EffectFade, Navigation, Autoplay]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          slidesPerView={1}
          speed={2500}
          navigation={{ prevEl: ".prevArrow", nextEl: ".nextArrow" }}
          autoplay={{ delay: 4000 }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="portfolioSwiper"
        >
          {filteredPosts.map((post, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="portfolio-bg"
                style={{
                  backgroundImage: post?.featured_image ? `url(${post.featured_image})` : "none",
                }}
              >
                <div className="darkOverlay"></div>

                <div className="container">
                  <div className="row">
                    <div className="col-sm-6">
                      <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={activeIndex === idx ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                        transition={{
                          duration: 0.8,
                          ease: "easeOut",
                        }}
                        className="portfolio-left"
                      >
                        <p className="portfolio-label">PORTFOLIO</p>

                        {/* 🔗 TITLE LINKED TO SINGLE PAGE */}
                        <Link href={`/projects/${post.slug}`}>
                          <h3 className="portfolio-title">{post?.title?.rendered || "Project"}</h3>
                        </Link>
                      </motion.div>
                    </div>

                    <div className="col-sm-6">
                      <div className="portfolio-right">
                        <div className="horizontalBars">
                          {filteredPosts.map((p, barIndex) => (
                            <div key={barIndex} className="hBarWrapper">
                              {activeIndex === barIndex && (
                                <span className="hBarTitle">{p?.project_loaction?.[0]?.name || ""}</span>
                              )}
                              <span className={activeIndex === barIndex ? "hBar hBarActive" : "hBar"}></span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="heroArrows">
          <button className="prevArrow heroArrowBtn">❮</button>
          <button className="nextArrow heroArrowBtn">❯</button>
        </div>
      </motion.div>
    </Fragment>
  );
}

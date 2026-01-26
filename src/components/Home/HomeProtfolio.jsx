"use client";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchprojectsPosts, selectprojectsPosts, selectprojectsLoading } from "@/store/slices/projectsSlice";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation } from "swiper/modules";
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
      p?.project_category?.some((cat) => cat.slug === "homepage-slider" || cat.slug === "homepgae-slider")
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
          modules={[EffectFade, Navigation]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          slidesPerView={1}
          speed={2500}
          navigation={{ prevEl: ".prevArrow", nextEl: ".nextArrow" }}
          autoplay={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="portfolioSwiper"
        >
          {/* STATIC FIRST SLIDE */}
          <SwiperSlide>
            <div
              className="portfolio-bg"
              style={{
                backgroundImage: "url(https://hostedsitedemo.com/lwkp/wp-content/uploads/2026/01/Rectangle-9.png)",
              }}
            >
              <div className="darkOverlay"></div>

              <div className="container">
                <div className="row">
                  <div className="col-sm-6">
                    <motion.div
                      initial={{ opacity: 0, y: 25 }}
                      animate={activeIndex === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="portfolio-left"
                    >
                      <p className="portfolio-label">PORTFOLIO</p>
                      <h3 className="portfolio-title">Living Narratives</h3>
                    </motion.div>
                  </div>

                  <div className="col-sm-6">
                    <div className="portfolio-right">
                      <div className="horizontalBars">
                        <div className="hBarWrapper">
                          <span className="hBarTitle">Living Narratives</span>
                          <span className="hBar hBarActive"></span>
                        </div>

                        {filteredPosts.map((p, barIndex) => (
                          <div key={barIndex} className="hBarWrapper">
                            <span className="hBar"></span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* OTHER DYNAMIC SLIDES */}
          {filteredPosts.map((post, idx) => (
            <SwiperSlide key={idx + 1}>
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
                        animate={activeIndex === idx + 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="portfolio-left"
                      >
                        <p className="portfolio-label">PORTFOLIO</p>
                        <h3 className="portfolio-title">{post?.title?.rendered || "Project"}</h3>
                      </motion.div>
                    </div>

                    <div className="col-sm-6">
                      <div className="portfolio-right">
                        <div className="horizontalBars">
                          {/* STATIC BAR */}
                          <div className="hBarWrapper">
                            {activeIndex === 0 && <span className="hBarTitle">Living Narratives</span>}
                            <span className={activeIndex === 0 ? "hBar hBarActive" : "hBar"}></span>
                          </div>

                          {/* DYNAMIC BARS */}
                          {filteredPosts.map((p, barIndex) => (
                            <div key={barIndex} className="hBarWrapper">
                              {activeIndex === barIndex + 1 && (
                                <span className="hBarTitle">{p?.project_loaction?.[0]?.name || ""}</span>
                              )}
                              <span className={activeIndex === barIndex + 1 ? "hBar hBarActive" : "hBar"}></span>
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

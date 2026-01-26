"use client";

import { Fragment, useMemo, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectaboutusPosts } from "@/store/slices/aboutusSlice";
import { rowAnim } from "@/lib/animation";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";

export default function AboutValues() {
  // --- Hooks must always run ---
  const posts = useSelector(selectaboutusPosts);
  const about = posts?.[0];
  const [activeIndex, setActiveIndex] = useState(0);

  const valueData = useMemo(() => {
    const fields = [
      { text: about?.acf?.value_one, img: about?.acf?.value_one_image },
      { text: about?.acf?.value_two, img: about?.acf?.value_two_image },
      { text: about?.acf?.value_three, img: about?.acf?.value_three_image },
      { text: about?.acf?.value_four, img: about?.acf?.value_four_image },
      { text: about?.acf?.value_five, img: about?.acf?.value_five_image },
      { text: about?.acf?.value_six, img: about?.acf?.value_six_image },
      { text: about?.acf?.value_seven, img: about?.acf?.value_seven_image },
      { text: about?.acf?.value_eight, img: about?.acf?.value_eight_image },
    ];
    return fields.filter((v) => v.text && v.text.trim() !== "");
  }, [about]);

  const sectionHeading = about?.acf?.value_heading || "Our Values";
  const activeImage = valueData?.[activeIndex]?.img;

  const handleWheelBlock = (e) => {
    e.stopPropagation();
  };

  // --- Conditional UI after all hooks ---
  if (!posts) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!about) {
    return <div className="container text-center py-5">Content not available.</div>;
  }

  return (
    <Fragment>
      <motion.div
        className="container-fluid values"
        id="values"
        variants={rowAnim}
        initial="hidden"
        whileInView="show"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="container">
          <div className="row mb-5">
            <div className="col-sm-12">
              <p className="sub-heading">VALUES</p>
              <h2>{sectionHeading}</h2>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-sm-6 change-image">
              {activeImage ? (
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <Image
                    src={activeImage}
                    alt="Value Image"
                    width={700}
                    height={500}
                    className="img-fluid"
                    loading="lazy"
                    unoptimized
                  />
                </motion.div>
              ) : (
                <div>Image not available.</div>
              )}
            </div>

            <div className="col-sm-6 slides" onWheel={handleWheelBlock} style={{ overscrollBehavior: "contain" }}>
              {valueData.length ? (
                <Swiper
                  modules={[Mousewheel]}
                  direction="vertical"
                  breakpoints={{
                    0: { slidesPerView: 3.2 },
                    768: { slidesPerView: 3.2 },
                    1280: { slidesPerView: 4.5 },
                    1366: { slidesPerView: 4.5 },
                    1600: { slidesPerView: 3.2 },
                  }}
                  loop={true}
                  mousewheel={{
                    forceToAxis: true,
                    releaseOnEdges: true,
                  }}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  grabCursor={true}
                  simulateTouch={true}
                  onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                  className="valuesSwiper"
                >
                  {valueData.map((item, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <SwiperSlide key={index}>
                        <motion.div
                          style={{
                            opacity: isActive ? 1 : 0.4,
                            scale: isActive ? 1 : 0.98,
                          }}
                          transition={{ duration: 0.4 }}
                          className="valueBox"
                        >
                          <div className="wysiwyg-text valueContent" dangerouslySetInnerHTML={{ __html: item.text }} />
                        </motion.div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              ) : (
                <div>No values available.</div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
}

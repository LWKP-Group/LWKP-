"use client";

import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStoryCategories,
  selectStoryCategories,
  selectStoryCategoriesLoading,
} from "@/store/slices/storyCategorySlice";

import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { rowAnim } from "@/lib/animation";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";

export default function HomeStories() {
  const dispatch = useDispatch();

  const categories = useSelector(selectStoryCategories);
  const loading = useSelector(selectStoryCategoriesLoading);

  /* Fetch taxonomy once */
  useEffect(() => {
    dispatch(fetchStoryCategories());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return <div className="container text-center py-5">Content not available.</div>;
  }

  return (
    <Fragment>
      <motion.div variants={rowAnim} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }}>
        <div className="container projects-heading-wrapper">
          <div className="row">
            <div className="col-sm-12">
              <p className="sub-heading">stories</p>
              <h3>Beyond the Blueprint</h3>
            </div>
          </div>
        </div>

        <div className="stories-slider-wrapper">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={30}
            pagination={{ clickable: true }}
            navigation
            loop={categories.length > 3.5}
            className="homestoriesSwiper"
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2.5 },
              1200: { slidesPerView: 2.8 },
            }}
          >
            {categories.map((cat, index) => {
              return (
                <SwiperSlide key={cat.id}>
                  <div className={`storyCard ${index % 2 === 0 ? "topCard" : "bottomCard"}`}>
                    <motion.div whileHover={{ scale: 0.98 }}>
                      {cat.image ? (
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          className="storyImg"
                          width={800}
                          height={600}
                          loading="lazy"
                          unoptimized
                        />
                      ) : (
                        <div className="storyImg">Image not available</div>
                      )}
                    </motion.div>

                    <div className="storyContent">
                      <h4>{cat.name}</h4>

                      <Link href={`/stories?category=${cat.slug}`} className="storyLink">
                        <b>VIEW STORY →</b>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </motion.div>
    </Fragment>
  );
}

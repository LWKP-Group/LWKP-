"use client";

import { Fragment, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchstudiolocationPosts,
  selectstudiolocationPosts,
  selectstudiolocationLoading,
} from "@/store/slices/studioSlice";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";
import { rowAnim } from "@/lib/animation";

export default function Homestudiolocation() {
  const dispatch = useDispatch();
  const posts = useSelector(selectstudiolocationPosts);
  const loading = useSelector(selectstudiolocationLoading);

  useEffect(() => {
    dispatch(fetchstudiolocationPosts());
  }, [dispatch]);

  // ✅ FIXED ORDER
  const ORDER = [
    "Hong Kong",
    "Shenzhen",
    "Guangzhou",
    "Shanghai",
    "Chongqing",
    "Beijing",
    "Shenyang",
    "Macau",
    "Manila",
    "Dubai",
    "Riyadh",
  ];

  // ✅ SORTED POSTS (others go last)
  const sortedPosts = useMemo(() => {
    if (!Array.isArray(posts)) return [];

    return [...posts].sort((a, b) => {
      const aTitle = a?.title?.rendered || "";
      const bTitle = b?.title?.rendered || "";

      const ai = ORDER.indexOf(aTitle);
      const bi = ORDER.indexOf(bTitle);

      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    });
  }, [posts]);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!sortedPosts.length) return null;

  return (
    <Fragment>
      <motion.div
        id="loactions"
        variants={rowAnim}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="container projects-heading-wrapper">
          <div className="row">
            <div className="col-sm-12">
              <p className="sub-heading">Locations</p>
            </div>
            <div className="col-sm-12">
              <h3>Our Studio Locations</h3>
            </div>
          </div>
        </div>

        <div className="projects-slider-wrapper locations">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            loop={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2.5 },
              1200: { slidesPerView: 4.2 },
            }}
            pagination={{ clickable: true }}
            navigation
            className="projectsSwiper"
          >
            {sortedPosts.map((post) => (
              <SwiperSlide key={post.id}>
                <motion.div whileHover={{ scale: 0.95 }} transition={{ duration: 0.3 }} className="projectslideBox">
                  <img src={post?.featured_image} alt={post?.title?.rendered} className="slideImg" />
                  <div className="carft-content">
                    <h4>{post?.title?.rendered}</h4>
                    <Link href={`/studio/${post?.slug}`} className="storyLink">
                      <b>VIEW STUDIO →</b>
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

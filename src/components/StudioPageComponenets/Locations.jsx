"use client";

import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchstudiolocationPosts,
  selectstudiolocationPosts,
  selectstudiolocationLoading,
} from "@/store/slices/studioSlice";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
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

  if (loading) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!posts || posts.length === 0) return null;

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
            // autoplay={{
            //   delay: 3000, // 3 seconds per slide
            //   disableOnInteraction: false,
            //   pauseOnMouseEnter: true,
            // }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2.5,
              },
              1200: {
                slidesPerView: 4.2,
              },
            }}
            pagination={{ clickable: true }}
            navigation={{ clickable: true }}
            className="projectsSwiper"
          >
            {posts.map((post) => (
              <SwiperSlide key={post.id}>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="projectslideBox">
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

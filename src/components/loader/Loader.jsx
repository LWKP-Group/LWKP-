"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { finishLoading } from "@/store/slices/loaderSlice";
import Image from "next/image";
import lwkLogo from "@/assets/loader-logo.png";

export default function MainLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";

    const timer = setTimeout(() => {
      dispatch(finishLoading());
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }, 2200);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <AnimatePresence>
      <motion.div
        className="main-loader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <motion.div
          className="loader-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Image src={lwkLogo} alt="LWK" priority className="loader-logo" />

          <div className="loader-line">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 1.8,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
          </div>

          <p className="loader-tagline">Creating Limitless Possibilities</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

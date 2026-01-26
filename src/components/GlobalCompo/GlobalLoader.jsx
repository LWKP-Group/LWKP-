"use client";

import Lottie from "lottie-react";
import loadingAnim from "../../../public/lottie/loader.json";

export default function GlobalLoader({ height = 120 }) {
  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <Lottie animationData={loadingAnim} loop autoplay style={{ height }} />
    </div>
  );
}

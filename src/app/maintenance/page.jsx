"use client";

import Lottie from "lottie-react";
import maintainace from "../../../public/lottie/maintainace.json";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div>
        <div className="d-flex justify-content-center align-items-center py-5">
          <Lottie animationData={maintainace} loop autoplay style={{ width: "100%", height: "100%" }} />
        </div>
      </div>
    </div>
  );
}

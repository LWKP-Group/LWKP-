"use client";
import { Skeleton } from "antd";

export default function ImageSkeleton({ height = 350, radius = 12 }) {
  return (
    <Skeleton.Image
      active
      style={{
        width: "100%",
        height,
        borderRadius: radius
      }}
    />
  );
}

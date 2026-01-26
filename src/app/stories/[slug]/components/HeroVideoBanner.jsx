"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SekeltonFull from "@/components/GlobalCompo/SekeltonFull";
import { limitWords } from "@/lib/shuffleArray";
import { decodeHTML } from "@/lib/formatText";

export default function HeroVideoBanner({ post }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  if (loading || !post) {
    return (
      <div className="container text-center py-5">
        <SekeltonFull count={1} layout="mixed" />
      </div>
    );
  }

  const rawTitle = decodeHTML(post?.title?.rendered || "");
  const title = limitWords(rawTitle, 6);

  /* 🔹 youtube link handling */
  const ytLink = post?.acf?.iframe_youtube_link || "";
  const videoId = ytLink.includes("watch?v=") ? ytLink.split("watch?v=")[1] : ytLink.split("/").pop();
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  /* 🔹 background image optional */
  const bgImage = post?.featured_image || null;

  return (
    <motion.div
      className="col-sm-12 mx-auto position-relative text-white"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      {/* VIDEO */}
      {embedUrl && (
        <div className="mt-4">
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
            <iframe
              src={embedUrl}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "8px",
              }}
            />
          </div>
        </div>
      )}

      {/* Scroll Arrow */}
    </motion.div>
  );
}

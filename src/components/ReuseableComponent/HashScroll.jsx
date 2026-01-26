"use client";

import { useEffect } from "react";

export default function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const el = document.querySelector(hash);
    if (!el) return;

    const timer = setTimeout(() => {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return null;
}

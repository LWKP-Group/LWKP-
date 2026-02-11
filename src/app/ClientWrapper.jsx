"use client";

import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/GlobalCompo/Header";
import Footer from "@/components/GlobalCompo/Footer";
import Loader from "@/components/loader/Loader";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Lenis from "@studio-freight/lenis";
import { initAutoSymbolFont } from "@/lib/autoSymbolFont";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const loading = useSelector((state) => state.loader.loading);

  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  let pageClass = "home";

  if (pathname.startsWith("/career/")) {
    pageClass = "career-single";
  } else {
    pageClass =
      pathname
        ?.replace(/\//g, "-")
        ?.replace(/^-/, "")
        ?.replace(/[^a-zA-Z0-9-_]/g, "") || "home";
  }

  /* Lenis Init (after loader) */
  useEffect(() => {
    if (loading) return;

    lenisRef.current = new Lenis({
      duration: 1.2,
      smooth: true,
      smoothTouch: false,
      wheelMultiplier: 1.2,
      autoResize: true, // important for dynamic height pages
    });

    const raf = (time) => {
      lenisRef.current?.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenisRef.current?.destroy();
    };
  }, [loading]);

  useEffect(() => {
    if (loading) return;

    // slight delay so page + animations render ho chuki hon
    const timeout = setTimeout(() => {
      initAutoSymbolFont();
    }, 100);

    return () => clearTimeout(timeout);
  }, [loading, pathname]);

  return (
    <div className={`${pageClass}`}>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>

      {!loading && (
        <>
          <Header />

          {/* MAIN LENIS WRAPPER */}
          <main id="lenis-scroll-wrapper" className={`container-fluid ${pageClass}`}>
            <AnimatePresence mode="popLayout">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}

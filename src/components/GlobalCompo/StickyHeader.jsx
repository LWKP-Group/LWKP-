"use client";

import Link from "next/link";
import Image from "next/image";
import SmallLOGO from "@/assets/smalllogo.png";
import MainMenu from "./MainMenu.jsx";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function StickyHeader() {
  const loading = useSelector(state => state.loader.loading);
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) setSticky(true);
      else setSticky(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className={`sticky-header ${isSticky ? "fixed" : ""}`}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-3">
              <Link href="/">
                <Image src={SmallLOGO} alt="logo small" />
              </Link>
            </div>

            <div className="col-sm-9 text-end">
              <MainMenu />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StickyHeader;

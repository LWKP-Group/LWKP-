"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { menuConfig } from "./menuConfig";
import Image from "next/image";
import SmallLOGO from "@/assets/smalllogo.png";
import SocialIcons from "./SocialIcons";
import { useSelector } from "react-redux";

const defaultMenu = [{ title: " ", href: "#" }];

export default function MainMenu() {
  const pathname = usePathname();

  const [active, setActive] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const lang = useSelector((state) => state.language.currentLanguage);

  /* BODY SCROLL LOCK */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [mobileOpen]);

  /* MENU DATA */
  let menuData = defaultMenu;

  if (menuConfig[pathname]) {
    menuData = menuConfig[pathname];
  } else if (pathname?.startsWith("/studio/")) {
    const slug = pathname.split("/")[2];
    const dynamicMenu = menuConfig["/studio/[slug]"];
    if (typeof dynamicMenu === "function") {
      menuData = dynamicMenu(slug);
    }
  }

  /* ✅ CHECK IF ANY VALID LINK OR DROPDOWN EXISTS */
  const hasMobileMenu = menuData.some(
    (item) => item && ((item.href && item.href !== "#") || (item.children && item.children.length > 0)),
  );

  return (
    <nav className="mainmenu-container">
      {/* ================= HAMBURGER (MOBILE ONLY CONDITION) ================= */}
      {hasMobileMenu && (
        <button
          className={`hamburger ${mobileOpen ? "active" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      )}

      {/* ================= DESKTOP MENU (UNCHANGED) ================= */}
      <ul className="mainmenu-ul desktop-only">
        {menuData.map((item, index) => (
          <li
            key={index}
            className="mainmenu-li"
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
          >
            <Link href={item.href || "#"} className="mainmenu-link">
              {typeof item.title === "object" ? item.title[lang] : item.title}
            </Link>

            {item.children && active === index && (
              <motion.ul
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="dropdown-menu-custom"
              >
                {item.children.map((child, i) => (
                  <li key={i}>
                    <Link href={child.href} className="dropdown-link">
                      {typeof child.title === "object" ? child.title[lang] : child.title}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </li>
        ))}
      </ul>

      {/* ================= OFFCANVAS MENU ================= */}
      <AnimatePresence>
        {mobileOpen && hasMobileMenu && (
          <>
            <motion.div
              className="offcanvas-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              className="offcanvas-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <div className="small-stick">
                <Image src={SmallLOGO} alt="logo small" />

                <ul className="offcanvas-list">
                  {menuData.map((item, index) => (
                    <li key={index}>
                      {item.children ? (
                        <>
                          <button
                            className="accordion-trigger"
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                          >
                            {typeof item.title === "object" ? item.title[lang] : item.title}
                            <span className={`arrow ${openIndex === index ? "open" : ""}`} />
                          </button>

                          <AnimatePresence>
                            {openIndex === index && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{
                                  height: "auto",
                                  opacity: 1,
                                }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="accordion-content"
                              >
                                {item.children.map((child, i) => (
                                  <li key={i}>
                                    <Link href={child.href} onClick={() => setMobileOpen(false)}>
                                      {typeof child.title === "object" ? child.title[lang] : child.title}
                                    </Link>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link href={item.href} className="direct-link" onClick={() => setMobileOpen(false)}>
                          {item.title}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="copys">
                <p>
                  <b>©</b>{" "}
                  {lang === "ch"
                    ? " 2025 LWK & Partners (HK) Limited。保留所有权利"
                    : " 2025 LWK & Partners (HK) Limited. All Rights Reserved"}{" "}
                  {lang}
                </p>
                <SocialIcons />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

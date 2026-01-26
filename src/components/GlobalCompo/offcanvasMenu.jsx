"use client";

import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Accordion from "react-bootstrap/Accordion";
import Image from "next/image";
import Bar from "@/assets/bar.png";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { parentVariants, itemVariants, submenuParent, submenuItem } from "@/lib/animation";
import { useRouter } from "next/navigation";
import SocialIcons from "./SocialIcons";

export default function OffcanvasMenu() {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(null);

  const router = useRouter();

  const toggle = (key) => {
    setActive(active === key ? null : key);
  };

  const navigateWithDelay = (e, url) => {
    e.preventDefault();
    const scrollY = window.scrollY;
    setShow(false);

    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
      router.push(url);
    });
  };

  return (
    <>
      <button className="menu-btn" onClick={() => setShow(true)}>
        <Image src={Bar} alt="menu" />
      </button>

      <Offcanvas show={show} onHide={() => setShow(false)} placement="end" className="mobile-offcanvas">
        <Offcanvas.Body>
          <AnimatePresence>
            {show && (
              <motion.div variants={parentVariants} initial="hidden" animate="show" exit="hidden">
                <motion.div variants={itemVariants} className="mobile-logo">
                  {/* <Image src={Logo} alt="logo" /> */}
                </motion.div>

                <Accordion activeKey={active} className="mobile-accordion">
                  {/* ABOUT */}
                  <Accordion.Item eventKey="0">
                    <motion.div variants={itemVariants}>
                      <Accordion.Header onClick={() => toggle("0")}>ABOUT US</Accordion.Header>
                    </motion.div>

                    <Accordion.Body>
                      <AnimatePresence>
                        {active === "0" && (
                          <motion.ul
                            key="0sub"
                            variants={submenuParent}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            className="submenu"
                          >
                            <motion.li variants={submenuItem}>
                              <Link href="/about" onClick={(e) => navigateWithDelay(e, "/about")}>
                                About LWKP
                              </Link>
                            </motion.li>

                            <motion.li variants={submenuItem}>
                              <Link href="/people" onClick={(e) => navigateWithDelay(e, "/people")}>
                                Our People
                              </Link>
                            </motion.li>

                            <motion.li variants={submenuItem}>
                              <Link href="/studio" onClick={(e) => navigateWithDelay(e, "/studio")}>
                                Studio at a glance
                              </Link>
                            </motion.li>

                            <motion.li variants={submenuItem}>
                              <Link href="/philosophy" onClick={(e) => navigateWithDelay(e, "/philosophy")}>
                                Philosophy
                              </Link>
                            </motion.li>

                            <motion.li variants={submenuItem}>
                              <Link href="/purpose" onClick={(e) => navigateWithDelay(e, "/purpose")}>
                                Purpose
                              </Link>
                            </motion.li>
                            <motion.li variants={submenuItem}>
                              <Link href="/our-journey" onClick={(e) => navigateWithDelay(e, "/our-journey")}>
                                Our Journey
                              </Link>
                            </motion.li>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* STUDIOS */}
                  <Accordion.Item eventKey="1">
                    <motion.div variants={itemVariants}>
                      <Accordion.Header onClick={() => toggle("1")}>STUDIOS</Accordion.Header>
                    </motion.div>

                    <Accordion.Body>
                      <AnimatePresence>
                        {active === "1" && (
                          <motion.ul
                            key="1sub"
                            variants={submenuParent}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            className="submenu"
                          >
                            <motion.li variants={submenuItem}>
                              <Link href="/stories" onClick={(e) => navigateWithDelay(e, "/stories")}>
                                Stories
                              </Link>
                            </motion.li>

                            <motion.li variants={submenuItem}>
                              <Link href="/projects" onClick={(e) => navigateWithDelay(e, "/projects")}>
                                Portfolio
                              </Link>
                            </motion.li>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* LEGACY */}
                  <Accordion.Item eventKey="2">
                    <motion.div variants={itemVariants}>
                      <Accordion.Header onClick={() => toggle("2")}>LEGACY</Accordion.Header>
                    </motion.div>

                    <Accordion.Body>
                      <AnimatePresence>
                        {active === "2" && (
                          <motion.ul
                            key="2sub"
                            variants={submenuParent}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            className="submenu"
                          >
                            <motion.li variants={submenuItem}>
                              <Link href="/recognition" onClick={(e) => navigateWithDelay(e, "/recognition")}>
                                Recognition
                              </Link>
                            </motion.li>

                            <motion.li variants={submenuItem}>
                              <Link href="/awards" onClick={(e) => navigateWithDelay(e, "/awards")}>
                                Awards
                              </Link>
                            </motion.li>

                            <motion.li variants={submenuItem}>
                              <Link href="/rankings" onClick={(e) => navigateWithDelay(e, "/rankings")}>
                                Rankings
                              </Link>
                            </motion.li>

                            <motion.li variants={submenuItem}>
                              <Link href="/media" onClick={(e) => navigateWithDelay(e, "/media")}>
                                Media Coverage
                              </Link>
                            </motion.li>

                            <motion.li variants={submenuItem}>
                              <Link href="/partnership" onClick={(e) => navigateWithDelay(e, "/partnership")}>
                                Partnerships
                              </Link>
                            </motion.li>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* INSIGHT */}
                  <Accordion.Item eventKey="3">
                    <motion.div variants={itemVariants}>
                      <Accordion.Header onClick={() => toggle("3")}>INSIGHT</Accordion.Header>
                    </motion.div>

                    <Accordion.Body>
                      <AnimatePresence>
                        {active === "3" && (
                          <motion.ul
                            key="3sub"
                            variants={submenuParent}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            className="submenu"
                          >
                            <motion.li variants={submenuItem}>
                              <Link
                                href="/insight#thought_leadership"
                                onClick={(e) => navigateWithDelay(e, "/insight#thought_leadership")}
                              >
                                Thought Leadership
                              </Link>
                            </motion.li>

                            <motion.li variants={submenuItem}>
                              <Link
                                href="/insight#research-publications"
                                onClick={(e) => navigateWithDelay(e, "/insight#research-publications")}
                              >
                                Research & Publications
                              </Link>
                            </motion.li>

                            <motion.li variants={submenuItem}>
                              <Link
                                href="/insight#talks-panels"
                                onClick={(e) => navigateWithDelay(e, "/insight#talks-panels")}
                              >
                                Talks & Panels
                              </Link>
                            </motion.li>

                            <motion.li variants={submenuItem}>
                              <Link href="/insight#newsroom" onClick={(e) => navigateWithDelay(e, "/insight#newsroom")}>
                                Newsroom
                              </Link>
                            </motion.li>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

                {/* STATIC LINKS */}
                <motion.div variants={itemVariants} className="static-links">
                  <Link href="/career" onClick={(e) => navigateWithDelay(e, "/career")}>
                    CAREERS
                  </Link>

                  <Link href="/contact" onClick={(e) => navigateWithDelay(e, "/contact")}>
                    CONTACT
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="row">
            <div className="col-sm-12 offcanvas-footer-copy">
              <p>© 2025 LWK & Partners (HK) Limited. All rights reserved</p>
              <SocialIcons />
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

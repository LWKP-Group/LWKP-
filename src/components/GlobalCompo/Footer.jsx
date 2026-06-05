"use client";
import Image from "next/image";
import Link from "next/link";
import FooterLogo from "@/assets/footerlogo.png";
import Envelop from "@/assets/envelop.png";
import FooterForm from "./FooterForm";
import SocialIcons from "./SocialIcons";
import { Fragment } from "react";
import { useSelector } from "react-redux";

export default function Footer() {
  const lang = useSelector((state) => state.language.currentLanguage);

  return (
    <Fragment>
      <footer id="nextSection">
        <div className="container footer-wrapper">
          <div className="row">
            <div className="col-sm-4 logo-box">
              <Link href="/">
                <Image src={FooterLogo} alt="" />
              </Link>
            </div>

            <div className="col-sm-4">
              <div className="iconbox">
                <Link href="mailto:lwk@lwkp.com">
                  <Image src={Envelop} alt="Envelop" />
                  <div className="iconbox-text">
                    <p> {lang === "ch" ? "商务咨询" : "Business Enquiries"}</p>
                    <span>
                      lwk<span className="symbol-font">@</span>lwkp.com
                    </span>
                  </div>
                </Link>

                <Link href="mailto:marketing@lwkp.com">
                  <Image src={Envelop} alt="Envelop" />
                  <div className="iconbox-text">
                    <p>
                      {lang === "ch" ? (
                        "市场营销与媒体咨询"
                      ) : (
                        <>
                          Marketing{" "}
                          <span className="symbol-font">
                            <b>&</b>
                          </span>{" "}
                          Media Enquiries
                        </>
                      )}
                    </p>
                    <span>
                      marketing<span className="symbol-font">@</span>lwkp.com
                    </span>
                  </div>
                </Link>

                <Link href="mailto:hrmgr@lwkp.com">
                  <Image src={Envelop} alt="Envelop" />
                  <div className="iconbox-text">
                    <p> {lang === "ch" ? "人力资源" : "Human Resources"}</p>
                    <span>
                      hrmgr<span className="symbol-font">@</span>lwkp.com
                    </span>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-sm-4 newsleter-box">
              <FooterForm />
            </div>
          </div>
        </div>

        <div className="container copyright">
          <div className="row">
            <div className="col-sm-9">
              <p>
                <b>©</b>{" "}
                {lang === "ch"
                  ? "2025 LWK & Partners (HK) Limited。保留所有权利。| "
                  : "2025 LWK & Partners (HK) Limited. All Rights Reserved. | "}
                <Link href="https://www.cchengholdings.com/en/home.aspx">
                  {lang === "ch"
                    ? "C Cheng Holdings Limited（港交所股票代码：1486.HK）的成员"
                    : "Member of C Cheng Holdings Limited (HKEX stock code: 1486.HK)"}
                </Link>
              </p>
            </div>

            <div className="col-sm-3">
              <SocialIcons />
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
}

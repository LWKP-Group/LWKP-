"use client";

import { useEffect, useState } from "react";

export default function LanguageToggle() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("lang") || "en";
    setLang(saved);

    if (saved === "ch") {
      switchToChinese(false);
    }
  }, []);

  const setCookie = (value) => {
    document.cookie = `googtrans=${value};path=/`;
    document.cookie = `googtrans=${value};path=/;domain=${window.location.hostname}`;
  };

  const switchToChinese = (save = true) => {
    setCookie("/en/zh-CN");
    const combo = document.querySelector(".goog-te-combo");

    if (combo) {
      combo.value = "zh-CN";
      combo.dispatchEvent(new Event("change"));
    }

    if (save) localStorage.setItem("lang", "ch");
    setLang("ch");
  };

  const switchToEnglish = () => {
    setCookie("/en/en");
    localStorage.setItem("lang", "en");
    setLang("en");
    window.location.reload(); // required for reset
  };

  return (
    <button
      className="notranslate"
      onClick={() => (lang === "en" ? switchToChinese() : switchToEnglish())}
      style={{
        background: "transparent",
        color: "#fff",
        padding: "6px 10px",
        fontSize: "16px",
        letterSpacing: "2px",
        cursor: "pointer",
        marginRight: "15px",
      }}
    >
      EN | CH
    </button>
  );
}

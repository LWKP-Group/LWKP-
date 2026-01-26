"use client";

import { useEffect } from "react";

export default function GoogleTranslator() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Prevent duplicate init
    if (window.__googleTranslateLoaded) return;
    window.__googleTranslateLoaded = true;

    window.googleTranslateElementInit = () => {
      try {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "zh-CN",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      } catch (err) {
        console.warn("Google Translate init failed:", err);
      }
    };

    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return <div id="google_translate_element" style={{ display: "none" }} />;
}

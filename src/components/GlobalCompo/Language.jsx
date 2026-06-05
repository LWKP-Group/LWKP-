"use client";

import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "@/store/languageSlice";

export default function LanguageSwitcher() {
  const dispatch = useDispatch();

  const currentLanguage = useSelector((state) => state.language.currentLanguage);

  return (
    <>
      <span
        onClick={() => dispatch(setLanguage("en"))}
        style={{
          cursor: "pointer",
          fontWeight: currentLanguage === "en" ? "bold" : "normal",
        }}
      >
        EN
      </span>

      {" | "}

      <span
        onClick={() => dispatch(setLanguage("ch"))}
        style={{
          cursor: "pointer",
          fontWeight: currentLanguage === "ch" ? "bold" : "normal",
        }}
      >
        CH
      </span>
    </>
  );
}

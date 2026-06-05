export const getWpLang = (lang) => {
  return lang === "ch" ? "zh-hans" : "en";
};

export const buildWpUrl = (endpoint, lang) => {
  return `${process.env.NEXT_PUBLIC_WP_API}/${endpoint}?lang=${getWpLang(lang)}`;
};

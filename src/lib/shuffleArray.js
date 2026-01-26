export function shuffleArray(array = []) {
  return [...array].sort(() => Math.random() - 0.5);
}

export function limitWords(text = "", limit = 6) {
  if (!text || typeof text !== "string") return "";

  return text
    .replace(/<[^>]*>/g, "") // 🔹 HTML tags remove (safe)
    .trim()
    .split(/\s+/)
    .slice(0, limit)
    .join(" ");
}

export function limitWordsContent(text = "", limit = 25) {
  if (!text || typeof text !== "string") return "";

  return text
    .replace(/<[^>]*>/g, "") // 🔹 HTML tags remove (safe)
    .trim()
    .split(/\s+/)
    .slice(0, limit)
    .join(" ");
}

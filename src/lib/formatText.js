// ⭐ Decode HTML entities (Universal: Server + Client)
export function decodeHTML(str = "") {
  if (!str) return "";

  // If running on server (no DOM available)
  if (typeof document === "undefined") {
    return str
      .replace(/&amp;/g, "&")
      .replace(/&#038;/g, "&")
      .replace(/&#38;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&#8217;/g, "’")
      .replace(/&#8216;/g, "‘")
      .replace(/&#8220;/g, "“")
      .replace(/&#8211;/g, "–") // ⭐ en-dash
      .replace(/&#8221;/g, "”")
      .replace(/&nbsp;/g, " ")
      .replace(/&#160;/g, " ")
      .replace(/&#8230;/g, "…");
  }

  // If running on client (use DOM to decode)
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8211;/g, "–") // ⭐ en-dash
    .replace(/&#160;/g, " ")
    .replace(/&#8230;/g, "…");
}

// ⭐ Format text with decoded HTML + newline support
export function formatText(text = "") {
  if (!text) return "";

  const decoded = decodeHTML(text);

  // Normalize all newlines
  const normalized = decoded.replace(/\r\n|\r/g, "\n");

  // Convert newlines → <br>
  return normalized
    .split("\n\n")
    .map((block) => block.replace(/\n/g, "<br />"))
    .join("<br /><br />");
}

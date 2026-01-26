export function initAutoSymbolFont() {
  if (typeof window === "undefined") return;

  const TARGET_CHARS = new Set(["&", "@"]);

  // --- IMPORTANT: Decode HTML Entities First ---
  function decode(text) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  }

  function wrapTextNode(node) {
    const original = node.nodeValue;
    const decoded = decode(original);

    // Agar decoded mein koi symbol hi nahi hai → skip
    if (![...decoded].some((ch) => TARGET_CHARS.has(ch))) return;

    const frag = document.createDocumentFragment();

    for (const ch of decoded) {
      if (TARGET_CHARS.has(ch)) {
        const span = document.createElement("span");
        span.className = "symbol-font";
        span.textContent = ch;
        frag.appendChild(span);
      } else {
        frag.appendChild(document.createTextNode(ch));
      }
    }

    node.replaceWith(frag);
  }

  function scan(node) {
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {
      acceptNode: (textNode) => {
        const val = textNode.nodeValue;
        if (!val.trim()) return NodeFilter.FILTER_REJECT;

        // Skip already inside symbol-font
        if (textNode.parentNode.closest(".symbol-font")) {
          return NodeFilter.FILTER_REJECT;
        }

        // Check if decoded contains symbols
        const decoded = decode(val);
        if (![...decoded].some((ch) => TARGET_CHARS.has(ch))) {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      },
    });

    let nodeItem;
    while ((nodeItem = walker.nextNode())) {
      wrapTextNode(nodeItem);
    }
  }

  // Initial scan
  scan(document.body);

  // Observe for dynamic content
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const added of m.addedNodes) {
        if (added.nodeType === Node.TEXT_NODE) {
          wrapTextNode(added);
        } else if (added.nodeType === Node.ELEMENT_NODE) {
          scan(added);
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

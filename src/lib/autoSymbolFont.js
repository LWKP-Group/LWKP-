export function initAutoSymbolFont() {
  if (typeof window === "undefined") return;

  const TARGET_CHARS = new Set(["&", "@"]);
  let isRunning = false;

  // Prevent double wrapping
  function alreadyWrapped(node) {
    return node.parentElement?.closest(".symbol-font");
  }

  function wrapTextNode(node) {
    if (!node || alreadyWrapped(node)) return;

    const text = node.nodeValue;
    if (!text) return;

    // Fast skip
    if (![...text].some((ch) => TARGET_CHARS.has(ch))) return;

    const frag = document.createDocumentFragment();

    for (const ch of text) {
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

  function scan(root) {
    if (!root) return;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (textNode) => {
        const val = textNode.nodeValue;

        if (!val || !val.trim()) return NodeFilter.FILTER_REJECT;
        if (alreadyWrapped(textNode)) return NodeFilter.FILTER_REJECT;

        if (![...val].some((ch) => TARGET_CHARS.has(ch))) {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      },
    });

    let current;
    while ((current = walker.nextNode())) {
      wrapTextNode(current);
    }
  }

  // 🔥 Run scan safely (React hydration friendly)
  function run() {
    if (isRunning) return;
    isRunning = true;

    requestAnimationFrame(() => {
      scan(document.body);
      isRunning = false;
    });
  }

  // ✅ Initial scan after hydration
  setTimeout(run, 500);

  // ✅ Observe changes
  const observer = new MutationObserver(() => {
    run();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  // ✅ Also rerun when route changes (Next.js)
  window.addEventListener("popstate", () => {
    setTimeout(run, 300);
  });

  window.addEventListener("pushState", () => {
    setTimeout(run, 300);
  });
}

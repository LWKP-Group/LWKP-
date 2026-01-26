export const rowAnim = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" }
  }
};

// ⭐ Animation for each project card (slide from bottom)
export const cardAnim = {
  hidden: { opacity: 0, y: 25 },
  show: i => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 }
  })
};

/* MAIN STAGGER (logo → accordion rows → static links) */
export const parentVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.1
    }
  }
};

/* Top-level item animation */
export const itemVariants = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: "easeOut" }
  }
};

/* SUBMENU STAGGER */
export const submenuParent = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 }
  }
};

export const submenuItem = {
  hidden: { opacity: 0, x: 25 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.32 }
  }
};

export const container = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      staggerChildren: 0.25,
      delayChildren: 0.2
    }
  },
  exit: {
    opacity: 0.3,
    scale: 0.8,
    transition: { duration: 0.5 }
  }
};

export const itemAnim = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" }
  },
  exit: {
    opacity: 0.3,
    y: -20,
    transition: { duration: 0.6, ease: "easeInOut" }
  }
};

export const imgAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } }
};

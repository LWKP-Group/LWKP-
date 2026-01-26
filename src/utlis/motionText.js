export const parentVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06
    }
  }
};

export const childVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const splitText = text => {
  return text.split("").map((char, i) => ({
    id: i,
    char: char === " " ? "\u00A0" : char
  }));
};

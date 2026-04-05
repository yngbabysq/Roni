export const springPresets = {
  fluidExpand: { type: "spring" as const, stiffness: 400, damping: 30 },
  wobble: { type: "spring" as const, damping: 15 },
  bounce: { type: "spring" as const, damping: 0.7, stiffness: 120 },
  snappy: { type: "spring" as const, stiffness: 500, damping: 40 },
  gentle: { type: "spring" as const, stiffness: 200, damping: 25 },
};

export const transitionVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: springPresets.gentle,
  },
  slideUp: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 8 },
    transition: springPresets.fluidExpand,
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: springPresets.fluidExpand,
  },
};

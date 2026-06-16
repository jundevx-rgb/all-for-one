// Z-index tokens

export const zIndex = {
  hide: -1,
  auto: 0,
  base: 10,
  docked: 20,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
} as const;

export type ZIndexToken = keyof typeof zIndex;

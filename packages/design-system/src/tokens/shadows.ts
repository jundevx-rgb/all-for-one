// Shadow tokens — scale + colored variants

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
} as const;

export const coloredShadows = {
  primary:
    '0 4px 14px 0 rgba(99, 102, 241, 0.39)',
  success:
    '0 4px 14px 0 rgba(34, 197, 94, 0.39)',
  error:
    '0 4px 14px 0 rgba(239, 68, 68, 0.39)',
} as const;

export type ShadowToken = keyof typeof shadows;
export type ColoredShadowToken = keyof typeof coloredShadows;

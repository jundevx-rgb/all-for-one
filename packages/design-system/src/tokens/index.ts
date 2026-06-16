// Design Tokens — unified exports

export {
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacing,
  fontFamilies,
} from './typography';
export type {
  FontSize,
  FontWeight,
  LineHeight,
  LetterSpacing,
  FontFamily,
} from './typography';

export { brand, neutral, semantic, background, surface } from './colors';
export type { ColorScaleType, BackgroundToken, SurfaceToken } from './colors';

export { spacing, section } from './spacing';
export type { SpacingToken, SectionToken } from './spacing';

export { duration, easing } from './motion';
export type { DurationToken, EasingToken } from './motion';

export { radii } from './radii';
export type { RadiusToken } from './radii';

export { shadows, coloredShadows } from './shadows';
export type { ShadowToken, ColoredShadowToken } from './shadows';

export { zIndex } from './z-index';
export type { ZIndexToken } from './z-index';

// ── Unified tokens object ───────────────────────────────────

import { fontSizes, fontWeights, lineHeights, letterSpacing, fontFamilies } from './typography';
import { brand, neutral, semantic, background, surface } from './colors';
import { spacing, section } from './spacing';
import { duration, easing } from './motion';
import { radii } from './radii';
import { shadows, coloredShadows } from './shadows';
import { zIndex } from './z-index';

export const tokens = {
  typography: { fontSizes, fontWeights, lineHeights, letterSpacing, fontFamilies },
  colors: { brand, neutral, semantic, background, surface },
  spacing: { spacing, section },
  motion: { duration, easing },
  radii,
  shadows: { scale: shadows, colored: coloredShadows },
  zIndex,
} as const;

// Animation Components for "All for One"
// Production-grade Framer Motion components — accessible, performant, tree-shakeable

// Reveal
export { RevealOnScroll, StaggerChildren } from './reveal';
export type {
  RevealOnScrollProps,
  RevealAnimation,
  StaggerChildrenProps,
  StaggerDirection,
} from './reveal';

// Scroll
export { ScrollProgress, ScrollReveal } from './scroll';
export type { ScrollProgressProps, ScrollRevealProps, ScrollRevealAnimation } from './scroll';

// Parallax
export { ParallaxLayer, ParallaxGroup } from './parallax';
export type { ParallaxLayerProps, ParallaxGroupProps } from './parallax';

// Mouse Follow
export { MagneticButton, TiltCard, MouseGlow } from './mouse-follow';
export type { MagneticButtonProps, TiltCardProps, MouseGlowProps } from './mouse-follow';

// Text
export { Typewriter, ScrambleText, SplitText } from './text';
export type { TypewriterProps, ScrambleTextProps, SplitTextProps, SplitBy, SplitTextAnimation } from './text';

// Loading
export { Skeleton, Spinner } from './loading';
export type { SkeletonProps, SkeletonVariant, SkeletonAnimation, SpinnerProps } from './loading';

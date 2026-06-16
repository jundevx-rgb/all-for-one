# Design Patterns — All for One

> Recurring design patterns extracted from reference websites, categorized for component development.

## 1. Carousel Patterns

### Native Scroll Carousel (Blossom Carousel)
- **Mechanism**: `overflow-x: auto` + `scroll-snap-type: x mandatory`
- **Advantage**: Zero JS for basic scroll, browser handles momentum/inertia
- **Enhancement**: JS for drag physics, autoplay, pagination dots
- **CSS Properties**: `scroll-snap-align`, `scroll-snap-stop`, `-webkit-overflow-scrolling: touch`
- **Accessibility**: Keyboard arrow navigation, aria-roledescription="carousel"

### Infinite Loop Carousel
- **Mechanism**: Clone first/last items, reset scroll position seamlessly
- **Pattern**: `[clones] [items...] [clones]` → on scroll end, jump to real items
- **Performance**: `will-change: transform` on track, `transform: translateX()` for movement
- **Variants**: Continuous (CSS animation), Physics-based (friction/momentum), Snap-to-item

### 3D Carousel
- **Mechanism**: CSS `transform-style: preserve-3d` + `rotateY` for each item
- **Pattern**: Items arranged in a circle via `rotateY(deg) translateZ(radius)`
- **Interaction**: Drag rotates the entire ring, current item scales up

## 2. Animation Patterns

### Reveal on Scroll
- **Mechanism**: Intersection Observer triggers CSS class or Framer Motion animation
- **Variants**: Fade-up, fade-in, slide-left/right, scale-in, stagger children
- **Performance**: `content-visibility: auto` for off-screen sections
- **Accessibility**: Respect `prefers-reduced-motion: reduce` → show content immediately

### Parallax Systems
- **Layered approach**: Background (slowest) → Content (normal) → Foreground (fastest)
- **Implementation**: `transform: translateY()` based on scroll position
- **Modern**: CSS `animation-timeline: scroll()` for native scroll-driven parallax
- **Performance**: GPU-accelerated transforms only, no `top/left` animation

### Mouse-Follow Effects
- **Pattern**: Track `mousemove` → apply `transform: translate()` to element
- **Use Cases**: Cursor glow, spotlight effect, magnetic buttons, tilt cards
- **Optimization**: Throttle to 60fps via `requestAnimationFrame`, use CSS `transform`
- **Pattern**: Calculate distance from center → apply rotation based on offset

### Text Animations
- **Split text**: Wrap each character/word in span, animate individually
- **Variants**: Typewriter, scramble/decode, wave, gradient shift, glow pulse
- **Performance**: Animate `opacity` and `transform` only
- **Accessibility**: Ensure text is readable without animation

### Loading Animations
- **Types**: Skeleton loaders, spinners, progress bars, morphing shapes
- **Pattern**: Skeleton → fade to content with `transition: opacity`
- **Performance**: Use CSS animations (GPU-accelerated), not JS-driven
- **Accessibility**: `aria-busy="true"` during loading, announce completion

## 3. Transition Patterns

### Page Transitions
- **View Transitions API**: `document.startViewTransition()` for native transitions
- **Fallback**: Framer Motion `AnimatePresence` with exit/enter animations
- **Patterns**: Fade, slide, scale, shared element, dissolve
- **Performance**: Capture screenshot of old page, animate both simultaneously

### Shared Element Transitions
- **Mechanism**: Same element on two pages animates between positions
- **Pattern**: FLIP technique (First, Last, Invert, Play)
- **Implementation**: Framer Motion `layoutId` or View Transitions API `page-transition-tag`
- **Use Cases**: Card → detail view, list → grid, thumbnail → full image

### Micro-Interactions
- **Button hover**: Scale (1.02), shadow increase, color shift
- **Input focus**: Border color, label float, underline expansion
- **Toggle**: Thumb slide with spring physics, color transition
- **Notification badge**: Scale pop-in with spring, pulse animation
- **Tooltip**: Fade + slide from anchor point, origin-aware

## 4. Footer Patterns

### SaaS Footer
- **Structure**: 4-column grid (Brand, Product, Company, Resources)
- **Elements**: Newsletter signup, social links, legal links, language selector
- **Design**: Dark background, white/light text, accent color on hover
- **Pattern**: Large brand mark top-left, link columns, bottom bar with copyright

### Agency Footer
- **Structure**: 2-column asymmetric (large CTA left, links right)
- **Elements**: "Let's work together" CTA, contact info, social links
- **Design**: Bold typography, large spacing, interactive hover effects
- **Pattern**: Full-width, high contrast, prominent call-to-action

### Portfolio Footer
- **Structure**: Minimal (brand, copyright, social links)
- **Elements**: Back-to-top button, current year, social icons
- **Design**: Clean, understated, matches portfolio aesthetic
- **Pattern**: Centered or minimal left-aligned

### Interactive Footer
- **Features**: Animated background, hover effects on links, marquee text
- **Elements**: Scrolling ticker, cursor-following gradient, hover animations
- **Pattern**: Footer as a design statement, not just functional links

## 5. Component Architecture Patterns

### Composition Pattern
```tsx
// Container + Item composition
<Carousel>
  <Carousel.Item>...</Carousel.Item>
  <Carousel.Item>...</Carousel.Item>
</Carousel>
```

### Compound Component Pattern
```tsx
// Sub-components with shared context
<Modal>
  <Modal.Header>...</Modal.Header>
  <Modal.Body>...</Modal.Body>
  <Modal.Footer>...</Modal.Footer>
</Modal>
```

### Render Props Pattern
```tsx
// Flexible rendering
<InView>
  {({ ref, inView }) => (
    <div ref={ref} className={inView ? 'visible' : ''}>
      ...
    </div>
  )}
</InView>
```

### Hook Pattern
```tsx
// Logic separation
const { scrollY, direction } = useScroll();
const { isHovered, handlers } = useHover();
```

## 6. Design System Patterns

### Token Hierarchy
```
Raw tokens → Semantic tokens → Component tokens
#3b82f6    → color.primary    → button.bg.primary
```

### Typography Scale
```
Major third (1.25): 12 → 15 → 19 → 24 → 30 → 37 → 47 → 59 → 74
Perfect fourth (1.333): 12 → 16 → 21 → 28 → 37 → 50 → 67 → 89
```

### Spacing Scale
```
4px base: 0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256
Fibonacci: 0, 4, 8, 12, 20, 32, 52, 84, 136, 220, 356
```

### Motion Duration Scale
```
50ms (micro) → 100ms (fast) → 200ms (normal) → 300ms (slow) → 500ms (deliberate) → 1000ms (dramatic)
```

### Easing Functions
```
ease-out: cubic-bezier(0, 0, 0.2, 1)    — entering
ease-in: cubic-bezier(0.4, 0, 1, 1)     — exiting
ease-in-out: cubic-bezier(0.4, 0, 0.2, 1) — shared
spring: cubic-bezier(0.34, 1.56, 0.64, 1) — bouncy
```

# All for One — Knowledge Base

> Structured knowledge extracted from reference websites for AI-assisted web design.

## Table of Contents
- [Animation Best Practices](#animation)
- [Transition Best Practices](#transitions)
- [Carousel Best Practices](#carousels)
- [Footer Design Patterns](#footers)
- [Accessibility Guidelines](#accessibility)
- [Performance Guidelines](#performance)
- [Design System Architecture](#design-systems)
- [Component Architecture](#component-architecture)

---

## Animation

### Core Principles
1. **Use GPU-accelerated properties**: `transform` and `opacity` only
2. **Respect motion preferences**: Check `prefers-reduced-motion` before animating
3. **Purpose-driven motion**: Every animation should communicate feedback, guidance, or delight
4. **Duration hierarchy**: 50ms (micro) → 100ms (fast) → 200ms (normal) → 500ms (slow) → 1000ms (dramatic)

### Common Easing Functions
- **ease-out**: `cubic-bezier(0, 0, 0.2, 1)` — Elements entering the screen
- **ease-in**: `cubic-bezier(0.4, 0, 1, 1)` — Elements leaving the screen
- **ease-in-out**: `cubic-bezier(0.4, 0, 0.2, 1)` — Shared elements
- **spring**: `cubic-bezier(0.34, 1.56, 0.64, 1)` — Bouncy micro-interactions

### Performance Checklist
- [ ] All animations use `transform` or `opacity`
- [ ] No `width`, `height`, `top`, or `left` animations
- [ ] `will-change` used sparingly on animated elements
- [ ] `prefers-reduced-motion` respected
- [ ] Scroll handlers are passive
- [ ] Animations use `requestAnimationFrame` when JS-driven

---

## Transitions

### View Transitions API Support
- Chrome 111+, Edge 111+, Opera 97+
- Fallback to Framer Motion for older browsers
- Use `page-transition-tag` for shared element transitions
- Always provide fallback for non-supporting browsers

### Transition Duration Guidelines
| Transition | Duration | Easing |
|---|---|---|
| Page change | 300-500ms | ease-in-out |
| Modal open | 200-300ms | ease-out |
| Modal close | 150-200ms | ease-in |
| Dropdown | 150-200ms | ease-out |
| Tooltip | 100-150ms | ease-out |
| Sidebar | 250-300ms | ease-in-out |

---

## Carousels

### Performance Strategy
- Use CSS `scroll-snap-type` for native scroll carousels (zero JS overhead)
- Clone items for infinite loop (first N + last N)
- Use `transform: translateX()` for JS-driven carousels
- Lazy-load images outside viewport (`loading="lazy"`)

### Accessibility Requirements
- `role="region"` on carousel container
- `aria-roledescription="carousel"` for screen readers
- Keyboard navigation: Arrow keys to move, Home/End for first/last
- Pause autoplay on hover/focus
- Provide play/pause controls
- Announce slide changes via `aria-live="polite"`

---

## Footers

### Design Categories
1. **SaaS**: 4-column grid, newsletter, social, bottom legal bar
2. **Agency**: Asymmetric, large CTA, contact info, social
3. **Portfolio**: Minimal, centered, back-to-top
4. **Interactive**: Animated background, cursor effects, marquee

### Common Elements
- Brand logo + name
- Navigation links (grouped by category)
- Social media links
- Newsletter signup
- Copyright notice
- Legal links (Privacy, Terms, Cookies)
- Language selector (optional)

---

## Accessibility

### WCAG 2.2 Key Requirements
- **1.4.3 Contrast**: 4.5:1 for normal text, 3:1 for large text
- **2.1.1 Keyboard**: All interactive elements keyboard accessible
- **2.4.3 Focus Order**: Logical tab order
- **2.4.7 Focus Visible**: Visible focus indicator
- **3.3.2 Labels**: All inputs have labels
- **4.1.2 Name, Role, Value**: ARIA where needed
- **2.2.2 Pause, Stop, Hide**: Controls for auto-moving content
- **2.3.3 Animation from Interactions**: Respect reduced motion

### Component-Specific ARIA
| Component | Role | Key ARIA |
|---|---|---|
| Carousel | region | aria-roledescription="carousel", aria-label |
| Modal | dialog | aria-modal, aria-labelledby, aria-describedby |
| Button | — | aria-disabled, aria-busy (loading) |
| Spinner/Skeleton | status | aria-label, aria-busy |
| Tooltip | tooltip | aria-describedby |
| Tab | tablist/tab/tabpanel | aria-selected, aria-controls |

---

## Performance

### Core Web Vitals
- **LCP** < 2.5s: Optimize hero images, preload critical assets
- **FID** < 100ms: Minimize long tasks, use web workers where possible
- **CLS** < 0.1: Reserve space for dynamic content, specify image dimensions

### Animation Performance
- No layout-thrashing: batch reads and writes
- Use `content-visibility: auto` for off-screen animated sections
- Debounce scroll-driven animations
- Use CSS animations when possible (GPU-accelerated)

---

## Design Systems

### Token Architecture
```
Raw Tokens → Semantic Tokens → Component Tokens
#3b82f6    → color.primary  → button.bg.primary
```

### Essential Token Categories
1. **Typography**: Scale, weights, line heights, letter spacing, font families
2. **Colors**: Brand, neutral, semantic, background, surface
3. **Spacing**: 4px-based scale, section padding
4. **Motion**: Duration scale, easing curves
5. **Radii**: Border-radius scale
6. **Shadows**: Elevation shadow scale
7. **Z-Index**: Layering system

### Typography Scale (Major Third)
12 → 14 → 16 → 18 → 20 → 24 → 30 → 36 → 48 → 60 → 72

---

## Component Architecture

### Best Practices
1. **Tree-shakeable**: Named exports, no side effects
2. **Composition over configuration**: Small, composable primitives
3. **Compound components**: Sub-components share context
4. **Controlled + Uncontrolled**: Support both patterns
5. **Forward ref**: All components support `ref`
6. **Polymorphic**: `as` prop for element type customization
7. **CSS-in-JS or Tailwind**: Avoid global CSS conflicts
8. **Server-compatible**: Components work with SSR (Next.js)

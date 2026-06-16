# Component Taxonomy — All for One

> Classification of all components found across reference websites, organized by category.

## 1. Animation Components (`@all-for-one/animations`)

### Reveal Animations
| Component | Description | Trigger |
|---|---|---|
| `FadeIn` | Simple opacity fade | Intersection Observer |
| `FadeUp` | Fade + slide up | Intersection Observer |
| `FadeDown` | Fade + slide down | Intersection Observer |
| `SlideLeft` | Slide from left | Intersection Observer |
| `SlideRight` | Slide from right | Intersection Observer |
| `ScaleIn` | Scale from 0.8 to 1 | Intersection Observer |
| `RotateIn` | Rotate into view | Intersection Observer |
| `BlurIn` | Blur to sharp | Intersection Observer |
| `FlipIn` | 3D flip into view | Intersection Observer |
| `RevealOnScroll` | Configurable reveal | Intersection Observer |

### Scroll Animations
| Component | Description | Technique |
|---|---|---|
| `ScrollReveal` | Elements reveal on scroll | Intersection Observer |
| `ScrollParallax` | Parallax scrolling effect | Scroll position + transform |
| `ScrollProgress` | Progress indicator | Scroll percentage |
| `ScrollVelocity` | Speed-based distortion | Scroll velocity |
| `ScrollTextSplit` | Text splits on scroll | Scroll position |
| `ScrollNumber` | Animated number counter | Intersection Observer |
| `ScrollTilt` | 3D tilt on scroll | Scroll position + rotation |
| `ScrollPin` | Pin section during scroll | `position: sticky` |

### Parallax Systems
| Component | Description | Technique |
|---|---|---|
| `ParallaxLayer` | Single parallax layer | Scroll-driven transform |
| `ParallaxGroup` | Multiple layers with different speeds | Composed ParallaxLayer |
| `ParallaxHero` | Hero section parallax | Background + content layers |
| `ParallaxImage` | Image parallax with overflow | `overflow: hidden` container |
| `ParallaxText` | Text parallax | Scroll-driven opacity + transform |

### Mouse-Follow Effects
| Component | Description | Technique |
|---|---|---|
| `MouseGlow` | Cursor-following glow | Mouse position + radial gradient |
| `Spotlight` | Spotlight effect | Mouse position + clip-path |
| `MagneticButton` | Button attracts to cursor | Mouse distance + transform |
| `TiltCard` | 3D tilt on hover | Mouse offset + rotateX/Y |
| `CursorTrail` | Trail following cursor | Mouse history + animated dots |
| `FollowElement` | Element follows cursor | Mouse position + spring physics |

### Text Animations
| Component | Description | Technique |
|---|---|---|
| `Typewriter` | Character-by-character reveal | Staggered delay |
| `ScrambleText` | Decode/scramble effect | Random character cycling |
| `WaveText` | Wave animation | Staggered translateY |
| `GradientText` | Animated gradient | Background-position animation |
| `GlowText` | Pulsing glow | Text-shadow animation |
| `SplitText` | Split into characters/words | DOM splitting + stagger |
| `MarqueeText` | Infinite scroll text | CSS animation + duplicate |
| `ShimmerText` | Shimmer sweep effect | Gradient animation |

### Loading Animations
| Component | Description | Technique |
|---|---|---|
| `Skeleton` | Skeleton loader | Pulsing background |
| `Spinner` | Circular spinner | SVG stroke animation |
| `ProgressBar` | Linear progress | Width animation |
| `DotsLoader` | Bouncing dots | Staggered scale animation |
| `MorphLoader` | Shape morphing | SVG path animation |
| `PulseLoader` | Pulsing circles | Scale + opacity animation |

## 2. Transition Components (`@all-for-one/transitions`)

### Page Transitions
| Component | Description | Technique |
|---|---|---|
| `PageFade` | Fade between pages | Framer Motion AnimatePresence |
| `PageSlide` | Slide between pages | Framer Motion x-axis |
| `PageScale` | Scale transition | Framer Motion scale |
| `PageDissolve` | Dissolve with blur | Framer Motion opacity + filter |
| `PageFlip` | Page flip transition | Framer Motion rotateY |
| `PageCube` | 3D cube rotation | Framer Motion 3D transforms |

### Shared Element Transitions
| Component | Description | Technique |
|---|---|---|
| `SharedElement` | Animate shared element | Framer Motion layoutId |
| `SharedImage` | Image expand | Framer Motion layout + scale |
| `SharedCard` | Card to detail | Framer Motion layoutId |
| `SharedTitle` | Title reposition | View Transitions API |

### Route Transitions
| Component | Description | Technique |
|---|---|---|
| `RouteTransition` | Wrapper for route changes | Next.js + Framer Motion |
| `RouteStack` | Stack-based navigation | Framer Motion presence |
| `RouteModal` | Modal as route | Next.js + Framer Motion |

### View Transitions
| Component | Description | Technique |
|---|---|---|
| `ViewTransition` | View Transitions API wrapper | `document.startViewTransition()` |
| `ViewTransitionGroup` | Multiple element transitions | View Transitions API |
| `ViewTransitionImage` | Image transition | `page-transition-tag` |

## 3. Carousel Components (`@all-for-one/carousels`)

### Core Carousels
| Component | Description | Technique |
|---|---|---|
| `InfiniteCarousel` | Infinite loop scroll | Clone items + reset position |
| `ScrollCarousel` | Native scroll carousel | CSS scroll-snap |
| `DragCarousel` | Drag-to-scroll | Pointer events + momentum |
| `AutoCarousel` | Auto-advancing | setInterval + transform |

### Physics Carousels
| Component | Description | Technique |
|---|---|---|
| `PhysicsCarousel` | Physics-based movement | Velocity + friction |
| `MomentumCarousel` | Momentum after release | Velocity tracking |
| `SpringCarousel` | Spring snap to items | Spring physics |
| `ElasticCarousel` | Elastic boundary | Spring + damping |

### 3D Carousels
| Component | Description | Technique |
|---|---|---|
| `Carousel3D` | 3D ring carousel | `preserve-3d` + rotateY |
| `CoverFlow` | CoverFlow-style | rotateY + translateZ |
| `CylinderCarousel` | Cylinder arrangement | rotateY + translateZ per item |
| `SphereCarousel` | Sphere arrangement | rotateX + rotateY |

### Parallax Carousel
| Component | Description | Technique |
|---|---|---|
| `ParallaxCarousel` | Parallax during scroll | Scroll-driven scale/opacity |
| `DepthCarousel` | Depth-based scaling | Distance from center |

### Specialized Carousels
| Component | Description | Use Case |
|---|---|---|
| `TestimonialCarousel` | Testimonial cards | Social proof sections |
| `ProductCarousel` | Product showcase | E-commerce |
| `LogoCarousel` | Client logos | Trust section |
| `ImageCarousel` | Image gallery | Portfolio |
| `CardCarousel` | Card-based content | Feature showcase |

## 4. Footer Components (`@all-for-one/footers`)

### By Style
| Component | Description | Structure |
|---|---|---|
| `SaaSFooter` | SaaS company footer | 4-column grid + newsletter + social |
| `AgencyFooter` | Creative agency footer | Asymmetric 2-column + large CTA |
| `PortfolioFooter` | Portfolio footer | Minimal centered + social |
| `InteractiveFooter` | Interactive footer | Animated background + hover effects |

### By Layout
| Component | Description | Structure |
|---|---|---|
| `GridFooter` | Multi-column grid | 2-6 columns of links |
| `MegaFooter` | Full-width mega | Logo + columns + bottom bar |
| `MinimalFooter` | Simple footer | Copyright + social links |
| `WaveFooter` | Wave-shaped top | SVG wave divider + content |

## 5. Icon System (`@all-for-one/icons`)

### Icon Categories
| Category | Icons |
|---|---|
| Navigation | arrow, chevron, menu, close, home, search |
| Action | plus, minus, check, x, edit, delete, save |
| Social | twitter, github, linkedin, instagram, youtube |
| UI | sun, moon, eye, lock, unlock, heart, star |
| Media | play, pause, volume, music, image, video |
| Business | mail, phone, location, clock, calendar, user |
| Status | success, warning, error, info, loading |

## 6. Design System (`@all-for-one/design-system`)

### Token Categories
| Token Set | Properties |
|---|---|
| Typography | scale, weights, lineHeights, letterSpacing, fontFamily |
| Colors | brand, neutral, semantic, background, surface |
| Spacing | scale, section, component |
| Motion | duration, easing, spring |
| Radii | scale (sm → full) |
| Shadows | scale (sm → 2xl), colored |
| Z-Index | dropdown, sticky, modal, popover, toast |

### Theme Engine
| Theme | Description |
|---|---|
| `lightTheme` | Light mode default |
| `darkTheme` | Dark mode default |
| `createTheme()` | Custom theme factory |
| `ThemeProvider` | React context provider |

# Motion Principles — All for One

> Animation and motion principles extracted from reference websites and industry best practices.

## Disney's 12 Principles (Applied to Web)

### 1. Squash and Stretch
- **Web Application**: Button press effect (scale down on click, bounce back)
- **CSS**: `transform: scale(0.95)` on active, spring back on release
- **Framer Motion**: `whileTap={{ scale: 0.95 }}` with spring transition

### 2. Anticipation
- **Web Application**: Pre-animation hint before main action
- **Example**: Button slightly shrinks before expanding to show content
- **Pattern**: Small reverse movement before primary motion

### 3. Staging
- **Web Application**: Direct attention to the animated element
- **Technique**: Dim surrounding elements, use contrast, isolate the action
- **CSS**: `filter: brightness(0.7)` on non-focused elements

### 4. Straight Ahead vs Pose to Pose
- **Web Application**: Keyframe animation (pose to pose) vs physics simulation (straight ahead)
- **CSS**: `@keyframes` for predetermined motion, JS physics for dynamic

### 5. Follow Through and Overlapping Action
- **Web Application**: Different parts of an element move at different speeds
- **Example**: Modal header appears first, body follows with slight delay
- **Pattern**: Stagger children animations with incremental delays

### 6. Slow In, Slow Out
- **Web Application**: Most web animations use ease-in-out
- **CSS**: `cubic-bezier(0.4, 0, 0.2, 1)` for Material Design standard
- **Principle**: More frames at start and end, fewer in middle

### 7. Arc
- **Web Application**: Elements move in curved paths, not straight lines
- **Implementation**: `offset-path` CSS property, or Framer Motion custom easing
- **Example**: Page transition with arc motion, not linear slide

### 8. Secondary Action
- **Web Application**: Supporting animations that enhance primary motion
- **Example**: Card lifts (primary) → shadow grows (secondary)
- **Pattern**: Always have a secondary effect for important interactions

### 9. Timing
- **Web Application**: Duration determines weight and importance
- **Fast (100ms)**: Micro-interactions, feedback
- **Normal (200ms)**: Standard UI transitions
- **Slow (500ms)**: Page transitions, emphasis
- **Deliberate (1000ms)**: Hero animations, storytelling

### 10. Exaggeration
- **Web Application**: Amplify motion for clarity and delight
- **Example**: Success animation with overshoot (scale to 1.2, settle at 1.0)
- **Principle**: 10-20% exaggeration feels natural, 50%+ feels cartoonish

### 11. Solid Drawing
- **Web Application**: Maintain visual consistency during animation
- **Rule**: Don't change layout properties during animation (causes reflow)
- **Use**: `transform` and `opacity` only for GPU-accelerated animation

### 12. Appeal
- **Web Application**: Animations should feel good and purposeful
- **Rule**: Every animation should have a reason — feedback, guidance, or delight
- **Anti-pattern**: Animation for animation's sake (distracting, unnecessary)

## Modern Web Motion Guidelines

### Performance Rules
1. **Animate transform and opacity only** — these are GPU-composited
2. **Avoid animating layout properties** — width, height, top, left cause reflow
3. **Use will-change sparingly** — hint the browser, but don't overuse
4. **Batch DOM reads and writes** — read all, then write all
5. **Use requestAnimationFrame** — sync with display refresh rate
6. **Debounce scroll handlers** — use `passive: true` for scroll listeners

### Accessibility Rules
1. **Respect prefers-reduced-motion** — disable or simplify animations
2. **Provide pause controls** — for auto-playing animations/carousels
3. **Don't rely on motion alone** — provide visual alternatives
4. **Avoid flashing** — nothing that flashes more than 3 times per second
5. **Announce dynamic changes** — use `aria-live` for screen readers

### Duration Guidelines
| Interaction | Duration | Easing |
|---|---|---|
| Button hover | 100ms | ease-out |
| Button press | 50ms | ease-in |
| Dropdown open | 200ms | ease-out |
| Modal enter | 300ms | ease-out |
| Modal exit | 200ms | ease-in |
| Page transition | 500ms | ease-in-out |
| Scroll reveal | 600ms | ease-out |
| Page load | 800ms | ease-in-out |
| Carousel slide | 400ms | spring |
| Tooltip appear | 150ms | ease-out |
| Tooltip disappear | 100ms | ease-in |

### Easing Functions
```css
/* Standard easings */
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Spring easings */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-spring-gentle: cubic-bezier(0.25, 1, 0.5, 1);
--ease-spring-bounce: cubic-bezier(0.175, 0.885, 0.32, 1.275);

/* Custom easings */
--ease-emphasized: cubic-bezier(0.2, 0, 0, 1);
--ease-emphasized-decelerate: cubic-bezier(0.05, 0.7, 0.1, 1);
--ease-emphasized-accelerate: cubic-bezier(0.3, 0, 0.8, 0.15);
```

### Scroll-Driven Animation
```css
/* Native scroll-driven animation (Chrome 115+) */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.element {
  animation: fade-in linear;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

/* Scroll progress indicator */
.progress-bar {
  animation: grow linear;
  animation-timeline: scroll();
}

@keyframes grow {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
```

### Physics-Based Motion
- **Friction**: Gradual deceleration, `velocity *= 0.95` per frame
- **Spring**: `force = -stiffness * displacement - damping * velocity`
- **Momentum**: Continue movement after drag release, `velocity = delta / dt`
- **Bounce**: Invert velocity on boundary collision, `velocity *= -restitution`

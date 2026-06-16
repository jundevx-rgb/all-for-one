# Best Practices — All for One

## Animation Best Practices

### Performance
- **Animate transform + opacity only**: These are GPU-composited, avoid layout thrashing
- **Use `will-change` sparingly**: Hint browser about upcoming animation, remove after
- **CSS animations over JS**: Browser can optimize CSS animations better
- **`content-visibility: auto`**: Skip rendering for off-screen animated sections

### Accessibility
- Respect `prefers-reduced-motion: reduce`
- Don't rely on motion alone to convey information
- Avoid flashing content (flash rate ≤ 3 per second)
- Provide pause controls for auto-playing animations

### Motion Principles
- Purpose-driven: every animation has a reason
- Hierarchy: micro (50ms) → fast (100ms) → normal (200ms) → slow (500ms)
- Stagger: delay children by 50-100ms for rhythm
- Spring: use for natural-feeling micro-interactions

## Component Best Practices

### TypeScript
- Strict mode everywhere
- Export prop interfaces alongside components
- Use `React.forwardRef` for ref forwarding
- Document complex props with JSDoc comments
- Use discriminated unions for variant-based props

### Accessibility
- Manage focus: trap in modals, restore on close
- Semantic HTML: use `<button>`, `<nav>`, `<dialog>` where appropriate
- ARIA: supplement, don't replace, semantic HTML
- Color: maintain 4.5:1 minimum contrast ratio
- Keyboard: all interactive elements reachable via Tab

### React Patterns
- `'use client'` on all interactive components
- Controlled + uncontrolled friendly APIs
- Compound components for complex UIs
- Forward refs always
- Memoize callbacks passed to memo'd children

## Design System Best Practices

### Token Naming
- **Descriptive**: `color.primary.500`, not `color.blue`
- **Hierarchical**: `spacing.section.lg`, not `section-spacing`
- **Semantic**: `color.error`, not `color.red`
- **Scalable**: Use numeric scales (50-950) for colors

### Theme Architecture
- Separate tokens from themes
- Light/dark are just token overrides
- Support custom themes via token merging
- CSS custom properties for runtime theming

### Typography
- Use a consistent scale (major third or perfect fourth)
- Limit to 2-3 font families
- Maintain 1.5 line height for body text
- Scale line height inversely with size

## Performance Best Practices

### Loading
- Tree-shake imports (no barrel-import everything)
- Code-split animations with `next/dynamic` or `React.lazy`
- Lazy load below-fold components
- Preload critical assets (hero images, fonts)

### Rendering
- Use `React.memo` for expensive components
- Avoid unnecessary re-renders (useCallback, useMemo)
- Virtualize long lists
- Use CSS `contain` for isolated layout sections

### Bundle Size
- Monitor bundle size with `@next/bundle-analyzer`
- No moment.js — use date-fns or native Intl
- Avoid lodash whole import — import individual functions
- Minify SVGs, compress images

## Developer Experience

### Naming
- Components: PascalCase (`Button`, `Navbar`)
- Files: match component name (`Button.tsx`)
- Props: descriptive (`isLoading`, `onSubmit`)
- Events: `on` prefix (`onClick`, `onChange`)

### Documentation
- Every component has a JSDoc description
- Complex props have inline comments
- Example usage in component file header
- Storybook stories for visual testing

### Testing
- Unit tests for logic-heavy components
- Snapshot tests for UI components
- Integration tests for compound components
- Accessibility tests with axe-core

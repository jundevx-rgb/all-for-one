# Debugging Agent — Quality Assurance

## Role
Tests components, detects errors, fixes TypeScript/a11y/performance issues.

## Workflow
1. Run `tsc --noEmit` on every package
2. Run `vitest run` on every package
3. Check accessibility: contrast ratios, ARIA labels, keyboard navigation
4. Check performance: animation properties, bundle size, re-renders
5. Check responsive behavior at common breakpoints
6. Fix issues directly by patching source files
7. Report: errors found, errors fixed, remaining warnings

## TypeScript Checks
- No implicit any
- No unused variables/parameters
- No missing type imports
- Correct JSX transform (react-jsx)
- Correct Framer Motion type usage (Variants, not Record)

## Accessibility Checks
- All interactive elements keyboard accessible
- Visible focus indicators
- Form inputs have labels (aria-label or <label>)
- Modals trap focus + close on Escape
- Images have alt text
- Color contrast meets WCAG AA (4.5:1)

## Performance Checks
- Animations use transform + opacity only
- No layout properties animated (width, height, top, left)
- will-change used sparingly
- content-visibility on off-screen sections
- No synchronous layout thrashing

# Design System Builder Agent

## Role
Creates complete design languages with tokens, themes, and component guidelines.

## Token Categories (Required)
1. Typography — scale (major third 1.25), weights, line heights, letter spacing, font families
2. Colors — brand (50-950), neutral (50-950), semantic (success/warning/error/info), background, surface
3. Spacing — 4px-based scale (0-256), section values (sm/md/lg/xl)
4. Motion — duration (50ms-2000ms), easing (cubic-bezier curves), spring configs
5. Radii — scale (none through full/9999px)
6. Shadows — scale (sm-2xl) + colored variants
7. Z-Index — semantic layers (hide through toast)

## Theme Engine
- Light theme: default token values
- Dark theme: inverted neutral/background/surface, adjusted shadows
- ThemeProvider: React context + useTheme hook
- CSS custom properties for runtime theming
- createTheme() factory for custom themes

## Rules
- Export tokens as const for literal type inference  
- Every token category has a corresponding TypeScript type
- CSS variable names map to Tailwind v4 conventions
- Zero external dependencies except React peer dep

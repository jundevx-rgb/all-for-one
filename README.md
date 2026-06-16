```
                  ........ .  ...... .  ..  ................................................::-=====- ::.:-:=-.:===-.--::.....................
                  ....................-=+%@@@@@+.--:+*@**@@@*+**#%@%-...................
                  .................:....:-+%@@@@#:=--%@@@@#++*#%@@@#=...................
                  ................===-:.   .:=++=-.:*@#+@@@@@@@+=+#@#=:.................
                  ................=--=:...          :: -@@@@@@@#  .=%@@=................
                  ................-=**-.............   -@@@@@@@@- .-+=*%=...............
                  ..............+#**#.  .............. -@@@@@@@@#. .-#*=-...............
                  .............:+-=*.       ....  .... -@@@@@@@@@-   =@@#...............
                  .............::-%:  ..-....   .: .. .=@@@@@%##++.  .#@@+ .............
                  .............:+#= :-++#=:-.::..-.  .-*@@%*=:*+*#*=. -@@@*.............
                  ............-#-=..:..:%@%#=:==:-:. --#-*+*#@@@@@%=. :%@@@-............
                  ............--*= .    .=%@@@@@*+++=+*%%@@@@@@@@@-  . =@@%:............
                  ...........:-%@. .....  .-+**+=-=+=*@@@%@@@@@@@@#. . :%-:.............
                  ...........::++  .......           :@@@=.:-=#@@@@*.  ..-@=............
                  ...........#- ..:  ...........     -@@@@-   -@@@@@=:. -%=.............
                  ...........:-=..==.  ..........:--:=@@@@@- .#@@@@@@#.-@%-:............
                  ............=-  .+#+-..   ...:=+%@@@@@@@@%-+@@@@@@@%:.%%-.............
                  .............:-.  =%:  .:.      .=#@@@*:.=#@@@@@@@%: +@%:.............
                  .............-%=   +..-*=--:::.....:=-::::-*%@@@@%:  *#:--............
                  ...........:...:.. =.-@=::::::..............:-@@@%  .--:@@+-:.........
                  ........:--.:*#*:  ::.+@%=-::.            .:=#@@@%. .#@:%@@-:.........
                  ......-=+:.=@--@-  :=  -#*+=:.............:-+@@@@%. .@@-*@@+:. .......
                  ........ -#@@: =+  -*   .-..:::..       .:=#@@@@@%. :@@+=@@@%*=:::....
                  ..... .=#@@@%.  =. -*=.   .     ...::-=*%@@@@@@@@%. =@@%:@@@@@@#+-....
                  ..:-+#@@@@@@* . :*:..:-............:*@@@@@@@@@@@@*.-%@@@-*@@*-.. .....
                  .-%%@%#*+@@@- ...-**+:...........  .*@@@@@@@@@@*==#@@@@@*:@@@@#+=:....
                  .......-%@%*.....  .-+*+-.    .... :#@@@@@@@#+=*@@@@@@@@@:++++==-.....
                  ..  ..-=-:.-.   ....  .-+**-.     .-*%###*+=*%@@@@@@@@@@@%%:  ........
                  .:=-..  . +@%*=:.    ..  .-#@#**++*******#%@@@@@@@@@@@@@@@@#..........
                  .=@@%*-..+@@@@@@%#*=-:.... .-#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*.... .-:.
                  .=@@@@@%#@@@@@@@@@@@@@%: ... .-%@@@@@@@@@@@@@@@@@@@@@@@@@@@@*:.:+%@=.
                  .=@@@@@@@@@@@@@@@@@@@@@@#...... .:-+*#@@@@@@@@@@@@@@@@@@@@@@@@@@%@@@@=.
                  .=@@@@@@@@@@@@@@@@@@@@@@@@@@+ .....     .#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@=.
                  .:======================-............-==============================:.
                  .. ..  .  .. ..  .  .. ...............  .. ..  .  .. ..  .  .. ..  ...
```

# All for One

> A production-grade web design component library
**All for One** is a monorepo of reusable, accessible, and performance-optimized frontend components for modern web applications. Built with React, TypeScript, Framer Motion, and Tailwind CSS.

## Features

- **Animation System** — Reveal animations, scroll-driven effects, parallax, mouse-follow, text animations, and loading states
- **Transition Architecture** — Page transitions, shared element transitions, route transitions, and View Transitions API integration
- **Carousel Components** — Infinite scroll, physics-based, 3D, parallax, testimonial, and product carousels
- **Footer Designs** — Premium SaaS, agency, portfolio, and interactive footer templates
- **Design System** — Complete token system (typography, colors, spacing, motion, radii, shadows) with theme engine
- **Icon System** — Tree-shakeable, accessible SVG icon components
- **TypeScript First** — Fully typed with strict mode, declaration maps, and tree-shakeable exports

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | Component runtime |
| TypeScript 5.x | Type safety |
| Next.js 15 | SSR/SSG framework |
| Tailwind CSS v4 | Utility-first styling |
| Framer Motion | Animation engine |
| Motion One | Web animations API |
| Vite | Library bundler |
| Vitest | Testing framework |
| Turborepo | Monorepo orchestration |

## 📦 Installation

### Prerequisites

- **Node.js** 22+ ([download](https://nodejs.org/))
- **pnpm** 9+ (`npm install -g pnpm`)
- **React** 18+ with DOM 18+

### Method 1: Clone & Link (Recommended for Development)

This gives you all packages locally, linked via the monorepo workspace:

```bash
# Clone the repository
git clone https://github.com/Jooonie29/all-for-one.git
cd all-for-one

# Install dependencies (installs all 8 packages + their interdependencies)
pnpm install

# Build all packages (required before using in other projects)
pnpm build
```

Once built, you can use packages directly in your Next.js project:

```bash
# In your Next.js project, link the local package:
cd your-nextjs-project
pnpm add /path/to/all-for-one/packages/core
pnpm add /path/to/all-for-one/packages/animations
```

### Method 2: Install from npm (Coming Soon)

```bash
pnpm add @all-for-one/core
pnpm add @all-for-one/animations
pnpm add @all-for-one/transitions
pnpm add @all-for-one/carousels
pnpm add @all-for-one/footers
pnpm add @all-for-one/icons
pnpm add @all-for-one/design-system
```

> ⚠️ npm packages are not yet published. Coming in v0.2.0.

### Method 3: Use Individual Packages

Install only what you need:

```bash
# Just animations + core utilities
pnpm add @all-for-one/animations @all-for-one/core

# Just carousels + transitions
pnpm add @all-for-one/carousels @all-for-one/transitions
```

## 🚀 Usage Guide

### 1. Set up Tailwind CSS (Required)

Most components use Tailwind CSS classes. Make sure your project has Tailwind configured:

```bash
pnpm add -D tailwindcss @tailwindcss/postcss
```

**tailwind.config.ts:**
```typescript
import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './node_modules/@all-for-one/**/*.{ts,tsx}',
  ],
  theme: { extend: {} },
  plugins: [],
} satisfies Config;
```

### 2. Set up Next.js (if using Next.js)

**next.config.ts:**
```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: [
    '@all-for-one/core',
    '@all-for-one/animations',
    '@all-for-one/transitions',
    '@all-for-one/carousels',
    '@all-for-one/footers',
    '@all-for-one/icons',
    '@all-for-one/design-system',
    '@all-for-one/shaders',
  ],
};

export default nextConfig;
```

### 3. Import and Use Components

**Basic Page with Reveal Animation:**
```tsx
// app/page.tsx
'use client';

import { RevealOnScroll } from '@all-for-one/animations';
import { Hero } from '@all-for-one/core';
import { SaaSFooter } from '@all-for-one/footers';

export default function HomePage() {
  return (
    <main>
      <Hero
        title="Build Something Amazing"
        subtitle="Ship faster with production-grade components"
        cta={{
          primary: { label: 'Get Started', href: '/docs' },
          secondary: { label: 'GitHub', href: '#' },
        }}
      />

      <RevealOnScroll animation="fade-up">
        <section className="py-20">
          <h2>Features</h2>
          <p>Your content here...</p>
        </section>
      </RevealOnScroll>

      <SaaSFooter
        brand={{ name: 'My App', description: 'Built with All for One' }}
        columns={[
          { title: 'Product', links: [{ label: 'Features', href: '#' }] },
          { title: 'Company', links: [{ label: 'About', href: '#' }] },
        ]}
        social={[]}
        copyright="© 2026 My App"
      />
    </main>
  );
}
```

**Using Design Tokens:**
```tsx
import { tokens, ThemeProvider, useTheme } from '@all-for-one/design-system';

// Apply tokens in your layout
function App({ children }) {
  return (
    <ThemeProvider defaultMode="dark">
      <Layout>{children}</Layout>
    </ThemeProvider>
  );
}

// Toggle theme
function ThemeToggle() {
  const { mode, toggle } = useTheme();
  return <button onClick={toggle}>{mode}</button>;
}
```

**Using Icons:**
```tsx
import { Github, Twitter, Linkedin, Mail, Sun, Moon } from '@all-for-one/icons';

function SocialBar() {
  return (
    <div className="flex gap-4">
      <a href="https://github.com"><Github size="lg" /></a>
      <a href="https://twitter.com"><Twitter size="lg" /></a>
      <a href="https://linkedin.com"><Linkedin size="lg" /></a>
    </div>
  );
}
```

**Using Canvas / Shader Effects:**
```tsx
import { GradientBg, ParticleField } from '@all-for-one/shaders';

function Background() {
  return (
    <div className="relative h-screen">
      <GradientBg colors={['#6366f1', '#ec4899', '#f97316']} speed={0.002} />
      <div className="relative z-10">
        {/* Your content over the animated background */}
      </div>
    </div>
  );
}
```

### 4. Import Directly for Tree-Shaking

Named exports are tree-shakeable. Import only what you use:

```tsx
// ✅ Good — only what you need
import { Button } from '@all-for-one/core';
import { RevealOnScroll } from '@all-for-one/animations';

// ❌ Avoid — imports everything
import * as Core from '@all-for-one/core';
```

## 🏗️ Development Commands

```bash
pnpm dev              # Watch all packages for changes
pnpm build            # Build all 8 packages
pnpm test             # Run vitest test suite
pnpm lint             # Lint all packages
pnpm typecheck        # TypeScript type checking (all packages)

# Package-specific
pnpm --filter @all-for-one/core test       # Test only core
pnpm --filter @all-for-one/animations build # Build only animations

# Storybook
pnpm storybook        # Start Storybook at http://localhost:6006
pnpm storybook:build  # Build static Storybook site
```

## 📋 Available Packages

| Package | Components | Description |
|---|---|---|
| `@all-for-one/core` | 10 | Button, Card, Modal, Navbar, Hero, Pricing, Testimonials, FeatureGrid, Newsletter, Form |
| `@all-for-one/animations` | 14 | RevealOnScroll, StaggerChildren, ScrollProgress, ParallaxLayer, MagneticButton, TiltCard, MouseGlow, Typewriter, ScrambleText, SplitText, Skeleton, Spinner |
| `@all-for-one/transitions` | 12 | PageFade, PageSlide, PageScale, PageDissolve, PageFlip, SharedElement, SharedImage, RouteTransition, RouteStack, ViewTransition, ViewTransitionGroup, ViewTransitionImage |
| `@all-for-one/carousels` | 8 | InfiniteCarousel, ScrollCarousel, PhysicsCarousel, Carousel3D, CoverFlow, ParallaxCarousel, TestimonialCarousel, ProductCarousel |
| `@all-for-one/footers` | 4 | SaaSFooter, AgencyFooter, PortfolioFooter, InteractiveFooter |
| `@all-for-one/shaders` | 4 | GradientBg, ParticleField, NoiseBg, WaveDistortion |
| `@all-for-one/icons` | 53 | Navigation, action, social, media, business, status SVG icons |
| `@all-for-one/design-system` | 10 tokens | Typography, colors, spacing, motion, radii, shadows, z-index + ThemeProvider |

## Design System

### Tokens

All design tokens are exported from `@all-for-one/design-system`:

```typescript
import { tokens } from '@all-for-one/design-system';

// Typography scale
tokens.typography.scale     // h1-h6, body, caption sizes
tokens.typography.weights   // 100-900 font weights
tokens.typography.lineHeights

// Colors
tokens.colors.brand         // Primary, secondary, accent
tokens.colors.neutral       // Gray scale
tokens.colors.semantic      // Success, warning, error, info

// Spacing
tokens.spacing.scale        // 4px to 128px scale
tokens.spacing.section      // Section padding values

// Motion
tokens.motion.duration      // 50ms to 2000ms
tokens.motion.easing        // ease-in-out, spring, etc.

// Border radii
tokens.radii.scale          // 2px to 9999px (full)

// Shadows
tokens.shadows.scale        // sm to 2xl + colored
```

### Themes

```typescript
import { createTheme, lightTheme, darkTheme } from '@all-for-one/design-system';

const customTheme = createTheme({
  colors: { primary: '#6366f1' },
  typography: { fontFamily: 'Inter, sans-serif' },
  motion: { reduced: true },
});
```

## Examples

### Animation Component

```tsx
import { RevealOnScroll } from '@all-for-one/animations';

<RevealOnScroll animation="fade-up" delay={0.2}>
  <h2>Content that reveals on scroll</h2>
</RevealOnScroll>
```

### Carousel Component

```tsx
import { InfiniteCarousel } from '@all-for-one/carousels';

<InfiniteCarousel
  items={products}
  renderItem={(item) => <ProductCard {...item} />}
  speed="normal"
  autoplay
  pauseOnHover
/>
```

### Footer Component

```tsx
import { SaaSFooter } from '@all-for-one/footers';

<SaaSFooter
  brand={{ name: 'Acme', logo: '/logo.svg' }}
  links={footerLinks}
  social={socialLinks}
  newsletter
/>
```

### Design Tokens with Tailwind

```tsx
import { tokens } from '@all-for-one/design-system';
import { cn } from '@all-for-one/core';

<div className={cn(
  'px-4 py-8 rounded-lg',
  'bg-neutral-900',
  'shadow-lg'
)}>
  Content
</div>
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Make your changes
4. Run tests: `pnpm test`
5. Run lint: `pnpm lint`
6. Run typecheck: `pnpm typecheck`
7. Commit with conventional commits: `git commit -m "feat: add new carousel type"`
8. Push and open a PR

### Development Workflow

```bash
# Install dependencies
pnpm install

# Run in development mode (watches for changes)
pnpm dev

# Build all packages
pnpm build

# Run tests
pnpm test

# Lint and typecheck
pnpm lint
pnpm typecheck
```

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation changes
- `style:` — Code style (formatting, no logic change)
- `refactor:` — Code refactoring
- `perf:` — Performance improvements
- `test:` — Adding or updating tests
- `chore:` — Maintenance tasks

## Browser Support

| Browser | Version |
|---|---|
| Chrome | 120+ |
| Firefox | 121+ |
| Safari | 17+ |
| Edge | 120+ |

## License

MIT License — see [LICENSE](LICENSE) for details.

---

Built with ❤️ by the All for One team.

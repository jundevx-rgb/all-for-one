# All for One — Architecture Guide

## Monorepo Architecture

```
All for One/
├── packages/
│   ├── core/           → @all-for-one/core (UI components + utilities)
│   ├── animations/     → @all-for-one/animations (Framer Motion animations)
│   ├── transitions/    → @all-for-one/transitions (Page transitions)
│   ├── carousels/      → @all-for-one/carousels (Carousel components)
│   ├── footers/        → @all-for-one/footers (Footer templates)
│   ├── icons/          → @all-for-one/icons (SVG icon system)
│   └── design-system/  → @all-for-one/design-system (Tokens + themes)
├── apps/
│   └── docs/           → Documentation site (Next.js)
├── examples/
│   └── demo/           → Demo application
└── config/             → Shared config files
```

## Dependency Graph

```
core (utilities + cn)
  ↓
design-system (tokens + themes)
  ↓
icons ← ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
animations (framer-motion)  │
transitions (framer-motion) │
carousels (framer-motion)   │
footers (tailwind + motion) │
```

## Package API Design

### Naming Convention
- Package name: `@all-for-one/<name>`
- Import path: `@all-for-one/<name>`
- Tree-shakeable: `import { Component } from '@all-for-one/animations/reveal'`

### Export Pattern
```typescript
// Barrel export (src/index.ts)
export * from './components';
export * from './hooks';
export * from './utils';

// Deep import (src/components/index.ts)
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

## Component Design

### Props Interface Pattern
```typescript
interface ComponentProps extends React.HTMLAttributes<HTMLElement> {
  // Required props
  children: React.ReactNode;

  // Optional with defaults
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';

  // Callbacks
  onClick?: () => void;
  onChange?: (value: string) => void;
}
```

### Polymorphic Pattern
```typescript
interface PolymorphicProps<T extends React.ElementType = 'div'> {
  as?: T;
  children: React.ReactNode;
}

type ComponentProps<T extends React.ElementType> =
  PolymorphicProps<T> & React.ComponentPropsWithoutRef<T>;
```

### Compound Pattern
```typescript
// Parent component creates context
const ModalContext = createContext<ModalState>({} as ModalState);

function Modal(props: ModalProps) {
  const [open, setOpen] = useState(false);
  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {props.children}
    </ModalContext.Provider>
  );
}

// Sub-components consume context
Modal.Header = function ModalHeader(props) {
  const { open } = useContext(ModalContext);
  // ...
};

Modal.Body = function ModalBody(props) { /* ... */ };
Modal.Footer = function ModalFooter(props) { /* ... */ };
```

## Build System

### Vite Configuration
```typescript
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'framer-motion', 'next/navigation'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'framer-motion': 'FramerMotion',
        },
      },
    },
  },
});
```

## SSR Compatibility

All components must be compatible with Next.js SSR:
1. Use `'use client'` directive for interactive components
2. Check for `typeof window !== 'undefined'` before DOM access
3. Use Framer Motion's `LazyMotion` for code-splitting
4. Use `next/dynamic` with `ssr: false` when needed

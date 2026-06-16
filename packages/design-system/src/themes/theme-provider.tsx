// Theme Provider — React context, provider component, and useTheme hook

import React, { createContext, useContext, useMemo, useState, useCallback, type ReactNode } from 'react';
import { lightTheme } from './light';
import { darkTheme } from './dark';

// ── Theme type ──────────────────────────────────────────────

export interface Theme {
  name: 'light' | 'dark';
  colors: {
    brand: {
      primary: Record<number, string>;
      secondary: Record<number, string>;
      accent: Record<number, string>;
    };
    neutral: Record<number, string>;
    semantic: {
      success: Record<number, string>;
      warning: Record<number, string>;
      error: Record<number, string>;
      info: Record<number, string>;
    };
    background: {
      page: string;
      surface: string;
      elevated: string;
      overlay: string;
    };
    surface: {
      primary: string;
      secondary: string;
      muted: string;
    };
  };
  typography: {
    fontSizes: Record<string, string>;
    fontWeights: Record<string, number>;
    lineHeights: Record<string, number>;
    letterSpacing: Record<string, string>;
    fontFamilies: {
      sans: string;
      serif: string;
      mono: string;
    };
  };
  spacing: Record<string, string>;
  section: Record<string, string>;
  radii: Record<string, string>;
  shadows: Record<string, string>;
  zIndex: Record<string, number>;
  motion: {
    duration: Record<string, string>;
    easing: Record<string, string>;
  };
}

// ── Context ─────────────────────────────────────────────────

interface ThemeContextValue {
  theme: Theme;
  mode: 'light' | 'dark';
  setMode: (mode: 'light' | 'dark') => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// ── Provider props ──────────────────────────────────────────

interface ThemeProviderProps {
  children: ReactNode;
  defaultMode?: 'light' | 'dark';
}

// ── Provider component ──────────────────────────────────────

export function ThemeProvider({
  children,
  defaultMode = 'light',
}: ThemeProviderProps): React.JSX.Element {
  const [mode, setMode] = useState<'light' | 'dark'>(defaultMode);

  const theme = useMemo(
    () => (mode === 'dark' ? darkTheme : lightTheme),
    [mode],
  );

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, mode, setMode, toggleMode }),
    [theme, mode, setMode, toggleMode],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// ── Hook ────────────────────────────────────────────────────

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

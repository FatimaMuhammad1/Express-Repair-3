import { createContext, useContext, useLayoutEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

function resolveTheme(theme: Theme): "dark" | "light" {
  if (typeof window === "undefined") return "light";

  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  return theme;
}

function applyTheme(theme: Theme) {
  if (typeof window === "undefined") return;

  const root = window.document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolveTheme(theme));
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(storageKey) as Theme | null;
        if (stored) return stored;
      } catch {
        // Ignore localStorage errors
      }
    }
    return defaultTheme;
  });

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    applyTheme(theme);

    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");

    mediaQuery.addEventListener?.("change", onChange);
    return () => mediaQuery.removeEventListener?.("change", onChange);
  }, [theme]);

  const value = {
    theme,
    setTheme: (nextTheme: Theme) => {
      if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        try {
          localStorage.setItem(storageKey, nextTheme);
        } catch {
          // Ignore localStorage errors
        }
      }
      setTheme(nextTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};

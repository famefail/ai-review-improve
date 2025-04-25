"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system" | "blue" | "purple" | "green";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark" | "blue" | "purple" | "green";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);
  const [resolvedTheme, setResolvedTheme] = useState<
    "light" | "dark" | "blue" | "purple" | "green"
  >("light");

  const resolveTheme = (currentTheme: Theme, systemPrefersDark: boolean) => {
    if (currentTheme === "system") {
      return systemPrefersDark ? "dark" : "light";
    }

    return currentTheme as "light" | "dark" | "blue" | "purple" | "green";
  };

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as Theme;

    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = () => {
      const resolved = resolveTheme(theme, mediaQuery.matches);

      setResolvedTheme(resolved);

      document.documentElement.classList.remove(
        "light",
        "dark",
        "blue",
        "purple",
        "green",
      );

      document.documentElement.classList.add(resolved);
    };

    updateTheme();

    // Listen for system preference changes
    mediaQuery.addEventListener("change", updateTheme);

    // Save theme to localStorage
    localStorage.setItem("theme", theme);

    return () => {
      mediaQuery.removeEventListener("change", updateTheme);
    };
  }, [theme, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

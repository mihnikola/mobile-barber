import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";

import { type ColorScheme, type Palette, palettes } from "./colors";

/** What the user picked in Profile → Theme. */
export type ThemeMode = "system" | "light" | "dark";

const STORAGE_KEY = "themeMode";
/**
 * Default until the redesign is complete (Phase 5): "dark" keeps today's look for everyone.
 * Switches to "system" (design default = light) when all screens are restyled.
 */
export const DEFAULT_THEME_MODE: ThemeMode = "dark";

type ThemeValue = {
  /** Effective scheme after resolving "system". */
  scheme: ColorScheme;
  colors: Palette;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeValue>({
  scheme: "dark",
  colors: palettes.dark,
  mode: DEFAULT_THEME_MODE,
  setMode: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const system = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>(DEFAULT_THEME_MODE);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (stored === "system" || stored === "light" || stored === "dark") setModeState(stored);
      })
      .catch(() => {});
  }, []);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
  }, []);

  const value = useMemo<ThemeValue>(() => {
    const scheme: ColorScheme = mode === "system" ? (system === "light" ? "light" : "dark") : mode;
    return { scheme, colors: palettes[scheme], mode, setMode };
  }, [mode, system, setMode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/** Current palette + scheme + the user's theme mode. */
export const useTheme = () => useContext(ThemeContext);

/**
 * Theme-aware StyleSheet: `const useStyles = makeStyles((colors) => ({ ... }))` at module level,
 * `const styles = useStyles()` inside the component. One StyleSheet per palette (cached).
 */
/** Same constraint StyleSheet.create uses (RN 0.88 has no public NamedStyles type). */
type StylesInput = Parameters<typeof StyleSheet.create>[0];

export function makeStyles<S extends StylesInput>(factory: (colors: Palette) => S) {
  const cache = new Map<Palette, Readonly<S>>();
  return function useStyles(): Readonly<S> {
    const { colors } = useTheme();
    let sheet = cache.get(colors);
    if (!sheet) {
      sheet = StyleSheet.create(factory(colors)) as Readonly<S>;
      cache.set(colors, sheet);
    }
    return sheet;
  };
}

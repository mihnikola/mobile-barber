import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import type { StyleProp, TextStyle } from "react-native";

import { type ColorToken, useTheme } from "@/theme";

/**
 * Feather = the design system line style (Lucide predecessor, D-024); FontAwesome only for filled
 * rating stars; Ionicons only for the sparkle (Atelier booking icon — Feather has none).
 */
const FAMILIES = { Feather, FontAwesome, Ionicons } as const;
type Family = keyof typeof FAMILIES;

/**
 * Semantic icon names → [icon family, glyph].
 * Phase 5.3: all line icons are Feather (design system style). Duplicate names (home/homeAlt …)
 * now point to the same glyph and can be merged when screens are restyled.
 */
const REGISTRY = {
  back: ["Feather", "chevron-left"],
  arrowRight: ["Feather", "arrow-right"],
  chevronRight: ["Feather", "chevron-right"],
  chevronRightThin: ["Feather", "chevron-right"],
  close: ["Feather", "x"],
  windowClose: ["Feather", "x-square"],
  check: ["Feather", "check-circle"],
  circle: ["Feather", "circle"],
  info: ["Feather", "info"],
  question: ["Feather", "help-circle"],
  clock: ["Feather", "clock"],
  price: ["Feather", "tag"],
  star: ["Feather", "star"],
  // rating needs a filled vs. empty star; Feather only has an outline → FontAwesome
  starSolid: ["FontAwesome", "star"],
  starOutline: ["FontAwesome", "star-o"],
  trophy: ["Feather", "award"],
  person: ["Feather", "user"],
  personCircle: ["Feather", "user"],
  photo: ["Feather", "image"],
  camera: ["Feather", "camera"],
  eye: ["Feather", "eye"],
  eyeOff: ["Feather", "eye-off"],
  email: ["Feather", "mail"],
  phone: ["Feather", "phone"],
  pencil: ["Feather", "edit-2"],
  home: ["Feather", "home"],
  homeAlt: ["Feather", "home"],
  calendar: ["Feather", "calendar"],
  calendarMonth: ["Feather", "calendar"],
  locationArrow: ["Feather", "navigation"],
  locationDot: ["Feather", "map-pin"],
  scissors: ["Feather", "scissors"],
  sparkle: ["Ionicons", "sparkles-outline"],
  services: ["Feather", "settings"],
  wifiOff: ["Feather", "wifi-off"],
  // settings menu
  translate: ["Feather", "globe"],
  theme: ["Feather", "moon"],
  contacts: ["Feather", "users"],
  support: ["Feather", "help-circle"],
  document: ["Feather", "file-text"],
  logout: ["Feather", "log-out"],
} as const satisfies Record<string, readonly [Family, string]>;

export type IconName = keyof typeof REGISTRY;

/** Sizes used across the app. Exact numbers are still allowed for one-offs. */
export const iconSize = { xs: 16, sm: 20, md: 24, lg: 28, xl: 32, xxl: 64 } as const;

export type IconProps = {
  /**
   * Falsy = empty placeholder of the same size (e.g. `name={selected && "check"}`), exactly like
   * vector-icons render an empty glyph for a falsy name — keeps row layout stable.
   */
  name: IconName | false | null | undefined;
  size?: keyof typeof iconSize | number;
  /** Color token (default `text`). Use `rawColor` only for values outside the theme. */
  color?: ColorToken;
  rawColor?: string;
  style?: StyleProp<TextStyle>;
  testID?: string;
};

/** One icon component for the whole app (replaces direct use of 5 icon libraries). */
export function Icon({ name, size = "md", color = "ink", rawColor, style, testID }: IconProps) {
  const { colors } = useTheme();
  const [family, glyph]: readonly [Family, string | undefined] = name ? REGISTRY[name] : ["Feather", undefined];
  const Component = FAMILIES[family] as React.ComponentType<{
    name?: string;
    size: number;
    color: string;
    style?: StyleProp<TextStyle>;
    testID?: string;
  }>;
  return (
    <Component
      name={glyph}
      size={typeof size === "number" ? size : iconSize[size]}
      color={rawColor ?? colors[color]}
      style={style}
      testID={testID}
    />
  );
}

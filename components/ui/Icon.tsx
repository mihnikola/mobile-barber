import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import type { StyleProp, TextStyle } from "react-native";

import { type ColorToken, useTheme } from "@/theme";

const FAMILIES = { FontAwesome, FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons } as const;
type Family = keyof typeof FAMILIES;

/**
 * Semantic icon names → [icon family, glyph].
 * Phase 2 keeps every glyph exactly as today, so a few concepts exist in two
 * families (e.g. `home` vs `homeAlt`); they are unified in Phase 5.
 */
const REGISTRY = {
  back: ["MaterialIcons", "arrow-back"],
  chevronRight: ["FontAwesome", "chevron-right"],
  chevronRightThin: ["MaterialCommunityIcons", "chevron-right"],
  close: ["FontAwesome", "close"],
  windowClose: ["FontAwesome", "window-close"],
  check: ["FontAwesome", "check-circle-o"],
  circle: ["FontAwesome", "circle-o"],
  info: ["FontAwesome", "info"],
  question: ["FontAwesome", "question-circle-o"],
  clock: ["FontAwesome", "clock-o"],
  price: ["MaterialIcons", "price-change"],
  star: ["MaterialIcons", "star"],
  starSolid: ["FontAwesome", "star"],
  starOutline: ["FontAwesome", "star-o"],
  trophy: ["FontAwesome", "trophy"],
  person: ["Ionicons", "person"],
  personCircle: ["Ionicons", "person-circle-sharp"],
  photo: ["MaterialIcons", "photo"],
  eye: ["FontAwesome", "eye"],
  eyeOff: ["FontAwesome", "eye-slash"],
  email: ["MaterialCommunityIcons", "email-outline"],
  phone: ["FontAwesome", "phone"],
  pencil: ["MaterialCommunityIcons", "pencil"],
  home: ["FontAwesome", "home"],
  homeAlt: ["MaterialIcons", "home"],
  calendar: ["FontAwesome", "calendar"],
  calendarMonth: ["MaterialIcons", "calendar-month"],
  locationArrow: ["FontAwesome", "location-arrow"],
  locationDot: ["FontAwesome6", "location-dot"],
  scissors: ["MaterialIcons", "content-cut"],
  services: ["MaterialIcons", "miscellaneous-services"],
  wifiOff: ["MaterialIcons", "signal-wifi-off"],
  // settings menu
  translate: ["MaterialCommunityIcons", "translate"],
  contacts: ["MaterialCommunityIcons", "contacts"],
  support: ["MaterialCommunityIcons", "face-agent"],
  document: ["MaterialCommunityIcons", "file-document"],
  logout: ["MaterialCommunityIcons", "logout"],
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
export function Icon({ name, size = "md", color = "text", rawColor, style, testID }: IconProps) {
  const { colors } = useTheme();
  const [family, glyph]: readonly [Family, string | undefined] = name ? REGISTRY[name] : ["FontAwesome", undefined];
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

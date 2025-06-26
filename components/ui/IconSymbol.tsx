// This file is a fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SymbolWeight } from "expo-symbols";
import React from "react";
import { OpaqueColorValue, StyleProp, ViewStyle } from "react-native";

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  "star":"star",
  "image":"image",
  "price-change":"price-change",
  "house.fill": "home",
  "check.cirle": "check-circle-outline",
  "notifications.fill": "notifications",
  "miscellaneous.services": "miscellaneous-services",
  "apple":"apple",
  "logo-google":"logo-google",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "content.cut": "content-cut",
  "calendar.month": "calendar-month",
  "arrow.right": "arrow-right",
  "arrow.left": "arrow-left",
  "person.outline": "person-outline",
  logout: "logout",
  settings: "settings",
  info: "info-outline",
  file: "insert-drive-file",
  lock: "lock-outline",
  email: "email",
  "logo.whatsapp": "logo-whatsapp",
  "logo.instagram": "logo-instagram",
  "not.visible":"visibility-off",
  "visible":"visibility"
} as Partial<
  Record<
    import("expo-symbols").SymbolViewProps["name"],
    React.ComponentProps<typeof MaterialIcons>["name"]
  >
>;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  if (MAPPING[name] === "logo-whatsapp" || MAPPING[name] === "logo-google" || MAPPING[name] === 'logo-instagram') {
    return <Ionicons name={MAPPING[name]} size={size} color={color} style={style} />;
  }
  if (MAPPING[name] !== "logo-whatsapp" || MAPPING[name] === 'logo-instagram') {
    return (
      <MaterialIcons
        color={color}
        size={size}
        name={MAPPING[name]}
        style={style}
      />
    );
  }
}

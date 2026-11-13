import React from "react";
import { Image, StyleSheet } from "react-native";

import { useTheme } from "@/theme";

/** Brand logo on auth screens. The PNG is single-colour white → tinted with `ink` so it works in both themes. */
function SharedLogin() {
  const { colors } = useTheme();
  return <Image source={require("@/assets/images/homeSplash.png")} style={[styles.coverLogo, { tintColor: colors.ink }]} />;
}

const styles = StyleSheet.create({
  coverLogo: {
    resizeMode: "contain",
    height: 72,
  },
});

export default SharedLogin;

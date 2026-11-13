import React from "react";
import { Image, Text, View } from "react-native";

import { brand, fonts, useTheme } from "@/theme";

/**
 * The active brand's mark, sized by height. Image logos are single-colour artwork tinted with `ink`
 * (works in both themes); brands without a logo get the typographic wordmark (Atelier: "Atelier *Salon*").
 */
export default function BrandLogo({ height }: { height: number }) {
  const { colors } = useTheme();
  const logo = brand.details.logo;

  if (logo.kind === "image") {
    return (
      <Image
        source={logo.source}
        style={{ height, width: height * logo.aspectRatio, resizeMode: "contain", tintColor: colors.ink }}
      />
    );
  }

  // wordmark: two words, the second in italic (design: Fraunces 500, "Salon" italic)
  // capped so the big splash size stays elegant (≈ display-xl 40–44)
  const fontSize = Math.min(Math.round(height * 0.42), 44);
  return (
    <View style={{ height, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontFamily: fonts.displaySemiBold, fontSize, lineHeight: Math.round(fontSize * 1.15), color: colors.ink }}>
        {logo.words[0]}{" "}
        <Text style={{ fontFamily: fonts.displayItalic }}>{logo.words[1]}</Text>
      </Text>
    </View>
  );
}

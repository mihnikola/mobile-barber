import type { Brand, Palette } from "./types";

/** Atelier Salon (working name) — warm cream, deep plum action, dusty-rose accent (design system "Atelier Salon"). */
const dark: Palette = {
  bg: "#1A1215", // warm plum-black
  surface: "#251A1E",
  surfaceSunken: "#30232A",
  line: "#3B2C33",
  lineStrong: "#7D6870",
  ink: "#F6EDE9",
  inkMuted: "#C4B0B6",
  inkFaint: "#8F7A80",
  primary: "#ECBCCB",
  onPrimary: "#2A1B21",
  accent: "#EE9FB3",
  accentSoft: "#3D1F29",
  blush: "#4A2F2C", // decorative powder-peach: image/avatar placeholders, date block
  star: "#EE9FB3",
  success: "#82D1A0",
  successSoft: "#173323",
  warning: "#F2B85C",
  warningSoft: "#36260D",
  danger: "#F28B82",
  dangerSoft: "#3B1714",
  focus: "#EE9FB3",
  scrim: "#000000B3",
  transparent: "transparent",
};

const light: Palette = {
  bg: "#FBF6F1", // warm cream
  surface: "#FFFFFF",
  surfaceSunken: "#F3E9E1",
  line: "#ECDFD6",
  lineStrong: "#A08A86",
  ink: "#2A1B21",
  inkMuted: "#6B565D",
  inkFaint: "#8F7A80",
  primary: "#5A2741", // deep plum
  onPrimary: "#FFFFFF",
  accent: "#A8445F", // dusty rose
  accentSoft: "#F7E3E8",
  blush: "#F2D6CC",
  star: "#A8445F",
  success: "#2F6B45",
  successSoft: "#E4F1E7",
  warning: "#8A5300",
  warningSoft: "#FBEEDB",
  danger: "#B3261E",
  dangerSoft: "#FBE7E4",
  focus: "#A8445F",
  scrim: "#2A1B2199",
  transparent: "transparent",
};

export const atelier: Brand = {
  id: "atelier",
  name: "Atelier Salon",
  palettes: { light, dark },
  // soft and round: pills for buttons, checkboxes and avatars
  radii: { xs: 6, sm: 14, md: 18, lg: 24, pill: 999, button: 999, avatar: 999, check: 999 },
  shadows: {
    color: "#5A2741", // warm plum-tinted shadow
    card: { offsetY: 2, radius: 12, opacity: 0.06, elevation: 2 },
    sheet: { offsetY: -10, radius: 30, opacityLight: 0.1, opacityDark: 0.5, elevation: 12 },
    cardBorder: true,
  },
  type: {
    // Fraunces (serif, 500; italic for screen titles) + DM Sans for everything read quickly
    fonts: {
      display: "Fraunces-Medium",
      displayBold: "Fraunces-SemiBold",
      displayItalic: "Fraunces-MediumItalic",
      sans: "DMSans-Regular",
      sansMedium: "DMSans-Medium",
      sansSemiBold: "DMSans-SemiBold",
      sansBold: "DMSans-Bold",
    },
    files: {
      "Fraunces-Medium": require("../../assets/fonts/Fraunces-Medium.ttf"),
      "Fraunces-SemiBold": require("../../assets/fonts/Fraunces-SemiBold.ttf"),
      "Fraunces-MediumItalic": require("../../assets/fonts/Fraunces-MediumItalic.ttf"),
      "DMSans-Regular": require("../../assets/fonts/DMSans-Regular.ttf"),
      "DMSans-Medium": require("../../assets/fonts/DMSans-Medium.ttf"),
      "DMSans-SemiBold": require("../../assets/fonts/DMSans-SemiBold.ttf"),
      "DMSans-Bold": require("../../assets/fonts/DMSans-Bold.ttf"),
    },
    displayCase: "none",
    displayTracking: 0,
    scale: {
      displayXl: { fontSize: 40, lineHeight: 44 },
      displayLg: { fontSize: 32, lineHeight: 36, italic: true },
      displayMd: { fontSize: 22, lineHeight: 28 },
    },
    buttonCase: "none",
    buttonTracking: 0,
  },
  details: {
    // no mark yet → typographic wordmark "Atelier *Salon*" (working name, replace with the real one)
    logo: { kind: "wordmark", words: ["Atelier", "Salon"] },
    bookIcon: "sparkle",
    staffWord: "team",
  },
};

import type { Brand, Palette } from "./types";

/** Gentleman Barber — black & light, barber-pole red accent (design system "Gentleman Barber"). */
const dark: Palette = {
  bg: "#0F0F0F", // screen background
  surface: "#1A1A1A", // cards, lists, sheets (on bg)
  surfaceSunken: "#242424", // sunken surfaces: thumbnails, inactive chips, disabled
  line: "#2E2E2E", // hairline dividers
  lineStrong: "#6B6862", // control borders (3:1)
  ink: "#F2F0EB", // primary text and icons
  inkMuted: "#A8A49C", // secondary text
  inkFaint: "#8A867E", // disabled / placeholder
  primary: "#F2F0EB", // main button, selected date/slot/tab
  onPrimary: "#141414", // text/icons on primary
  accent: "#F0705F", // brand accent: active nav, availability, price in summary
  accentSoft: "#3A1612", // tinted background behind accent text
  blush: "#242424", // (no blush in this brand) = surfaceSunken
  star: "#F2F0EB", // filled rating stars (monochrome brand)
  success: "#6FCF97",
  successSoft: "#12301E",
  warning: "#F2B85C",
  warningSoft: "#33240A",
  danger: "#F0705F",
  dangerSoft: "#3A1612",
  focus: "#F0705F",
  scrim: "#000000B3",
  transparent: "transparent",
};

const light: Palette = {
  bg: "#F5F4F1",
  surface: "#FFFFFF",
  surfaceSunken: "#EBE9E4",
  line: "#DCD9D2",
  lineStrong: "#8C887F",
  ink: "#141414",
  inkMuted: "#5C5952",
  inkFaint: "#7A766E",
  primary: "#141414",
  onPrimary: "#FFFFFF",
  accent: "#B42318",
  accentSoft: "#FBE9E6",
  blush: "#EBE9E4",
  star: "#141414",
  success: "#1E6B3A",
  successSoft: "#E3F2E8",
  warning: "#8A5300",
  warningSoft: "#FCEFD7",
  danger: "#B42318",
  dangerSoft: "#FBE9E6",
  focus: "#B42318",
  scrim: "#14141499",
  transparent: "transparent",
};

export const gentleman: Brand = {
  id: "gentleman",
  name: "Gentleman Barber",
  palettes: { light, dark },
  // short, precise corners; buttons = radius-sm, avatars = radius-md
  radii: { xs: 4, sm: 8, md: 12, lg: 16, pill: 999, button: 8, avatar: 12, check: 4 },
  shadows: {
    color: "#141414",
    // design: 0 1px 2px @6% — a bit stronger so it is visible on phones
    card: { offsetY: 1, radius: 3, opacity: 0.08, elevation: 2 },
    sheet: { offsetY: -8, radius: 24, opacityLight: 0.08, opacityDark: 0.5, elevation: 12 },
    cardBorder: false,
  },
  type: {
    fonts: {
      display: "BarlowCondensed-SemiBold",
      displayBold: "BarlowCondensed-Bold",
      displayItalic: "BarlowCondensed-SemiBold",
      sans: "Inter-Regular",
      sansMedium: "Inter-Medium",
      sansSemiBold: "Inter-SemiBold",
      sansBold: "Inter-Bold",
    },
    files: {
      "BarlowCondensed-SemiBold": require("../../assets/fonts/BarlowCondensed-SemiBold.ttf"),
      "BarlowCondensed-Bold": require("../../assets/fonts/BarlowCondensed-Bold.ttf"),
      "Inter-Regular": require("../../assets/fonts/Inter-Regular.ttf"),
      "Inter-Medium": require("../../assets/fonts/Inter-Medium.ttf"),
      "Inter-SemiBold": require("../../assets/fonts/Inter-SemiBold.ttf"),
      "Inter-Bold": require("../../assets/fonts/Inter-Bold.ttf"),
    },
    displayCase: "uppercase",
    displayTracking: 0.01,
    scale: {
      displayXl: { fontSize: 44, lineHeight: 44, bold: true },
      displayLg: { fontSize: 34, lineHeight: 36 },
      displayMd: { fontSize: 22, lineHeight: 26 },
    },
    buttonCase: "uppercase",
    buttonTracking: 0.06,
  },
  details: { bookIcon: "scissors", staffWord: "barbers" },
};

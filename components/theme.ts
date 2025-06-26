import { Appearance } from "react-native";

export const lightTheme = {
     colors: {
        primary: "white",
        primaryActive: "black",
        backgroundPrimary: "black",
        textPrimary: "black",
        textInverted: "black",
        shadow: "black",
    },
    gradients: {
        primaryAnimated: ["white", "black", "white", "black"],
    },
} as const;

export const darkTheme = {
    colors: {
        primary: "white",
        primaryActive: "black",
        backgroundPrimary: "black",
        textPrimary: "black",
        textInverted: "black",
        shadow: "black",
    },
    gradients: {
        primaryAnimated: ["white", "black", "white", "black"],
    },
} as const;

export const theme =
    Appearance.getColorScheme() === "dark" ? darkTheme : lightTheme;
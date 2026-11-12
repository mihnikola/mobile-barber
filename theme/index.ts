import { colors } from "./colors";
import { fonts, fontSize } from "./typography";
import { radii, spacing } from "./spacing";

export { colors, fonts, fontSize, radii, spacing };
export type { ColorToken } from "./colors";

export const theme = { colors, fonts, fontSize, spacing, radii } as const;
export type Theme = typeof theme;

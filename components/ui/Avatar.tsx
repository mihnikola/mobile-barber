import { Image, type StyleProp, Text, View, type ViewStyle } from "react-native";

import { getInitialsName } from "@/lib/format";
import { fonts, makeStyles } from "@/theme";

/** lg = list cards (90), md = profile (70), sm = compact details (40). */
export type AvatarSize = "lg" | "md" | "sm";

type AvatarProps = {
  /** Image URL. Falls back to initials from `name` when missing. */
  uri?: string | null;
  name?: string;
  size?: AvatarSize;
  /** Thin divider-colored border around the image (initials always have a border). */
  bordered?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** Design system: list thumb 64, profile 72, compact 40 — all radius 12 (`radius-md`). */
const SIZES = {
  lg: { box: 64, radius: 12, text: 22 },
  md: { box: 72, radius: 12, text: 26 },
  sm: { box: 40, radius: 12, text: 15 },
} as const;

/** Profile picture or initials badge. */
export function Avatar({ uri, name, size = "lg", bordered = false, style }: AvatarProps) {
  const styles = useStyles();
  const s = SIZES[size];
  const box = { width: s.box, height: s.box, borderRadius: s.radius };

  if (uri) {
    return <Image source={{ uri }} style={[styles.base, box, bordered && styles.imageBorder, style as object]} />;
  }
  return (
    <View style={[styles.base, box, styles.initialsBox, style]}>
      <Text style={[styles.initials, { fontSize: s.text }]}>{getInitialsName(name)}</Text>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  base: {},
  imageBorder: { borderWidth: 1, borderColor: colors.line },
  initialsBox: { backgroundColor: colors.surfaceSunken, justifyContent: "center" },
  initials: { color: colors.ink, fontFamily: fonts.displaySemiBold, alignSelf: "center" },
}));

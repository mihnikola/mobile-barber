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

const SIZES = {
  lg: { box: 90, radius: 30, text: 30 },
  md: { box: 70, radius: 30, text: 20 },
  sm: { box: 40, radius: 15, text: 14 },
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
  base: { marginRight: 15 },
  imageBorder: { borderWidth: 1, borderColor: colors.divider },
  initialsBox: {
    backgroundColor: colors.surfaceAvatar,
    borderWidth: 1,
    borderColor: colors.borderAvatar,
    justifyContent: "center",
  },
  initials: { color: colors.text, fontFamily: fonts.bold, alignSelf: "center" },
}));

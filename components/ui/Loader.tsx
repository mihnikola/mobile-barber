import { ActivityIndicator, useWindowDimensions, View } from "react-native";

import { makeStyles, useTheme } from "@/theme";

import { Dialog } from "./Dialog";

type LoaderProps =
  /** Fills the area, at least half the screen high (lists / screens loading). */
  | { variant?: "block" }
  /** Compact, 20px vertical padding (e.g. inside the date picker). */
  | { variant: "inline" }
  /** Blocking modal spinner. */
  | { variant: "overlay"; visible?: boolean; onRequestClose?: () => void };

/** One loader for the whole app. */
export function Loader(props: LoaderProps) {
  const { colors } = useTheme();
  const styles = useStyles();
  const { height } = useWindowDimensions();

  if (props.variant === "overlay") {
    return (
      <Dialog visible={props.visible} onRequestClose={props.onRequestClose} panelStyle={styles.overlayPanel}>
        <ActivityIndicator size={32} color={colors.ink} />
      </Dialog>
    );
  }

  return (
    <View style={props.variant === "inline" ? styles.inline : [styles.block, { minHeight: height * 0.5 }]}>
      <ActivityIndicator size="large" color={colors.ink} />
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  block: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bg,
  },
  inline: {
    flex: 1,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bg,
  },
  overlayPanel: { alignSelf: "center", paddingHorizontal: 32 },
}));

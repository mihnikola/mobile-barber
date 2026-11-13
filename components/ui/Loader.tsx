import { ActivityIndicator, Modal, useWindowDimensions, View } from "react-native";

import { makeStyles, radii, useTheme } from "@/theme";


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
      <Modal animationType="fade" transparent visible={props.visible ?? true} onRequestClose={props.onRequestClose}>
        <View style={styles.overlay}>
          <View style={styles.overlayPanel}>
            <ActivityIndicator size={32} color={colors.ink} />
          </View>
        </View>
      </Modal>
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
  overlay: { flex: 1, backgroundColor: colors.scrim, alignItems: "center", justifyContent: "center" },
  overlayPanel: {
    width: 88,
    height: 88,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
}));

import { View } from "react-native";

import { makeStyles } from "@/theme";

import { Icon } from "./Icon";

/** Single-choice indicator (`ds-radio`): 22px circle, filled `primary` with a check when selected. */
export function Radio({ selected }: { selected: boolean }) {
  const s = useStyles();
  return (
    <View style={[s.radio, selected && s.on]} accessibilityRole="radio" accessibilityState={{ selected }}>
      {selected && <Icon name="check" size={14} color="onPrimary" />}
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: colors.lineStrong,
    alignItems: "center",
    justifyContent: "center",
  },
  on: { borderColor: colors.primary, backgroundColor: colors.primary },
}));

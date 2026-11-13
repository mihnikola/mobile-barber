import { View } from "react-native";
import React from "react";
import { useLocalization } from "@/context/LocalizationContext";
import { makeStyles } from "@/theme";
import { AppText, Card } from "@/components/ui";

const Note = () => {
  const styles = useStyles();
  const {localization} = useLocalization();

  return (
    <Card>
      <AppText variant="bodyStrong">{localization.SALON.title}</AppText>
      <View style={styles.lines}>
        <AppText variant="bodySm" color="inkMuted">
          {localization.SALON.first}
        </AppText>
        <AppText variant="bodySm" color="inkMuted">
          {localization.SALON.second}
        </AppText>
      </View>
    </Card>
  );
};

export default Note;

const useStyles = makeStyles(() => ({
  lines: { gap: 6, marginTop: 8 },
}))

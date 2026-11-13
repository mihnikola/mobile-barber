import { View } from "react-native";
import React from "react";
import { useLocalization } from "@/context/LocalizationContext";
import { fonts, makeStyles } from "@/theme";
import { AppText } from "@/components/ui";

const Note = () => {
  const styles = useStyles();
  const {localization} = useLocalization();

  return (
    <View style={styles.data}>
      <AppText variant="title" style={styles.title}>{localization.SALON.title}</AppText>
      <AppText style={styles.info}>
       {localization.SALON.first}
      </AppText>
      <AppText style={styles.info}>
        {localization.SALON.second}
      </AppText>
    </View>
  );
};

export default Note;

const useStyles = makeStyles((colors) => ({
  reservation: {
    display: "flex",
    flexDirection: "column",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  timeData: {
    fontSize: 20,
   color: colors.text,
    fontFamily: fonts.bold,
  },
  info: {
    display: "flex",
    paddingLeft: 12,
    paddingBottom: 8,

  },
  title: {
    padding: 12,
  },
  position: {
    fontSize: 16,
    color: colors.textMuted,
    fontStyle: "italic",
    padding: 12,
  },
  coverContent: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    top: 100,
    padding: 12,
  },
  dateData: {
    fontSize: 20,
   color: colors.text,
    fontFamily: fonts.bold,
  },
  data: {
    display: "flex",
    flexDirection: "column",
    marginRight: 10,
  },
  container: {
    flex: 1,
  },
  coverImage: {
    width: "100%",
    height: 200,
    opacity: 0.2,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 20,
    padding: 10,
    gap: 20,
  },
  capture: {
    fontSize: 32,
    color: colors.textMuted,
    fontFamily: fonts.bold,
    textAlign: "center",
    fontStyle: "italic",
    position: "absolute",
    top: 150,
    left: 50,
  },
}));

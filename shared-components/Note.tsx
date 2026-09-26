import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useLocalization } from "@/context/LocalizationContext";
import { ColorsBarber } from "@/constants/Colors";

const Note = () => {
  const {localization} = useLocalization();

  return (
    <View style={styles.data}>
      <Text style={styles.title}>{localization.SALON.title}</Text>
      <Text style={styles.info}>
       {localization.SALON.first}
      </Text>
      <Text style={styles.info}>
        {localization.SALON.second}
      </Text>
    </View>
  );
};

export default Note;

const styles = StyleSheet.create({
  reservation: {
    display: "flex",
    flexDirection: "column",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  timeData: {
    fontSize: 20,
   color: ColorsBarber.light.textColor,
    fontFamily: "OldStandard-Bold",
  },
  info: {
    display: "flex",
    paddingLeft: 12,
    paddingBottom: 8,
   color: ColorsBarber.light.textColor,
        fontFamily:"OldStandard-Regular"

  },
  title: {
    fontSize: 20,
   color: ColorsBarber.light.textColor,
    padding: 12,
    fontFamily:"OldStandard-Bold"
  },
  position: {
    fontSize: 16,
    color: "grey",
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
   color: ColorsBarber.light.textColor,
    fontFamily: "OldStandard-Bold",
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
    color: "grey",
    fontFamily: "OldStandard-Bold",
    textAlign: "center",
    fontStyle: "italic",
    position: "absolute",
    top: 150,
    left: 50,
  },
});

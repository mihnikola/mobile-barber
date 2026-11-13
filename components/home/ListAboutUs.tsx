import React from "react";
import { StyleSheet, View } from "react-native";
import { useLocalization } from "@/context/LocalizationContext";
import { AppText, Icon } from "@/components/ui";

const ListAboutUs = ({ contact }) => {
  const { localization } = useLocalization();

  return (
    <View>
      <AppText variant="title" size={29} style={styles.titleContant}>{localization.HOME.contact}</AppText>
      <View style={styles.contactItem}>
        <Icon name="phone" size={30} color="text" />
        <AppText variant="title">{contact}</AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20, // optional padding around the content
  },
  titleContant: {
    textAlign: "center",
  },
  contactItem: {
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});

export default ListAboutUs;

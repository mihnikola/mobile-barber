import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLocalization } from "@/context/LocalizationContext";
import { colors, fonts } from "@/theme";
import { Icon } from "@/components/ui";

const ListAboutUs = ({ contact }) => {
  const { localization } = useLocalization();

  return (
    <View>
      <Text style={styles.titleContant}>{localization.HOME.contact}</Text>
      <View style={styles.contactItem}>
        <Icon name="phone" size={30} color="text" />
        <Text style={styles.title}>{contact}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20, // optional padding around the content
  },
  titleContant: {
    fontFamily: fonts.bold,
   color: colors.text,
    fontSize: 29,
    textAlign: "center",
  },
  contactItem: {
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  title: {
    fontSize: 20,
       color: colors.text,
    fontFamily: fonts.bold,


  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});

export default ListAboutUs;

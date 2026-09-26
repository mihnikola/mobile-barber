import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalization } from "@/context/LocalizationContext";
import { ColorsBarber } from "@/constants/Colors";

const ListAboutUs = ({ contact }) => {
  const { localization } = useLocalization();

  return (
    <View>
      <Text style={styles.titleContant}>{localization.HOME.contact}</Text>
      <View style={styles.contactItem}>
        <FontAwesome name="phone" size={30} color={ColorsBarber.light.textColor} />
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
    fontFamily: "OldStandard-Bold",
   color: ColorsBarber.light.textColor,
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
       color: ColorsBarber.light.textColor,
    fontFamily: "OldStandard-Bold",


  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});

export default ListAboutUs;

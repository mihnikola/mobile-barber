import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ListAboutUs = ({ contact }) => {
  return (
    <View>
      <Text style={styles.titleContant}>Contact</Text>
      <View style={styles.contactItem}>
        <FontAwesome name="phone" size={30} color="white" />
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
    fontWeight: "800",
    color: "white",
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
    color: "#ffffff",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});

export default ListAboutUs;

import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { CONTACT_DATA } from "@/constants/index";

const ListAboutUs = () => {
  return (
    <View>
      <Text style={styles.titleContant}>Contact</Text>
      {CONTACT_DATA.map((item) => (
        <View key={item.id} style={styles.contactItem}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      ))}
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
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
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

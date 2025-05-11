import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import placeholderImg from "../../../assets/images/placeholderImg.png";
import { IconSymbol } from "@/components/ui/IconSymbol";

const EmployerItem = ({ data, redirectHandler }) => {
  const { id, image, name } = data;

  return (
    <TouchableOpacity
      key={id}
      onPress={() => redirectHandler(data)}
      style={styles.wrapper}
    >
      <View style={styles.content}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        {!image && <Image source={placeholderImg} style={styles.image} />}
        <View style={styles.data}>
          <Text style={styles.name}>{name}</Text>
        </View>
        <View style={{ display: "flex", justifyContent: "center" }}>
          <IconSymbol size={28} name="arrow.right" color="#000" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    width: "100%",
    borderRadius: 20,
    padding: 15,
    overflowY: "scroll",
  },

  data: {
    display: "flex",
    justifyContent: "center",
    width: "55%",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    overflow: "hidden",
  },
  name: {
    fontSize: 18,
  },
  content: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    borderRadius: 20,
    padding: 10,
    gap: 20,
  },
});

export default EmployerItem;

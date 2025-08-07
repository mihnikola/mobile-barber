import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";

const ServiceItem = ({ data, date }) => {
  const { id, image, name, duration, price } = data;
  return (
    <TouchableOpacity
      key={id}
      onPress={() => date(data)}
      style={styles.wrapper}
    >
      <View style={styles.content}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.data}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.duration}>Duration: {duration} minutes</Text>
          <Text style={styles.price}>Price: {price} RSD</Text>
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
    padding: 10,
    overflowY: "scroll",
  },
  content: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    borderRadius: 20,
    padding: 10,
    gap: 20,
  },
  image: {
    width: 70,
    height: 70,
    overflow: "hidden",
    backgroundColor: "white",
    display: "flex",
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
  },
  duration: {
    fontSize: 18,
  },
  price: {
    fontSize: 18,
  },
  data: {
    display: "flex",
    flexDirection: "column",
  },
});

export default ServiceItem;

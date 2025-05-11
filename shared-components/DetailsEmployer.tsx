import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";


const DetailsEmployer = ({ data }) => {
  
  const { _id, image, name,id } = data;

  return (
    <View style={styles.container} key={_id}>
      <Image style={styles.image} source={{uri: image}} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
      </View>
    </View>
  );
};

export default DetailsEmployer;

const styles = StyleSheet.create({
  info: {
    display: "flex",
    padding: 10,
  },
  container: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    backgroundColor: 'black',
    padding: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 20,
  },
  name: {
    fontSize: 16,
    color: "#ffffff",
  }
});

import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

const OnboardingItem = ({ item }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { width, height: 200, resizeMode: "cover" }]}
      />
      <View style={{ flex: 0.5 , position: 'absolute', top: 80}}>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 0.2,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {width: -1, height: 0},
    textShadowRadius: 20,
    fontWeight: "700",
    fontSize:16,
    color: "white",
    textAlign: "center",
    paddingHorizontal: 64,
  },
});

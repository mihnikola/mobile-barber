import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NotificationActive = ({ data, showNotification }) => {
  const { text, capture } = data;

  const pressHandler = (valueData) => {
    showNotification(valueData);
  }

  return (
    <TouchableOpacity style={styles.cardReservation} onPress={() => pressHandler(data)}>
      <View style={styles.imageContainer}>
        {/* <Image
          source={require("@/assets/images/logoImage.png")}
          style={styles.reactLogo}
        /> */}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.capture}>{capture}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationActive;

const styles = StyleSheet.create({
  imageContainer: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
    padding: 2,
  },
  capture: {
    color: 'white',
    fontSize: 15
  },
  reactLogo: {
    height: 70,
    width: 70,
  },
  cardReservation: {
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginTop: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    gap: 20,
    height: 100,
  },
  text: {
    fontSize: 14,
    color: "white",
    fontWeight: "400",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});

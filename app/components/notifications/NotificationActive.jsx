import { StyleSheet, Text, View } from "react-native";
import { addMinutesToTime, convertToDay, convertToMonthName } from "@/helpers";

const NotificationActive = ({ data }) => {
  const { text, date } = data;

  return (
    <View style={styles.cardReservation}>
      <View style={styles.dateContainer}>
        <Text style={styles.captureDate}>
          {convertToMonthName(date)}
        </Text>
        <Text style={styles.captureDateBold}>
          {convertToDay(date)}
        </Text>
        {/* ovo ces da odcepas od datuma koji dobijes za tacno vreme */}
        <Text style={styles.captureDate}>12:40</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.captureDateBold}>Obavestenje</Text>
        <Text style={styles.text}>{text}</Text>
        
        <Text style={styles.captureAddress}>Cara Lazara 85 a</Text>
      </View>
    </View>
  );
};

export default NotificationActive;

const styles = StyleSheet.create({
  cardReservation: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginTop: 20,
    borderRadius: 20,
    padding: 10,
    gap: 20,
    height: 100,
  },
  captureAddress:{
    fontSize: 17,
    fontWeight: '300',
    paddingTop: 5
  },
  dateContainer: {
    borderWidth: 1,
    borderColor: "#000",
    borderLeftWidth: 5,
    borderLeftColor: "green",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  captureDate: {
    fontSize: 18,
    color: "grey",
    textAlign: "center",
    fontWeight: "500",
  },

  captureDateBold: {
    fontSize: 20,
    color: "black",
    fontWeight: "900",
  },
    text: {
    fontSize: 14,
    color: "black",
    fontWeight: "400",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});

import { StyleSheet, Text, View } from "react-native";

const HeaderReservationTime = ({ data }) => {
  return (
    <View style={styles.coverContent}>
      <Text style={styles.timeData}>
        {data?.startDateTime} - {data?.finishedTime}
      </Text>
      <Text style={styles.dateData}>{data?.eventDate}</Text>
      <Text style={styles.locationData}>{data?.employer?.place?.address}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  locationData: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
  dateData: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "700",
  },
  timeData: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  coverContent: {
    paddingHorizontal: 20,
    position: "absolute",
    top: 90,
  },
});

export default HeaderReservationTime;

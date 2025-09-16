import { StyleSheet, Text, View } from "react-native";

const HeaderReservationTime = ({ data }) => {
  return (
    <View style={styles.coverContent}>
      <Text style={styles.timeData}>
        {data?.startDateTime} - {data?.finishedTime}
      </Text>
      <Text style={styles.dateData}>{data?.eventDate}</Text>
      <Text style={styles.dateData}>Barber Studio - Gentleman</Text>
    </View>
  );
};
const styles = StyleSheet.create({
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

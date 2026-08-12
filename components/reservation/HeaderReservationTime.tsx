import { convertDateDetails } from "@/helpers";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HeaderReservationTime = ({ data }) => {
  if (!data) return null;

  return (
    <View style={styles.coverContent}>
      <View>
        <TouchableOpacity hitSlop={20} onPress={router.back}>
          <MaterialIcons name="arrow-back" size={25} color="white" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.timeData}>
          {data?.startDateTime} - {data?.finishedTime}
        </Text>
        <Text style={styles.dateData}>
          {convertDateDetails(data?.startDate)}
        </Text>
        <Text style={styles.dateData}>{data?.place}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  coverContent: {
    justifyContent: "space-between",
    height: "100%",
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  timeData: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  dateData: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  locationData: {
    color: "#fff",
    fontWeight: "700",
  },
});

export default HeaderReservationTime;

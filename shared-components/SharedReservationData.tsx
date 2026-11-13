import { addMinutesToTime, convertDate } from "@/helpers";
import { useLocalization } from "@/context/LocalizationContext";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "./TouchableOpacity";
import { colors, fonts } from "@/theme";
import { Icon } from "@/components/ui";

function SharedReservationData({ reservation }) {
  const { localization } = useLocalization();
  const totals = reservation?.otherServices?.reduce(
    (acc, current) => {
      acc.totalPrice += current.price;
      acc.totalDuration += current.duration;
      return acc;
    },
    { totalPrice: 0, totalDuration: 0 },
  );

  return (
    <View style={styles.coverContent}>
      <View>
        <TouchableOpacity hitSlop={20} onPress={router.back}>
          <Icon name="back" size={25} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.timeData}>
          {reservation && reservation?.timeData?.value} -{" "}
          {reservation &&
            addMinutesToTime(
              reservation?.timeData?.value,
              reservation?.service?.serviceDuration,
              totals?.totalDuration,
            )}
        </Text>
        <Text style={styles.dateData}>
          {convertDate(
            reservation?.dateReservation?.dateString ||
              reservation?.dateReservation,
            localization.code,
          )}
        </Text>
        <Text style={styles.dateData}>
          {reservation?.location.address || reservation?.location[0].address}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: colors.background,
    borderRadius: 20,
  },
  buttonText: {
    color: colors.text,
    fontFamily: fonts.bold,
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },

  timeData: {
    fontSize: 20,
    color: colors.text,
    fontFamily: fonts.bold,
  },
  position: {
    fontSize: 16,
    color: colors.textMuted,
    fontStyle: "italic",
    padding: 12,
  },

  dateData: {
    fontSize: 20,
    color: colors.text,
    fontFamily: fonts.bold,
  },
  data: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  coverImage: {
    width: "100%",
    height: 180,
    opacity: 0.2,
  },
  coverContent: {
    marginTop: 5,
    paddingHorizontal: 15,
    height: "100%",
    justifyContent: "space-around",
  },
});
export default SharedReservationData;

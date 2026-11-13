import { useLocalization } from "@/context/LocalizationContext";
import { addMinutesToTime, convertToDayTime } from "@/helpers";
import React from "react";
import { StyleSheet, View } from "react-native";
import { AppText } from "@/components/ui";

const InfoContainerPast = ({ item }) => {
  const { localization } = useLocalization();

  return (
    <View style={styles.centerContainer}>
      <View style={styles.columnContainer}>
        <View style={styles.infoContainer}>
          <AppText variant="subtitle" color="textInactive"
            style={styles.captureDateBoldPast}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.service?.name} {item?.otherServices?.length > 0 && "+ " + localization.SERVICES.plus }
          </AppText>
          <AppText size={18} color="textInactive" style={styles.captureDatePast}>
            {convertToDayTime(item?.startDate)} -{" "}
            {addMinutesToTime(
              convertToDayTime(item?.startDate),
              item?.service?.duration
            )}
          </AppText>
        </View>
        <View style={styles.addressContainer}>
          <AppText size={15} color="textInactive"
            style={styles.captureDateLocation}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item?.place?.address}
          </AppText>
        </View>
      </View>
      <View>
        <AppText color="textInactive">
          {item.rating
            ? localization.APPOINTMENTS.rateReservation.rated
            : localization.APPOINTMENTS.rateReservation.rateUs}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  captureDateBoldPast: {
    marginRight: 10,
  },

  addressContainer: {
    flexDirection: "row",
  },
  columnContainer: {
    flex: 1,
  },
  centerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
  },


  captureDateLocation: {
    flex: 2,

  },
  captureDatePast: {
    textAlign: "center",
  },

  infoContainer: {
    flex: 1,
    alignItems: "flex-start",
    gap: 12,
  },
});

export default InfoContainerPast;

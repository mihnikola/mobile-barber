import { useLocalization } from "@/context/LocalizationContext";
import { addMinutesToTime, convertToDayTime } from "@/helpers";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "@/theme";
import { Icon } from "@/components/ui";

const InfoContainerFuture = ({ item }) => {
  const { localization } = useLocalization();

  return (
    <View style={styles.centerContainer}>
      <View style={styles.columnContainer}>
        <View style={styles.infoContainer}>
          <Text
            style={styles.captureDateBold}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.service?.name} {item?.otherServices?.length > 0 && "+ " + localization.SERVICES.plus }
          </Text>
          <Text style={styles.captureDateContent}>
            {convertToDayTime(item?.startDate)} -{" "}
            {convertToDayTime(item?.endDate)} 
          </Text>
        </View>
        <View style={styles.addressContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.captureDateLocation}
          >
            {item?.place?.address}
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.rating}>
          {item.status === 2 && (
            <Icon name={"clock"} size={16} color="text" />
          )}

          {item.status === 1 && (
            <Icon name={"windowClose"} size={16} color="text" />
          )}
          {item.status === 0 && (
            <Icon name={"check"} size={20} color="text" />
          )}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addressContainer: {
    flexDirection: "row",
  },
  rating: {
    color: colors.textMuted,
  },
  columnContainer: {
    flex: 1,
  },
  centerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
  },

  captureDateContent: {
    fontSize: 18,
   color: colors.text,
    textAlign: "center",
    fontFamily: fonts.regular,
  },
  fade: {
    color: colors.textSubtle,
  },
  captureDateLocation: {
    color: colors.text,
    fontFamily: fonts.regular,

    flex: 2,
    fontSize: 15,
  },

  captureDateBold: {
    fontSize: 18,
   color: colors.text,
    fontFamily: fonts.bold,
  },

  infoContainer: {
    flex: 1,
    alignItems: "flex-start",
    gap: 12,
  },
});

export default InfoContainerFuture;

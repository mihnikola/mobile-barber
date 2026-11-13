import { useLocalization } from "@/context/LocalizationContext";
import { addMinutesToTime, convertToDayTime } from "@/lib/date";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/theme";
import { AppText, Icon } from "@/components/ui";

const InfoContainerFuture = ({ item }) => {
  const { localization } = useLocalization();

  return (
    <View style={styles.centerContainer}>
      <View style={styles.columnContainer}>
        <View style={styles.infoContainer}>
          <AppText variant="subtitle"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.service?.name} {item?.otherServices?.length > 0 && "+ " + localization.SERVICES.plus }
          </AppText>
          <AppText size={18} style={styles.captureDateContent}>
            {convertToDayTime(item?.startDate)} -{" "}
            {convertToDayTime(item?.endDate)} 
          </AppText>
        </View>
        <View style={styles.addressContainer}>
          <AppText size={15}
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.captureDateLocation}
          >
            {item?.place?.address}
          </AppText>
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
    textAlign: "center",
  },
  fade: {
    color: colors.textSubtle,
  },
  captureDateLocation: {

    flex: 2,
  },


  infoContainer: {
    flex: 1,
    alignItems: "flex-start",
    gap: 12,
  },
});

export default InfoContainerFuture;

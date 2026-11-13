import { addMinutesToTime, convertDate } from "@/lib/date";
import { useLocalization } from "@/context/LocalizationContext";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { fonts, makeStyles } from "@/theme";
import { AppText, Icon, Pressable } from "@/components/ui";

function SharedReservationData({ reservation }) {
  const styles = useStyles();
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
        <Pressable hitSlop={20} onPress={router.back}>
          <Icon name="back" size={25} />
        </Pressable>
      </View>
      <View>
        <AppText variant="title">
          {reservation && reservation?.timeData?.value} -{" "}
          {reservation &&
            addMinutesToTime(
              reservation?.timeData?.value,
              reservation?.service?.serviceDuration,
              totals?.totalDuration,
            )}
        </AppText>
        <AppText variant="title">
          {convertDate(
            reservation?.dateReservation?.dateString ||
              reservation?.dateReservation,
            localization.code,
          )}
        </AppText>
        <AppText variant="title">
          {reservation?.location.address || reservation?.location[0].address}
        </AppText>
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
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

  position: {
    fontSize: 16,
    color: colors.textMuted,
    fontStyle: "italic",
    padding: 12,
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
}));
export default SharedReservationData;

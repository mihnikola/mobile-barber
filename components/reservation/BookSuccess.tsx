import { addMinutesToTime, convertDate } from "@/lib/date";
import { useLocalization } from "@/context/LocalizationContext";
import SharedCoverImage from "@/components/layout/SharedCoverImage";
import SharedLogo from "@/components/layout/SharedLogo";
import React from "react";
import { View } from "react-native";
import { makeStyles } from "@/theme";
import { AppText } from "@/components/ui";

function BookSuccess({ image, reservation }) {
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
    <>
      <SharedCoverImage image={image} />

      <SharedLogo />

      <View style={styles.coverContent}>
        <AppText variant="legacyHeading" style={styles.timeData}>
          {reservation?.timeData?.value} -{" "}
          {addMinutesToTime(
            reservation?.timeData?.value,
            reservation?.service?.serviceDuration,
            totals?.totalDuration,
          )}
        </AppText>
        <AppText variant="legacyTitle">
          {convertDate(
            reservation?.dateReservation?.dateString ||
              reservation?.dateReservation,
            localization.code,
          )}
        </AppText>
      </View>
    </>
  );
}
const useStyles = makeStyles((colors) => ({
  infoContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
  checkbox: {
    marginRight: 10,
  },

  reservation: {
    display: "flex",
    flexDirection: "column",
    height: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  timeData: {

    display: "flex",
    justifyContent: "center",
  },
  position: {
    fontSize: 20,
    color: colors.inkFaint,
    fontStyle: "italic",
    padding: 12,
  },
  coverContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10, // Add padding to make the space visible from the edges
  },
  data: {
    display: "flex",
    flexDirection: "column",
  },
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  coverImage: {
    width: "100%",
    height: 300,
    opacity: 0.25,
  },
  whiteLine: {
    width: "100%",
    height: 4, // Adjust the height for the thickness of the line
    backgroundColor: colors.bg, // Set the line color to white
    marginTop: -1, // Optional: You can adjust this to fine-tune the position
  },
}));
export default BookSuccess;

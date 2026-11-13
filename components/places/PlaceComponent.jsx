import { ScrollView, View } from "react-native";
import { Text } from "react-native";
import { useReservation } from "@/context/ReservationContext";
import useFetchLocations from "./useFetchLocations";
import SharedItemLocation from "@/components/booking/SharedItemLocation";

import { router } from "expo-router";
import { useLocalization } from "@/context/LocalizationContext";
import HeaderCoverImageContainer from "@/components/layout/HeaderCoverImageContainer";
import { makeStyles } from "@/theme";
import { routes } from "@/lib/navigation/routes";
import { Loader } from "@/components/ui";

const PlaceComponent = ({ locationsData }) => {
  const styles = useStyles();
  const { reservation, updateReservation } = useReservation();
  const { isLoading, error } = useFetchLocations();
  const { localization } = useLocalization();

  const redirectHandler = (location) => {
    updateReservation({ ...reservation, location });
    const pathName = routes.booking.services;
    router.push({
      pathname: pathName,
      params: { backButton: true },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <HeaderCoverImageContainer title={localization.PLACES.title} hidden />

      {isLoading && <Loader />}
      {!isLoading && (
        <View style={styles.contentContainer}>
          {locationsData?.map((item) => (
            <SharedItemLocation
              key={item.id}
              data={item}
              redirectHandler={redirectHandler}
            />
          ))}
        </View>
      )}
      {!isLoading && error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{localization.PLACES.network}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default PlaceComponent;

const useStyles = makeStyles((colors) => ({
  contentContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  errorContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    alignSelf: "center",
    alignContent: "center",
    height: 500,
  },
  errorText: {
    marginhorizontal: 40,
    fontSize: 16,
    textAlign: "center",
    color: colors.textMuted,
  },
}));

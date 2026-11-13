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
import { EmptyState, Loader } from "@/components/ui";

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
        <EmptyState icon="wifiOff" title={localization.PLACES.network} />
      )}
    </ScrollView>
  );
};

export default PlaceComponent;

const useStyles = makeStyles((colors) => ({
  container: { flex: 1, backgroundColor: colors.bg },
  contentContainer: { paddingTop: 4, paddingBottom: 16 },
}));



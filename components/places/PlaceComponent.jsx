import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native";
import ReservationContext from "@/context/ReservationContext";
import Loader from "@/components/Loader";
import useFetchLocations from "./useFetchLocations";
import SharedItemLocation from "@/shared-components/SharedItemLocation";
import { useContext, useEffect } from "react";
import { router } from "expo-router";
import { useLocalization } from "@/context/LocalizationContext";
import { useCompany } from "@/context/CompanyContext";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import SharedTitle from "@/shared-components/SharedTitle";
import { coverImageAppointments } from "@/constants";

const PlaceComponent = ({ locationsData }) => {
  const { reservation, updateReservation } = useContext(ReservationContext);
  const { isLoading, error } = useFetchLocations();
  const { localization } = useLocalization();
  const { company } = useCompany();

  const redirectHandler = (location) => {
    updateReservation({ ...reservation, location });
    const pathName = "/(tabs)/(02_barbers)/services";
    router.push({
      pathname: pathName,
      params: { backButton: true },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <SharedCoverImage image={coverImageAppointments} />
      {!isLoading && <SharedTitle title={localization.PLACES.title} />}
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

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },

  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#000",
  },
  errorContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    alignSelf: "center",
    alignContent: "center",
    height: 500,
  },
  errorText: {
    marginhorizontal: 40,
    fontSize: 16,
    textAlign: "center",
    color: "gray",
  },
});

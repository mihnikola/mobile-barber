import { ScrollView, Image, StyleSheet, View } from "react-native";
import { Text } from "react-native";
import ReservationContext from "@/context/ReservationContext";
import Loader from "@/components/Loader";
import useFetchLocations from "./useFetchLocations";
import SharedItemLocation from "@/shared-components/SharedItemLocation";
import { useContext, useEffect } from "react";
import { router } from "expo-router";
import SharedTabHeader from "@/shared-components/SharedTabHeader";
import { useLocalization } from "@/context/LocalizationContext";
import { useCompany } from "@/context/CompanyContext";

const PlaceComponent = () => {
  const { reservation, updateReservation } = useContext(ReservationContext);
  const { locationsData, isLoading, error, fetchLocations } =
    useFetchLocations();
  const { localization } = useLocalization();
  const { company } = useCompany();

  const redirectHandler = (location) => {
    updateReservation({ ...reservation, location });
    router.push("/(tabs)/(02_barbers)/services");
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <SharedTabHeader
        image={company?.media?.coverImageAppointments}
        title={localization.PLACES.title}
      />
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
          <Text style={styles.errorText}>
            Something went wrong, please try again later
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default PlaceComponent;

const styles = StyleSheet.create({
  coverImage: {
    width: "100%",
    height: 200,
    opacity: 0.2,
  },

  contentContainer: {
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },

  captureContainer: {
    position: "absolute",
    marginHorizontal: 15, // Side padding for the list
  },
  capture: {
    fontSize: 32,
    color: "white",
    fontWeight: "500",
    paddingVertical: 130,
  },

  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
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

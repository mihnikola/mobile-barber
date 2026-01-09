import { ScrollView, Image, StyleSheet, View, BackHandler } from "react-native";
import { Text } from "react-native";
import ReservationContext from "@/context/ReservationContext";
import Loader from "@/components/Loader";
import useFetchLocations from "./useFetchLocations";
import SharedItemLocation from "@/shared-components/SharedItemLocation";
import { useContext, useEffect } from "react";
import { router } from "expo-router";
import { useLocalization } from "@/context/LocalizationContext";
import { useCompany } from "@/context/CompanyContext";
import { useLastPathNavigation } from "@/context/NavigationContext";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import SharedTitle from "@/shared-components/SharedTitle";

const PlaceComponent = ({ locationsData }) => {
  const { reservation, updateReservation } = useContext(ReservationContext);
  const { isLoading, error } = useFetchLocations();
  const { localization } = useLocalization();
  const { company } = useCompany();
  const { saveLastTab } = useLastPathNavigation();

  const redirectHandler = (location) => {
    updateReservation({ ...reservation, location });
    const pathName = "/(tabs)/(02_barbers)/services";
    router.push({
      pathname: pathName,
      params: { backButton: true },
    });
    saveLastTab(pathName, true);
  };
  useEffect(() => {
    const backAction = () => {
      router.navigate("/(tabs)/(01_home)");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Cleanup function to remove the event listener
  }, []);

  return (
    <ScrollView style={styles.container}>
      <SharedCoverImage image={company?.media?.coverImageAppointments} />
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

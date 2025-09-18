import { ScrollView, StyleSheet, View } from "react-native";
import { useContext, useEffect } from "react";
import { Text } from "react-native";
import ReservationContext from "@/context/ReservationContext";
import Loader from "@/components/Loader";
import SharedItem from "@/shared-components/SharedItem";
import useFetchEmployers from "@/components/employers/hooks/useFetchEmployers";
import { router } from "expo-router";
import { useLocalization } from "@/context/LocalizationContext";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import useCompany from "../home/hooks/useCompany";

const Employers = () => {
  const { reservation, updateReservation } = useContext(ReservationContext);
  const { emplData, isLoading, error } = useFetchEmployers(); // Use the custom hook

  const { company, getCompany } = useCompany();

  useEffect(() => {
    getCompany();
  }, []);

  const redirectHandler = (employer) => {
    updateReservation({ ...reservation, employer });
    router.push("/(tabs)/(02_barbers)/services");
  };

  const { localization } = useLocalization();

  return (
    <ScrollView style={styles.container}>
      <SharedCoverImage image={company?.media?.coverImageAppointments} />
      <View style={styles.captureContainer}>
        <Text style={styles.capture}>{localization.BARBERS.title}</Text>
      </View>
      {isLoading && <Loader />}
      {!isLoading && (
        <View style={styles.contentContainer}>
          {emplData?.map((item) => (
            <SharedItem
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

export default Employers;

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
    marginHorizontal: 15,
  },
  capture: {
    fontSize: 32,
    color: "white",
    fontWeight: "500",
    paddingVertical: 140,
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

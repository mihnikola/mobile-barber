import { ScrollView, Image, StyleSheet, View, BackHandler } from "react-native";
import { useContext, useEffect } from "react";
import { Text } from "react-native";
import { router } from "expo-router";
import ReservationContext from "@/context/ReservationContext";
import Loader from "@/components/Loader";
import SharedItem from "@/shared-components/SharedItem";
import useFetchEmployers from "@/components/employers/hooks/useFetchEmployers";

const Employers = () => {
  const { reservation, updateReservation } = useContext(ReservationContext);
  const { emplData, isLoading, error } = useFetchEmployers(); // Use the custom hook
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick3);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick3
      );
    };
  }, []);

  const redirectHandler = (employer) => {
    updateReservation({ ...reservation, employer });
    router.push("/(tabs)/(02_barbers)/services");
  };
  function handleBackButtonClick3() {
    return true;
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("@/assets/images/team.jpg")}
        style={styles.coverImage}
      />
      <Text style={styles.capture}>Choose your barber</Text>
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
  capture: {
    fontSize: 32,
    color: "white",
    fontWeight: "500",
    position: "absolute",
    display: "flex",
    alignSelf: "center",
    paddingVertical: 150,
  },
  container: {
    flex: 1,
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

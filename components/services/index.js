// app/menuservices.tsx
import { useContext } from "react";
import { ScrollView, Image, StyleSheet, View, Text } from "react-native";
import ReservationContext from "@/context/ReservationContext";
import Loader from "@/components/Loader";
import useFetchServices from "./hooks/useFetchServices";
import SharedItem from "@/shared-components/SharedItem";
import { router } from "expo-router";
import { getStorage } from "@/helpers/token";

const MenuServices = () => {
  const { updateReservation, reservation } = useContext(ReservationContext);
  const { serviceData, isLoading } = useFetchServices();

  const funcDateTimeReservation = async (service) => {
    updateReservation({ ...reservation, service });
    // ovde treba ispitati da li je user authorized ili nije
    try {
      const getToken = await getStorage();
      if (getToken) {
        router.push("/(tabs)/(02_barbers)/calendar");
      } else {
        router.push({
          pathname: "/(tabs)/(04_settings)/login",
          params: { data: "1" },
        });
      }
    } catch (error) {
      console.error("object", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("@/assets/images/coverImage.jpg")}
        style={styles.coverImage}
      />
      <Text style={styles.capture}>Pricing and Services</Text>

      {serviceData.length === 0 && isLoading && <Loader />}
      {serviceData.length > 0 && !isLoading && (
        <View style={styles.contentContainer}>
          {serviceData?.map((item) => (
            <SharedItem
              key={item.id}
              data={item}
              redirectHandler={funcDateTimeReservation}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default MenuServices;

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
    backgroundColor: "black",
  },
  coverImage: {
    width: "100%",
    height: 180,
    opacity: 0.2,
  },

  capture: {
    fontSize: 32,
    color: "white",
    fontWeight: "500",
    position: "absolute",
    display: "flex",
    alignSelf: "flex-start",
    marginHorizontal: 20,
    paddingVertical: 120,
  },
});

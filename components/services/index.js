import { useContext, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import ReservationContext from "@/context/ReservationContext";
import Loader from "@/components/Loader";
import useFetchServices from "./hooks/useFetchServices";
import SharedItem from "@/shared-components/SharedItem";
import { router } from "expo-router";
import { getStorage } from "@/helpers/token";
import { useLocalization } from "@/context/LocalizationContext";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import useCompany from "../home/hooks/useCompany";

const MenuServices = () => {
  const { updateReservation, reservation } = useContext(ReservationContext);
  const { serviceData, isLoading } = useFetchServices();

  const { getCompany, company } = useCompany();

  useEffect(() => {
    getCompany();
  }, []);

  const funcDateTimeReservation = async (serviceData) => {
    const service = {
      serviceId: serviceData.id,
      serviceDuration: serviceData.duration,
      servicePrice: serviceData.price,
      name: serviceData.name,
      image: serviceData.image,
    };
    updateReservation({ ...reservation, service });
    // ovde treba ispitati da li je user authorized ili nije
    try {
      const getToken = await getStorage();
      if (getToken) {
        router.push("/(tabs)/(02_barbers)/calendar");
      } else {
        router.push({
          pathname: "/(tabs)/(04_settings)/login",
          params: { data: "calendar" },
        });
      }
    } catch (error) {
      console.error("object", error);
    }
  };

  const { localization } = useLocalization();

  return (
    <ScrollView style={styles.container}>
      <SharedCoverImage image={company?.media?.coverImageAppointments} />
      <View style={styles.captureContainer}>
        <Text style={styles.capture}>{localization.SERVICES.title}</Text>
      </View>

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
  captureContainer: {
    position: "absolute",
    marginHorizontal: 15, // Side padding for the list
  },
  capture: {
    fontSize: 32,
    color: "white",
    fontWeight: "500",
    paddingVertical: 140,
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
});

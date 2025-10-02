import { useContext, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import ReservationContext from "@/context/ReservationContext";
import Loader from "@/components/Loader";
import useFetchServices from "./hooks/useFetchServices";
import SharedItem from "@/shared-components/SharedItem";
import { router } from "expo-router";
import { useLocalization } from "@/context/LocalizationContext";

import SharedTabHeader from "@/shared-components/SharedTabHeader";
import { useCompany } from "@/context/CompanyContext";

const MenuServices = () => {
  const { updateReservation, reservation } = useContext(ReservationContext);
  const { serviceData, isLoading } = useFetchServices();

  const { company } = useCompany();

  const funcDateTimeReservation = async (serviceData) => {
    const service = {
      serviceId: serviceData.id,
      serviceDuration: serviceData.duration,
      servicePrice: serviceData.price,
      name: serviceData.name,
      image: serviceData.image,
    };
    updateReservation({ ...reservation, service });
    router.push("/(tabs)/(02_barbers)/employers");
  };

  const { localization } = useLocalization();

  return (
    <ScrollView style={styles.container}>
      <SharedTabHeader
        image={company?.media?.coverImageAppointments}
        title={localization.SERVICES.title}
      />

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

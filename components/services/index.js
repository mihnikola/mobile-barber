import { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ReservationContext from "@/context/ReservationContext";
import Loader from "@/components/Loader";
import useFetchServices from "./hooks/useFetchServices";
import { router, useLocalSearchParams } from "expo-router";
import { useLocalization } from "@/context/LocalizationContext";

import { useCompany } from "@/context/CompanyContext";
import SharedItemServiceCard from "@/shared-components/SharedItemServiceCard";
import SharedBackButton from "@/shared-components/SharedBackButton";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import SharedTitle from "@/shared-components/SharedTitle";

const MenuServices = () => {
  const { updateReservation, reservation } = useContext(ReservationContext);
  const { serviceData, isLoading } = useFetchServices(reservation);
  const { backButton } = useLocalSearchParams();
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
    const pathName = "/(tabs)/(02_barbers)/employers";
    router.push(pathName);
  };
  const { localization } = useLocalization();

  const routerBackHandler = () => {
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      {backButton && <SharedBackButton onPress={routerBackHandler} />}

      <SharedCoverImage image={company?.media?.coverImageAppointments} />
      {!isLoading && <SharedTitle title={localization.SERVICES.title} />}

      {serviceData.length === 0 && isLoading && <Loader />}
      {serviceData.length === 0 && !isLoading && (
        <View style={{ marginVertical: 30, marginHorizontal: 20 }}>
          <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
            {localization.SERVICES.notAvailable}
          </Text>
        </View>
      )}
      {serviceData.length > 0 && !isLoading && (
        <View style={styles.contentContainer}>
          {serviceData?.map((item) => (
            <SharedItemServiceCard
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
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});

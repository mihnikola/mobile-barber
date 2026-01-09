import { useContext, useEffect } from "react";
import { BackHandler, ScrollView, StyleSheet, View } from "react-native";
import ReservationContext from "@/context/ReservationContext";
import Loader from "@/components/Loader";
import useFetchServices from "./hooks/useFetchServices";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import { useLocalization } from "@/context/LocalizationContext";

import SharedTabHeader from "@/shared-components/SharedTabHeader";
import { useCompany } from "@/context/CompanyContext";
import SharedItemServiceCard from "@/shared-components/SharedItemServiceCard";
import SharedBackButton from "@/shared-components/SharedBackButton";
import { useLastPathNavigation } from "@/context/NavigationContext";

const MenuServices = () => {
  const { updateReservation, reservation } = useContext(ReservationContext);
  const { serviceData, isLoading, fetchAllServices } = useFetchServices();
  // const pathname = usePathname();
  const { saveLastTab, btnValue } = useLastPathNavigation();

  const { backButton } = useLocalSearchParams();

  // console.log("paramts",backButton)
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
    saveLastTab(pathName);
  };

  // useEffect(() => {
  //   fetchAllServices();
  // }, [pathname]);

  const { localization } = useLocalization();
  useEffect(() => {
    const backAction = () => {
      router.back();
      saveLastTab(null);
      return true; // Returning true means we have handled the event and default behavior is prevented
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Cleanup function to remove the event listener
  }, []);
  const routerBackHandler = () => {
    router.back();
    saveLastTab(null);
  };
  return (
    <ScrollView style={styles.container}>
      {backButton  && <SharedBackButton onPress={routerBackHandler} />}
      {btnValue  && <SharedBackButton onPress={routerBackHandler} />}

      <SharedTabHeader
        image={company?.media?.coverImageAppointments}
        title={localization.SERVICES.title}
      />

      {serviceData.length === 0 && isLoading && <Loader />}
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
    backgroundColor: "black",
  },
  coverImage: {
    width: "100%",
    height: 180,
    opacity: 0.2,
  },
});

import { useContext, useEffect } from "react";
import { BackHandler, ScrollView, StyleSheet, View } from "react-native";
import ReservationContext from "@/context/ReservationContext";
import Loader from "@/components/Loader";
import useFetchServices from "./hooks/useFetchServices";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import { useLocalization } from "@/context/LocalizationContext";

import { useCompany } from "@/context/CompanyContext";
import SharedItemServiceCard from "@/shared-components/SharedItemServiceCard";
import SharedBackButton from "@/shared-components/SharedBackButton";
import { useLastPathNavigation } from "@/context/NavigationContext";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import SharedTitle from "@/shared-components/SharedTitle";

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

  console.log("oc res", reservation);
  // useEffect(() => {
  //   fetchAllServices();
  // }, [pathname]);

  const { localization } = useLocalization();
  useEffect(() => {
    const backAction = () => {
      if (reservation?.location?.address) {
        router.back();
      } else {
        router.navigate("/(tabs)/(01_home)");
      }

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
      {backButton && <SharedBackButton onPress={routerBackHandler} />}
      {btnValue && <SharedBackButton onPress={routerBackHandler} />}

      <SharedCoverImage image={company?.media?.coverImageAppointments} />
      {!isLoading && <SharedTitle title={localization.SERVICES.title} />}

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

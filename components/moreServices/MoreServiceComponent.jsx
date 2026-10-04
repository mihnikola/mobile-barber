import ReservationContext from "@/context/ReservationContext";
import { useContext, useEffect, useState } from "react";
import useFetchService from "./hooks/useFetchService";
import { router, useLocalSearchParams } from "expo-router";
import { useLocalization } from "@/context/LocalizationContext";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import HeaderCoverImageContainer from "@/shared-components/HeaderCoverImageContainer";
import { coverImageAppointments } from "@/constants";
import Loader from "../Loader";
import { ColorsBarber } from "@/constants/Colors";
import SharedItemMultiSelection from "@/shared-components/SharedItemMultiSelection";
import SharedButton from "@/shared-components/SharedButton";

const MoreServiceComponent = () => {
  const { updateReservation, reservation } = useContext(ReservationContext);
  const { categoryId } = useLocalSearchParams();
  const { serviceData, isLoading, fetchAllServices } = useFetchService();
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    if (categoryId) {
      fetchAllServices(categoryId);
    }
  }, []);

  const handleSelectService = (category, serviceDataVar) => {
    const selectedPromData = [...selectedServices];

    const isAlreadySelected = selectedPromData.some(
      (item) => item.id === serviceDataVar.id,
    );

    if (isAlreadySelected) {
      const updated = selectedPromData.filter(
        (item) => item.id !== serviceDataVar.id,
      );
      setSelectedServices(updated);
    } else {
      const categoryServices = serviceData
        .filter((item) => item.category === category)
        .map((item) => item.id);

      const filteredOtherCategories = selectedPromData.filter(
        (item) => !categoryServices.includes(item.id),
      );

      setSelectedServices([...filteredOtherCategories, serviceDataVar]);
    }
  };

  const submitHandler = () => {
    updateReservation({ ...reservation, otherServices: selectedServices });
    const pathName = "/(tabs)/(02_barbers)/employers";

    router.push(pathName);
  };

  const { localization } = useLocalization();
  const hasSelectedServices = selectedServices.length > 0;

  const routerHandler = () => {
    setSelectedServices([]);
    updateReservation({ ...reservation, otherServices: [] });

    router.push("/(tabs)/(02_barbers)/employers");
  };

  return (
    <>
      <View style={styles.container}>
        <HeaderCoverImageContainer
          title={localization.SERVICES.moreServices}
          image={coverImageAppointments}
          nextBtn
          skip={localization.SERVICES.next}
          routerHandler={routerHandler}
        />

        {serviceData.length === 0 && isLoading && <Loader />}
        {serviceData.length === 0 && !isLoading && (
          <View style={styles.notAvailableContainer}>
            <Text style={styles.notAvailable}>
              {localization.SERVICES.notAvailable}
            </Text>
          </View>
        )}

        {serviceData.length > 0 && !isLoading && (
          <ScrollView style={styles.contentContainer}>
            {serviceData.map((item) => {
              const itemId = item._id || item.id;

              const isSelected = selectedServices.some(
                (prev) => (prev._id || prev.id) === itemId,
              );
              return (
                <SharedItemMultiSelection
                  key={itemId}
                  data={item}
                  isSelected={isSelected}
                  redirectHandler={handleSelectService}
                />
              );
            })}
          </ScrollView>
        )}
      </View>
      {hasSelectedServices && (
        <View style={{ paddingHorizontal: 15 }}>
          <SharedButton
            onPress={submitHandler}
            text={localization.DATE.continue}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  notAvailableContainer: {
    marginVertical: 30,
    marginHorizontal: 20,
  },
  notAvailable: {
    color: ColorsBarber.dark.textColor,
    fontSize: 20,
    textAlign: "center",
  },
  contentContainer: {
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: ColorsBarber.dark.background,
  },
});

export default MoreServiceComponent;

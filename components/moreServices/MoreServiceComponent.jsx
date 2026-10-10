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
import SharedCategoryItem from "@/shared-components/SharedCategoryItem";
import SharedButton from "@/shared-components/SharedButton";

const MoreServiceComponent = () => {
  const { updateReservation, reservation } = useContext(ReservationContext);
  const { categoryId } = useLocalSearchParams();
  const {
    serviceData,
    isLoading,
    fetchAllServices,
    categoriesData,
    isCategorySelected,
    handleSelectCategory,
    categoriesServicesData,
  } = useFetchService();
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    if (categoryId) {
      fetchAllServices(categoryId);
    }
  }, []);

const handleSelectService = (categoryId, serviceDataVar) => {
  const selectedPromData = [...selectedServices];

  const serviceId = serviceDataVar.id || serviceDataVar._id;

  const isAlreadySelected = selectedPromData.some(
    (item) => (item.id || item._id) === serviceId,
  );

  if (isAlreadySelected) {
    // Ako je već izabran, sklanjamo ga
    const updated = selectedPromData.filter(
      (item) => (item.id || item._id) !== serviceId,
    );
    setSelectedServices(updated);
  } else {
    // 1. Nalazimo kategoriju u novom nizu (categoriesServicesData)
    const targetCategory = categoriesServicesData.find(
      (cat) => (cat._id || cat.id) === categoryId
    );

    // 2. Izvlačimo ID-jeve svih servisa iz te kategorije
    const categoryServicesIds = targetCategory?.services
      ? targetCategory.services.map((s) => s.id || s._id)
      : [];

    // 3. Uklanjamo izabrane servise koji pripadaju istoj kategoriji (da ostane samo 1 po kategoriji)
    const filteredOtherCategories = selectedPromData.filter(
      (item) => !categoryServicesIds.includes(item.id || item._id),
    );

    // 4. Dodajemo novi izabrani servis
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
          routerHandler={routerHandler}
          nextBtn
        />

        {categoriesServicesData.length === 0 && isLoading && <Loader />}
        {categoriesServicesData.length === 0 && !isLoading && (
          <View style={styles.notAvailableContainer}>
            <Text style={styles.notAvailable}>
              {localization.SERVICES.notAvailable}
            </Text>
          </View>
        )}

        {categoriesServicesData?.length > 0 && !isLoading && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.mainScrollView}
            contentContainerStyle={styles.mainScrollContent}
          >
            {categoriesServicesData?.length > 0 && !isLoading && (
              <View style={styles.container}>
                {/* 1. HORIZONTALNI MENI KATEGORIJA */}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.scrollViewStyle}
                  contentContainerStyle={styles.scrollContentContainer}
                >
                  <View style={{ gap: 10, flexDirection: "row" }}>
                    {categoriesServicesData.map((item) => {
                      return (
                        <SharedCategoryItem
                          key={item._id || item.id}
                          data={item}
                          isSelected={isCategorySelected}
                          redirectHandler={handleSelectCategory} // Ovde postavljaš isCategorySelected u state
                        />
                      );
                    })}
                  </View>
                </ScrollView>

                {/* 2. PRIKAZUJE SAMO USLUGE TRENUTNO IZABRANE KATEGORIJE */}
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={styles.servicesScrollView}
                >
                  <View style={styles.servicesContainer}>
                    {categoriesServicesData
                      // Nalazimo samo onu kategoriju čiji je _id jednako izabranom
                      .find((cat) => cat._id === isCategorySelected?._id)
                      // Izvlačimo njene servise i prikazujemo ih u koloni
                      ?.services?.map((serviceItem) => {
                        const itemId = serviceItem._id || serviceItem.id;

                        const isSelected = selectedServices.some(
                          (prev) => (prev._id || prev.id) === itemId,
                        );
                        return (
                          <SharedItemMultiSelection
                            key={serviceItem.id || serviceItem._id}
                            data={serviceItem}
                            redirectHandler={handleSelectService}
                            isSelected={isSelected}
                          />
                        );
                      })}
                  </View>
                </ScrollView>
              </View>
            )}
          </ScrollView>
        )}
      </View>
      <View style={{ paddingHorizontal: 15 }}>
        <SharedButton
          onPress={submitHandler}
          text={
            hasSelectedServices
              ? localization.DATE.continue
              : localization.SERVICES.next
          }
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainScrollView: {
    flex: 1,
    width: "100%",
  },
  mainScrollContent: {
    paddingBottom: 30,
  },
  categoryBlock: {
    marginBottom: 20, // Razmak između različitih kategorija
    width: "100%",
  },
  servicesContainer: {
    flexDirection: "column", // Usluge idu jedna ispod druge
    width: "100%",
    marginTop: 5,
  },
  notAvailableContainer: {
    marginVertical: 30,
    marginHorizontal: 20,
  },
  scrollViewStyle: {
    flexGrow: 0,
  },
  scrollContentContainer: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  notAvailable: {
    color: ColorsBarber.dark.textColor,
    fontSize: 20,
    textAlign: "center",
  },
  contentContainer: {
    marginTop: 10,
  },
  contentCategoriesContainer: {
    gap: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: ColorsBarber.dark.background,
  },
});

export default MoreServiceComponent;

import { useReservation } from "@/context/ReservationContext";
import { useEffect, useState } from "react";
import useFetchService from "./hooks/useFetchService";
import { router, useLocalSearchParams } from "expo-router";
import { useLocalization } from "@/context/LocalizationContext";
import { ScrollView, View } from "react-native";
import HeaderCoverImageContainer from "@/components/layout/HeaderCoverImageContainer";
import { coverImageAppointments } from "@/constants";
import SharedItemMultiSelection from "@/components/booking/SharedItemMultiSelection";
import SharedCategoryItem from "@/components/booking/SharedCategoryItem";
import { makeStyles } from "@/theme";
import { routes } from "@/lib/navigation/routes";
import { Button, EmptyState, Loader } from "@/components/ui";

const MoreServiceComponent = () => {
  const styles = useStyles();
  const { updateReservation, reservation } = useReservation();
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
    const pathName = routes.booking.employees;

    router.push(pathName);
  };

  const { localization } = useLocalization();
  const hasSelectedServices = selectedServices.length > 0;

  const routerHandler = () => {
    setSelectedServices([]);
    updateReservation({ ...reservation, otherServices: [] });

    router.push(routes.booking.employees);
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
          <EmptyState icon="scissors" title={localization.SERVICES.notAvailable} />
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
                  <View style={styles.chips}>
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
      <View style={styles.actionBar}>
        <Button
          onPress={submitHandler}
          title={
            hasSelectedServices
              ? localization.DATE.continue
              : localization.SERVICES.next
          }
        />
      </View>
    </>
  );
};

const useStyles = makeStyles((colors) => ({
  container: { flex: 1, backgroundColor: colors.bg },
  mainScrollView: { flex: 1, width: "100%" },
  mainScrollContent: { paddingBottom: 16 },
  scrollViewStyle: { flexGrow: 0 },
  scrollContentContainer: { paddingHorizontal: 16, paddingVertical: 8 },
  chips: { flexDirection: "row", gap: 8 },
  servicesScrollView: {},
  servicesContainer: { width: "100%", marginTop: 4 },
  // ds-sumbar: the screen's action sits on a surface bar at the bottom
  actionBar: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
}));

export default MoreServiceComponent;


import { ScrollView, View } from "react-native";
import { useReservation } from "@/context/ReservationContext";
import useFetchServices from "./hooks/useFetchServices";
import { router, useLocalSearchParams } from "expo-router";
import { useLocalization } from "@/context/LocalizationContext";
import SharedItemServiceCard from "@/components/booking/SharedItemServiceCard";
import { coverImageAppointments } from "@/constants";
import HeaderCoverImageContainer from "@/components/layout/HeaderCoverImageContainer";
import { makeStyles } from "@/theme";
import { EmptyState, Loader } from "@/components/ui";

const MenuServices = () => {
  const styles = useStyles();
  const { reservation, flowReservation } =
    useReservation();
  const { serviceData, isLoading } = useFetchServices(reservation);
  const { backButton } = useLocalSearchParams();

  const funcDateTimeReservation = async (serviceData) => {
    const service = {
      serviceId: serviceData.id,
      serviceDuration: serviceData.duration,
      servicePrice: serviceData.price,
      name: serviceData.name,
      image: serviceData.image,
    };
    const result = await flowReservation(service, serviceData?.category);
    const { type, pathName, categoryId } = result;
    if (type === "barbers") {
      router.push({ pathname: pathName });
    } else {
      router.push({
        pathname: pathName,
        params: { categoryId },
      });
    }
  };

  const { localization } = useLocalization();

  return (
    <ScrollView style={styles.container}>
      <HeaderCoverImageContainer
        title={localization.SERVICES.title}
        image={coverImageAppointments}
        hidden={!backButton}
      />

      {serviceData.length === 0 && isLoading && <Loader />}
      {serviceData.length === 0 && !isLoading && (
        <EmptyState icon="scissors" title={localization.SERVICES.notAvailable} />
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

const useStyles = makeStyles((colors) => ({
  container: { flex: 1, backgroundColor: colors.bg },
  contentContainer: { paddingTop: 4, paddingBottom: 16 },
}));



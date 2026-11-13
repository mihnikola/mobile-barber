import { ScrollView, View } from "react-native";
import { useEffect } from "react";
import { Text } from "react-native";
import { useReservation } from "@/context/ReservationContext";
import useFetchEmployers from "@/components/employers/hooks/useFetchEmployers";
import { router, useLocalSearchParams } from "expo-router";
import { useLocalization } from "@/context/LocalizationContext";
import { getStorage } from "@/helpers/token";
import NotFoundEmployers from "./NotFoundEmployers";
import SharedItemEmployerCard from "@/components/booking/SharedItemEmployerCard";
import HeaderCoverImageContainer from "@/components/layout/HeaderCoverImageContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/AuthContext";
import { makeStyles } from "@/theme";
import { routes } from "@/lib/navigation/routes";
import { EmptyState, Loader } from "@/components/ui";

const Employers = () => {
  const styles = useStyles();
  const { reservation, updateReservation } = useReservation();
  const { fetchAllEmployees, emplData, isLoading, error } = useFetchEmployers();
  const pathName = routes.booking.calendar;
  const { location, service } = reservation;
  const { setRedirectValue, redirectValue } = useAuth();

  useEffect(() => {
    if (redirectValue) {
      setRedirectValue(null);
      router.push(pathName);
    }
  }, [redirectValue]);
  const { localization } = useLocalization();

  useEffect(() => {
    if (location && service) {
      fetchAllEmployees(location, service);
    }
  }, [location]);

  const getStorageToken = async () => {
    try {
      const getToken = await getStorage();

      if (getToken) {
        router.push(pathName);
      } else {
        await AsyncStorage.setItem("paramLogin", "calendar");
        router.push({
          pathname: routes.auth.login,
          params: { data: "calendar" },
        });
      }
    } catch (error) {
      console.error("object", error);
    }
  };
  const redirectHandler = (employer) => {
    updateReservation({ ...reservation, employer });
    getStorageToken();
  };

  return (
    <ScrollView style={styles.container}>
      <HeaderCoverImageContainer title={localization.BARBERS.title} step={2} />

      {isLoading && <Loader />}
      {!isLoading && (
        <View style={styles.contentContainer}>
          {emplData?.length > 0 ? (
            emplData?.map((item) => (
              <SharedItemEmployerCard
                key={item.id}
                data={item}
                redirectHandler={redirectHandler}
                otherServices={reservation?.otherServices}
              />
            ))
          ) : (
            <NotFoundEmployers />
          )}
        </View>
      )}
      {!isLoading && error && (
        <EmptyState icon="wifiOff" title={localization.BARBERS.network} />
      )}
    </ScrollView>
  );
};

export default Employers;

const useStyles = makeStyles((colors) => ({
  container: { flex: 1, backgroundColor: colors.bg },
  contentContainer: { paddingTop: 4, paddingBottom: 16 },
}));



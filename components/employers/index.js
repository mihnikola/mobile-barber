import { ScrollView, StyleSheet, View } from "react-native";
import { useContext, useEffect } from "react";
import { Text } from "react-native";
import ReservationContext from "@/context/ReservationContext";
import Loader from "@/components/Loader";
import useFetchEmployers from "@/components/employers/hooks/useFetchEmployers";
import { router, useLocalSearchParams } from "expo-router";
import { useLocalization } from "@/context/LocalizationContext";
import { useCompany } from "@/context/CompanyContext";
import { getStorage } from "@/helpers/token";
import NotFoundEmployers from "./NotFoundEmployers";
import SharedItemEmployerCard from "@/shared-components/SharedItemEmployerCard";
import SharedBackButton from "@/shared-components/SharedBackButton";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import SharedTitle from "@/shared-components/SharedTitle";

const Employers = () => {
  const { reservation, updateReservation } = useContext(ReservationContext);
  const { fetchAllEmployees, emplData, isLoading, error } = useFetchEmployers();
  const { reevaluted } = useLocalSearchParams();
  const pathName = "/(tabs)/(02_barbers)/calendar";

  const { location, service } = reservation;
  useEffect(() => {
    if (reevaluted) {
      router.push({ pathname: pathName, params: { reevaluted } });
    }
  }, [reevaluted]);

  const { company } = useCompany();

  useEffect(() => {
    if (location && service) {
      fetchAllEmployees(location, service);
    }
  }, [location]);

  const getStorageToken = async () => {
    try {
      const getToken = await getStorage();
      console.log("getStorageToken Employers");
      if (getToken) {
        router.push(pathName);
      } else {
        router.push({
          pathname: "/(z_auth)/",
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

  const { localization } = useLocalization();

  const routerBackHandler = () => {
    router.back();
  };
  return (
    <ScrollView style={styles.container}>
      <SharedCoverImage image={company?.media?.coverImageAppointments} />
      {!isLoading && <SharedTitle title={localization.BARBERS.title} />}
      {<SharedBackButton onPress={routerBackHandler} />}

      {isLoading && <Loader />}
      {!isLoading && (
        <View style={styles.contentContainer}>
          {emplData?.length > 0 ? (
            emplData?.map((item) => (
              <SharedItemEmployerCard
                key={item.id}
                data={item}
                redirectHandler={redirectHandler}
              />
            ))
          ) : (
            <NotFoundEmployers />
          )}
        </View>
      )}
      {!isLoading && error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{localization.BARBERS.network}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Employers;

const styles = StyleSheet.create({
  coverImage: {
    width: "100%",
    height: 200,
    opacity: 0.2,
  },

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
    flexDirection: "column",
    backgroundColor: "black",
  },
  errorContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    alignSelf: "center",
    alignContent: "center",
    height: 500,
  },
  errorText: {
    marginhorizontal: 40,
    fontSize: 16,
    textAlign: "center",
    color: "gray",
  },
});

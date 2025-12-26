import { ScrollView, StyleSheet, View } from "react-native";
import { useContext, useEffect } from "react";
import { Text } from "react-native";
import ReservationContext from "@/context/ReservationContext";
import Loader from "@/components/Loader";
import SharedItem from "@/shared-components/SharedItem";
import useFetchEmployers from "@/components/employers/hooks/useFetchEmployers";
import { router } from "expo-router";
import { useLocalization } from "@/context/LocalizationContext";
import SharedTabHeader from "@/shared-components/SharedTabHeader";
import { useCompany } from "@/context/CompanyContext";
import { getStorage } from "@/helpers/token";
import NotFoundEmployers from "./NotFoundEmployers";
import SharedItemEmployerCard from "@/shared-components/SharedItemEmployerCard";
import SharedEmployerCard from "@/shared-components/SharedEmployerCard";
import SharedBackButton from "@/shared-components/SharedBackButton";

const Employers = () => {
  const { reservation, updateReservation } = useContext(ReservationContext);
  const { fetchAllEmployees, emplData, isLoading, error } = useFetchEmployers();

  const { location, service } = reservation;

  const { company } = useCompany();

  useEffect(() => {
    if (location && service) {
      fetchAllEmployees(location, service);
    }
  }, [location]);

  const getStorageToken = async () => {
    try {
      const getToken = await getStorage();
      console.log("getTOken",getToken);
      if (getToken) {
        router.push("/(tabs)/(02_barbers)/calendar");
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

  return (
    <ScrollView style={styles.container}>
      <SharedTabHeader
        image={company?.media?.coverImageAppointments}
        title={localization.BARBERS.title}
      />
    {<SharedBackButton onPress={router.back}/>}

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
          <Text style={styles.errorText}>
            {localization.BARBERS.network}
          </Text>
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

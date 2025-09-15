import Loader from "@/components/Loader";
import Details from "@/shared-components/Details";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import useFetchReservation from "./hooks/useFetchReservation";
import { useLocalSearchParams } from "expo-router";
import RateDetailsComponent from "./RateDetailsComponent";
import CancelDetailsComponent from "./CancelDetailsComponent";
import HeaderReservationTime from "./HeaderReservationTime";

const ReservationDetails = () => {
  const params = useLocalSearchParams();
  const { itemId, check } = params;

  const { reservationData, isLoading, error, refetch } =
    useFetchReservation(itemId);

  if (isLoading) {
    return <Loader />;
  }

  console.log("first",check, reservationData?.past)
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("@/assets/images/coverImage.jpg")}
        style={styles.coverImage}
      />
      <HeaderReservationTime data={reservationData} />

      <View style={styles.containerWrapper}>
        <Details data={reservationData} />
      </View>

      {check === "true" && !reservationData?.past && (
        <CancelDetailsComponent data={reservationData} itemId={itemId} />
      )}
      {check === "false" && reservationData?.past && (
        <RateDetailsComponent data={reservationData} itemId={itemId} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    marginTop: 10,
    display: "flex",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  coverImage: {
    width: "100%",
    height: 200,
    opacity: 0.2,
  },
});
export default ReservationDetails;

// app/menuservices.tsx
import { useCallback, useContext } from "react";
import { ScrollView, Image, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ReservationContext from "@/context/ReservationContext";
import Loader from "@/components/Loader";
import useFetchServices from "./hooks/useFetchServices";
import SharedItem from "../../../shared-components/SharedItem";

const MenuServices = () => {
  const navigation = useNavigation();
  const { updateReservation, reservation } = useContext(ReservationContext);
  const { serviceData, isLoading } = useFetchServices();

  const funcDateTimeReservation = useCallback(
    (service) => {
      updateReservation({ ...reservation, service });
      navigation.navigate("components/reservation/datereservation");
    },
    [navigation, reservation, updateReservation]
  );

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("@/assets/images/coverImage.jpg")}
        style={styles.coverImage}
      />
      <Text style={styles.capture}>Pricing & Services</Text>

      {isLoading && <Loader />}
      {!isLoading && (
        <View style={styles.contentContainer}>
          {serviceData?.map((item) => (
            <SharedItem
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
  container: {
    flex: 0,
    padding: 5,
    backgroundColor: "black",
  },
  coverImage: {
    width: "100%",
    height: 200,
    opacity: 0.2,
  },

  capture: {
    fontSize: 32,
    color: "grey",
    fontWeight: "900",
    textAlign: "center",
    fontStyle: "italic",
    position: "absolute",
    top: 150,
    left: 50,
  },
});

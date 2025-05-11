// app/menuservices.tsx
import React, { useContext } from "react";
import { ScrollView, Image, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ReservationContext from "@/context/ReservationContext";
import Loader from "@/components/Loader";
import useFetchServices from "./hooks/useFetchServices";
import ServiceItem from "./ServiceItem";

const MenuServices = () => {
  const navigation = useNavigation();
  const { updateReservation, reservation } = useContext(ReservationContext); // Access context  const route = useRoute();
  const { serviceData, isLoading } = useFetchServices(); // Use the custom hook

  const funcDateTimeReservation = (service) => {
    updateReservation({ ...reservation, service });
    navigation.navigate("components/reservation/datereservation");
  };

  if (serviceData.length === 0 && isLoading) {
    return <Loader />;
  }
  if (serviceData.length > 0 && !isLoading) {
    return (
      <ScrollView style={styles.container}>
        <Image
          source={require("@/assets/images/coverImage.jpg")}
          style={styles.coverImage}
        />
        <Text style={styles.capture}>Pricing & Services</Text>
        <View style={{ display: "flex" }}>
          {serviceData?.map((item) => (
            <ServiceItem
              key={item.id}
              data={item}
              date={funcDateTimeReservation}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
};

export default MenuServices;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    padding: 5,
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

// app/menuservices.tsx
import { useCallback, useContext } from "react";
import { ScrollView, Image, StyleSheet, View, Text, BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ReservationContext from "@/context/ReservationContext";
import Loader from "@/components/Loader";
import useFetchServices from "./hooks/useFetchServices";
import SharedItem from "@/shared-components/SharedItem";
import { router } from 'expo-router';

const MenuServices = () => {
  const { updateReservation, reservation } = useContext(ReservationContext);
  const { serviceData, isLoading } = useFetchServices();

  const funcDateTimeReservation = useCallback(
    (service) => {
      updateReservation({ ...reservation, service });
      router.push("calendar");
    },
    [router, reservation, updateReservation]
  );

     useFocusEffect(
      useCallback(() => {
        const onBackPress = () => {
          // Return true to disable the default back button behavior
         router.push("(02_barbers)")
         return true;

        };
        BackHandler.addEventListener("hardwareBackPress", onBackPress);
  
        return () =>
          BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      }, [])
    );

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("@/assets/images/coverImage.jpg")}
        style={styles.coverImage}
      />
      <Text style={styles.capture}>Pricing and Services</Text>

      {serviceData.length === 0 && isLoading && <Loader />}
      {serviceData.length > 0 && !isLoading && (
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
    flex: 1,
    backgroundColor: "black",
  },
  coverImage: {
    width: "100%",
    height: 200,
    opacity: 0.2,
  },

  capture: {
    fontSize: 32,
    color: "white",
    fontWeight: "500",
    position: "absolute",
    display: 'flex',
    alignSelf: 'center',
    paddingVertical: 150
  },
});

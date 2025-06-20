// app/menuservices.tsx
import { useCallback, useContext } from "react";
import { ScrollView, Image, StyleSheet, View, Text, BackHandler } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ReservationContext from "@/context/ReservationContext";
import Loader from "@/components/Loader";
import useFetchServices from "./hooks/useFetchServices";
import ServiceItem from "./ServiceItem";

const MenuServices = () => {
  const navigation = useNavigation();
  const { updateReservation, reservation } = useContext(ReservationContext); 
  const { serviceData, isLoading } = useFetchServices(); 
 useFocusEffect(
      useCallback(() => {
        const onBackPress = () => {
          // Return true to disable the default back button behavior
          console.log("object")
         navigation.navigate('(tabs)',{screen: "employers"});
         return true;

        };
        BackHandler.addEventListener("hardwareBackPress", onBackPress);
  
        return () =>
          BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      }, [])
    );
  const funcDateTimeReservation = useCallback(
    (service) => {
      updateReservation({ ...reservation, service });
      navigation.navigate("components/reservation/datereservation");
    },
    [navigation, reservation, updateReservation]
  );
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

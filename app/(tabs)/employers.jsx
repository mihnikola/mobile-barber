import { ScrollView, Image, StyleSheet, View } from "react-native";
import { useCallback, useContext, useEffect } from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ReservationContext from "@/context/ReservationContext";
import Loader from "@/components/Loader";
import EmployerItem from "../components/employers/EmployerItem";
import useFetchEmployers from "../components/employers/hooks/useFetchEmployers";

const Employers = () => {
  const navigation = useNavigation();
  const { reservation, updateReservation } = useContext(ReservationContext);
  const { emplData, isLoading, error } = useFetchEmployers(); // Use the custom hook

  const redirectHandler = useCallback(
    (employer) => {
      updateReservation({ ...reservation, employer });
      navigation.navigate("components/services/index");
    },
    [navigation, reservation, updateReservation]
  );

  if (isLoading) {
    return <Loader />;
  }


  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("@/assets/images/coverImage.jpg")}
        style={styles.coverImage}
      />
      <Text style={styles.capture}>Choose your barber</Text>
      {!isLoading && (
        <View style={styles.contentContainer}>
          {emplData?.map((item) => (
            <EmployerItem
              key={item.id}
              data={item}
              redirectHandler={redirectHandler}
            />
          ))}
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  capture: {
    fontSize: 32,
    color: "grey",
    fontWeight: "900",
    textAlign: "center",
    margin: 5,
    fontStyle: "italic",
    position: "absolute",
    top: 150,
    left: 60,
  },
  container: {
    flex: 1,
  },
});
